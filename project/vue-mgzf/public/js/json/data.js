export const houseList = (params = {}) => {
    let {
            layout = '3室2厅1卫',
            addr = '普陀区',
            houseName = '长征佳苑',
            area = '60-100',
            labels,
            detailedAddress,
        } = params,
        labelArr = ['', '整租', '合租'],
        arr = [],
        das = ['真如', '桃浦新村', '南翔', '李子园', '交通大学'],
        daArr = [];
    let areaSp = area.split('-'), minarea = +areaSp[0], maxarea = areaSp[1],
        abs = Math.abs(maxarea-minarea), rdm = 0;
    for(let i = 0; i < 10; i ++) {
        let n = i % 5;
        daArr = detailedAddress ? [detailedAddress]
                : [das[n], n < 4 ? das[n+1] : n%3 == 0 ? das[n-1] : das[n%3]];
        rdm = parseInt((Math.random() * abs) + minarea);
        arr.push({
                id: (i + 1),
                houseName: houseName + parseInt(Math.random()*100),
                addr: addr,
                layout: layout,
                area: ( /^\d+$/.test(rdm) ? rdm : parseInt(Math.random()*100 + 50) ) + 'm²',
                label: labelArr[labels || parseInt(Math.random()*2 + 1)],
                price: parseInt(Math.random()*100) * 100,
                detailedAddress: daArr,
                createTime: '2017-03-03 12:00:00'
            })
    }
    return arr;
    // return {
    //     status: 1,
    //     errmsg: '',
    //     results: arr
    // }
};