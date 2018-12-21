'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { window, workspace, ExtensionContext, commands } from 'vscode';
import * as fs from 'fs';
import Proxy from './request';

interface BLOGCONFIG {
    articleApiUrl: string | undefined
    articleTypeApiUrl: string | undefined
    userName: string | undefined
}
interface RESULT {
    status: number
    errmsg: string
    results: any
    lastId?: number
}
interface USERS {
    email: string | undefined
    password: string | undefined
}
interface DATA {
    id: number
    users: USERS
    // title: string
    // articleType: string
    content: string
    // disabled: number
    // docreader: string | null
    // publishDate: string
    // type: number
    // seriesName?: string
}
type FILEPATH = string

let _blogConfig: BLOGCONFIG;
// let articleApiUrl = 'http://localhost:7779/manage/vsarticle/savea';
// let articleTypeApiUrl = 'http://localhost:7779/manage/vsarticle/savet';
let password: string | undefined = undefined;
let newArticleType: string | undefined = '';
const fileReg = /(.*\/)([\S\w]+)$/;
// const h1Reg = /<h1[^>]+>([^<]+)<\/h1>/;
// const h2SeriesReg = /<h2[^>]+>@Ser:([^<]+)<\/h2>/;
// const pDescriptReg = /<p>@Der:([^<]+)<\/p>/;
// const titleReg = /(.*)\-(.*)$/;
const idReg = /.*\/(\[\d+\])?[\S\w]+$/;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
    let addArticle = commands.registerCommand('extension.qualc.blog.addArticle', () => {
        newsPost(PostArticle);
    });
    let addArticleType = commands.registerCommand('extension.qualc.blog.addArticleType', () => {
        let typeResult = window.showInputBox({ prompt: "输入类型名称" });
        typeResult.then(function typeResultThen(type) {
            newArticleType = type;
            newsPost(PostArticleType);
        });
    });
    let addArticleSeries = commands.registerCommand('extension.qualc.blog.addArticleSeries', () => {
        let typeResult = window.showInputBox({ prompt: "输入类型名称" });
        typeResult.then(function typeResultThen(type) {
            newArticleType = type;
            newsPost(PostArticleType);
        });
    });
    let test = commands.registerCommand('extension.qualc.blog.testFileName', () => {
        let passwordResult = window.showInputBox({ prompt: "输入密码", password: true });
        passwordResult.then(function passwordInputThen(passwordParams) {
            window.showInformationMessage(passwordParams || '密码不能为空')
        });
    });
    let removeId = commands.registerCommand('extension.qualc.blog.removeFileName', () => {
        let result = removeFileId();
        window.showInformationMessage(result == true ? '修改成功' : result.toString());
    });
    context.subscriptions.push(addArticle);
    context.subscriptions.push(addArticleType);
    context.subscriptions.push(addArticleSeries);
    context.subscriptions.push(test);
    context.subscriptions.push(removeId);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

function newsPost(callback: Function): void {
    if (!password) {
        let passwordResult = window.showInputBox({ prompt: "输入密码", password: true });
        passwordResult.then(function passwordInputThen(passwordParams) {
            if (!passwordParams) {
                window.showInformationMessage('密码不能为空');
            }
            password = passwordParams;
            getConf(function initConf(conf: BLOGCONFIG) {
                callback()
            });
        });
    } else {
        getConf(function initConf(conf: BLOGCONFIG) {
            callback()
        });
    }
}
function getLocalFilePath(): FILEPATH {
    let filePath: FILEPATH = <string>(window.activeTextEditor ? window.activeTextEditor.document.fileName : workspace.rootPath);
    return filePath.replace(/\\/g, '/');
}

function removeFileId(): string | boolean {
    try {
        if (!getId()) return true;
        let filePath = getLocalFilePath();
        fs.renameSync(filePath, filePath.replace(idReg, ''));
        return true;
    } catch (e) {
        return e.message;
    }
}

function addLocalFileId(id: number): boolean | string {
    try {
        if (getId()) {
            return '已经有了id';
        }
        let filePath = getLocalFilePath(),
            fileMatch = filePath.match(fileReg),
            filePrefix = fileMatch && fileMatch[1],
            fileName = fileMatch && fileMatch[2];
        fs.renameSync(filePath, `${filePrefix}[${id}]${fileName}`);
        return true;
    } catch (e) {
        return e.message
    }
}
function getConf(callback: Function) {
    // if (_blogConfig && callback) {
    //     callback(_blogConfig);
    //     return;
    // };
    let articleApiUrl = workspace.getConfiguration('qualcBlog').get<string>('articleApiUrl');
    let articleTypeApiUrl = workspace.getConfiguration('qualcBlog').get<string>('articleTypeApiUrl');
    let userName = workspace.getConfiguration('qualcBlog').get<string>('userName');
    if (!articleApiUrl) {
        articleApiUrl = 'http://manage.qualc.cn/manage/vsarticle/savea'
        return window.showInformationMessage('未配置接口名');
    }
    if (!articleTypeApiUrl) {
        articleTypeApiUrl = 'http://manage.qualc.cn/manage/vsarticle/savet';
        return window.showInformationMessage('未配置类型接口名');
    }
    if (!userName) {
        return window.showInformationMessage('未配置用户名');
    }
    _blogConfig = {
        articleTypeApiUrl,
        articleApiUrl,
        userName
    }
    callback(_blogConfig)
}
function getId(): number {
    let filePath: FILEPATH = getLocalFilePath(),
        fileMatch = filePath.match(fileReg),
        fileName = fileMatch && fileMatch[2];
    if (fileName) {
        let idMatch = fileName.match(/(\[(\d+)\])?.*/);
        return idMatch ? +idMatch[2] : 0;
    }
    return 0;
}

// function getLocalDate() {
//     let date = new Date();
//     return date.getFullYear + '-' + ten(date.getMonth() + 1) + '-' + ten(date.getDate()) + ' ' + ten(date.getHours()) + ':' + ten(date.getMinutes()) + ':' + ten(date.getSeconds());
// }
// function ten(num: string | number) {
//     return num < 10 ? '0' + num : num;
// }
async function PostArticle() {
    let id = getId();
    let data: DATA = {
        id,
        users: {
            email: _blogConfig.userName,
            password: password
        },
        content: ''
        // publishDate: getLocalDate()
    }
    try {
        let filePath: FILEPATH = getLocalFilePath();
        let content: any = fs.readFileSync(filePath).toString();
        data.content = content;
        let result: RESULT = await Proxy.proxyPost(_blogConfig.articleApiUrl, data);
        if (result.status == 1) {
            result = result.results;
            if (result.status == 1) {
                if (!id) {
                    addLocalFileId(result.results.lastId || 0);
                }
                return window.showInformationMessage(result.results.msg);
            }
        }
        window.showInformationMessage(result.errmsg);
    } catch (e) {
        window.showInformationMessage('error:' + e.message)
    }
}
async function PostArticleType() {
    let data = {
        users: {
            email: _blogConfig.userName,
            password: password
        },
        name: newArticleType,
    }
    try {
        let result: RESULT = await Proxy.proxyPost(_blogConfig.articleTypeApiUrl, data);
        if (result.status == 1) {
            result = result.results;
            if (result.status == 1) {
                return window.showInformationMessage(result.results);
            }
        }
        window.showInformationMessage(result.errmsg);
    } catch (e) {
        window.showInformationMessage('error:' + e.message)
    }
    newArticleType = '';
}