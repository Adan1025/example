export default {
    showMetroList: function(state, payload){
        state.metroList = payload.metroList;
        state.showTag = payload.showTag;
    }
}