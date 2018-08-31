
'use strict';
const router = require('express').Router();
const only = require('only');
const crypto = require('crypto');
// 打印支持的hash算法
// console.log(crypto.getHashes());
// var content = 'password';//加密的明文；
// var md5 = crypto.createHash('md5');//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
// md5.update(content);
// var d = md5.digest('hex');  //加密后的值d
// console.log("加密的结果："+d);
const listSearch = require('../data/list-search.js');

router.get('/metroList', function(req, res){
    let {tag} = req.query;
    res.json({
        status: 1,
        results: tag == 'area' ? listSearch.area : listSearch.metro
    });
});
router.get('/metroStand', function(req, res){
    let {metroId} = req.body;
    console.log('### metroId: ' + metroId);
    let results = listSearch.metroStand(metroId);
    res.json({
        status: 1,
        results: listSearch.metroList
    });
});
module.exports = router;
