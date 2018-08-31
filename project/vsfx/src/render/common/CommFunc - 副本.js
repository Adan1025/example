window.CommFunc = {
    getSessionStorage: function(key){
        var json = sessionStorage.getItem(key);
        try{
            if(json){
                return JSON.parse(json);
            }
            return '';
        }catch(e){
            return json
        }
    },
    setSessionStorage: function(key, value){
        sessionStorage.setItem(key, value);
    }
}