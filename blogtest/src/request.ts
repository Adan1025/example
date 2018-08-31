
const http = require('http');
const https = require('https');
const url = require('url');

// 默认主机最大的socket 数量
http.globalAgent.maxSockets = 1000;
https.globalAgent.maxSockets = 1000;
interface Options {
    protocol?: string
    path?: string
    port?: number
    method?: string
    headers?: any,
    hostname?: string
}
interface RESULT {
    status: number
    errmsg: string
    results: any
}

const _globalRequestOpt = {
    protocol: 'http',
    path: '',
    port: 80,
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};
export default {
    _request: function request(options: Options, data?: any): Promise<any> {
        return new Promise(resolve => {
            // if (!cb) { cb = function() {} }
            // if (typeof data === 'function') {
            //    b = data;
            //     data = null;
            // };
            try {
                // let userAgent = userAgents[parseInt(Math.random() * userAgents.length)]
                let protocol = options.protocol || 'http',
                    _protocolObj = protocol == 'http' ? http : https;

                delete options.protocol;

                let req = _protocolObj.request(options, (res: any) => {
                    let {
                        statusCode
                    } = res,
                        contentType = res.headers['content-type'],
                        error = null;
                    if (statusCode !== 200) {
                        error = new Error('请求失败。' + `状态码: ${statusCode} options:${JSON.stringify(options)}`);
                    }
                    if (error) {
                        res.resume();
                        resolve({
                            status: 10301,
                            errmsg: `request callback err: ${error.message}`,
                            results: {}
                        });
                        // console.info(`Proxy- request callback err code: 10301 err:  ${JSON.stringify(error)}`);
                        return;
                    }
                    let rawData = '';
                    res.setEncoding('utf8');
                    res.on('data', (chunk: string) => {
                        rawData += chunk;
                    })
                    res.on('end', () => {
                        try {
                            let parsedData = rawData;
                            if (/^(text|application)\/json/.test(contentType)) {
                                parsedData = JSON.parse(rawData);
                            }
                            resolve({
                                status: 1,
                                results: parsedData,
                            });
                        } catch (e) {
                            // console.info(`json.parse err: ${e.message}`)
                            resolve({
                                status: 1,
                                results: rawData,
                            });
                            // resolve({
                            //     status: 0,
                            //     errmsg: '解析数据失败，返回数据非json格式，待优化'
                            // });
                        }
                    });
                });
                if (data) {
                    req.write(data);
                }
                req.end();
                req.on('error', (e: Error) => {
                    req.abort();
                    resolve({
                        status: 10302,
                        errmsg: `request err: ${e.message}`
                    });
                    // console.info(`Proxy- abort code: 10302 err:  ${JSON.stringify(e)}`);
                });
            } catch (e) {
                resolve({
                    status: 10303,
                    errmsg: `promise err: ${e.message}`
                });
                // console.info(`Proxy- catch code: 10303 err: ${JSON.stringify(e)}`);
            }
        })

    },
    proxy: async function get(interfaceUrl: string, option = {}) {
        let { hostname, port = 80, path } = url.parse(interfaceUrl);
        let _options = Object.assign({}, { hostname, port, path }, option);
        return await this._request(_options);

    },
    proxyPost: async function post(interfaceUrl: string | undefined, data: any, opt?: Options): Promise<RESULT> {
        try {
            let { hostname, port = 80, path } = url.parse(interfaceUrl);
            opt = opt || {};
            data = data || {};
            let postData = JSON.stringify(data);
            // let userAgent = userAgents[parseInt(Math.random() * userAgents.length)]
            let _options = Object.assign({}, _globalRequestOpt, {
                hostname,
                port,
                path,
                json: true,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData),
                },
            }, opt);
            return await this._request(_options, postData);
        } catch (e) {
            return { errmsg: e.message, status: 0, results: {} };
        }
    },
}