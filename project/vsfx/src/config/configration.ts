"use strict";

import * as path from 'path';
module.exports = {
    // mysql配置
    mysql: {
        type: 'mysql',
        host: '115.159.157.177',
        user: 'data',
        password: 'Paic1234',
        database: 'sf_test', // 前面建的user表位于这个数据库中
        port: 3306,
        acquireTimeout: '60 * 6 * 24',
        synchronize: true,
        logging: true,
        entities: [
            path.join(__dirname, '../entity/*.js')
        ]
    }

};