export default {
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
        try{
            value = JSON.stringify(value);
        }catch(e){}
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
    },
    removeSessionStorage(key){
        if(!key) return true;
        window.sessionStorage.removeItem(this._sessionPrefix + key);
    },
    isObject(obj){
        return Object.prototype.toString.call(obj) === '[object Object]';
    }
}