
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
const Student = require('../data/student');


router.get('/getStudentInfo', (req, res) => {
    let studentId = parseInt(Math.random()*2)+1;
    console.log('### getStudentInfo  studentId: ' + studentId);
    let results = Student.getStudentInfoById(studentId);
    console.log(results)
    res.json({
        status: 1,
        results: results
    });
});
router.post('/getCurriculumListBiId', (req, res) => {
    let {studentId} = req.body;
    let results = Student.getCurriculumList(studentId);
    res.json({
        status: 1,
        results: results
    });
});
module.exports = router;
