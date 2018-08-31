let areaList = ['黄浦', '徐汇', '长宁', '静安', '普陀', '虹口', '杨浦',
            '闵行', '宝山', '嘉定', '浦东', '金山', '松江', '青浦', '奉贤', '崇明'];
export const area = areaList;

let metroList = [];
for(let i = 1 ; i < 13 ; i ++) {
    metroList.push(i + '号线');
};
export const metro = metroList;
export const metroStand = function metroStand(i){
    return i > 12 ? [] : _metroStandList(i);
}

let metroStandList = {};
function _metroStandList(metro) {
    if(metroStandList[metro]) {
        return metroStandList[metro];
    }
    let count = parseInt(Math.random() * 10) + 5,
        arr = {};
    for(let i = 0 ; i < count; i ++) {
        arr['' + metro + i] = `${metro}号线第${i}站`;
    }
    metroStandList[metro] = arr;
    return metroStandList[metro];
}
