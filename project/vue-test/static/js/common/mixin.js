export default {
    changCur: function (target) {
        return new Promise( (resolve, reject) => {
            let cur = target.parentNode.getElementsByClassName('cur')[0];
            if(!!cur) this.removeClass(cur);
            if(cur == target) {
                resolve();
            } else {
                target.className = 'cur';
                resolve(true);
            }
        });
    },
    removeClass: function(target){
        if(!target) return true;
        target.className = target.className.replace(/(\s+|^)cur(\s+|$)/, ' ');
    }
}