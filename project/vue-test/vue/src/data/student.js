exports.getStudentInfoById = function(studentId) {
    if(!studentId) {
        return {};
    }
    return [{
            id: studentId,
            name: '小强',
            position: '班长'
        },{
            id: studentId,
            name: '小张',
            position: '学习委员'
        },{
            id: studentId,
            name: '小王',
            position: ''
        }][studentId % 3];
}
exports.getCurriculumList = function(studentId) {
    return ['语文','数学','外语','政治','化学','生物','物理','地理','思政','马哲','离散数学'].map( (item, index) => {
        return  {
            id: index,
            name: item,
            score: parseInt(Math.random()*10000)/100
        }
    });
}