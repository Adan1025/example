const CommFunc = {
    _sessionPrefix: 'TIANBING_',
    getQueryString: function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    },
    setSessionStorage(key, value) {
        if(!value) return true;
        window.sessionStorage.setItem(this._sessionPrefix + key, value);
    },
    getSessionStorage(key) {
        let json = window.sessionStorage.getItem(this._sessionPrefix + key);
        if(json && typeof json == 'string'){
            try{
                json = JSON.parse(json);
            } catch(e){
                json = json;
            }
            return json;
        }
        return json;
    }
}
window.CommFunc = CommFunc;
// const install = function(Vue){
//     vue.prototype.CommFunc = CommFunc;
// }
// export default {
//     install
// }