// export default class Route {
//     constructor(){}
//     static sessionKey = 'VSF_VPP_ROUTE_LIST_KEY';
//     set routes(val){
//         console.log(this.sessionKey)
//         window.sessionStorage.setItem(this.sessionKey, JSON.stringify(val));
//     }
//     get routes(){
//         let routes = window.sessionStorage.getItem(this.sessionKey);
//         if(!routes) return '';
//         return JSON.parse(routes);
//     }
// }

let Route = {
    // get _sessionKey(){
    //     return 'VSF_VPP_ROUTE_LIST_KEY'
    // },
    set routes(arr){
        window.sessionStorage.setItem(this._sessionKey, JSON.stringify(arr));
    },
    get routes(){
        let routes = window.sessionStorage.getItem(this._sessionKey);
        if(!routes) return [];
        return JSON.parse(routes);
    },
    checkRoute(tpath, fpath){
        let routes = this.routes,
            popItem = routes.slice(-1),
            flag = true;
        if(popItem == fpath) {
            routes.pop();
            flag = false;
        } else {
            routes.push(tpath);
        }
        this.routes = routes;
        return flag;
    }
}
Object.defineProperty(Route, '_sessionKey', {
    // writable: false, // 默认false
    // enumerable: false,
    // configurable: false,
    value: 'VSF_VPP_ROUTE_LIST_KEY'
});
export default Route;
exports.checkRoute = Route.checkRoute.bind(Route);