// (function(global, factory) {
//     'use strict';
//     if (typeof module === "object" && typeof module.exports === "object") {
//         module.exports = global.document ?
//             factory(global, true) :
//             function(w) {
//                 if (!w.document) {
//                     throw new Error("Global requires a window with a document");
//                 }
//                 return factory(w);
//         };
//     } else {
//         factory(global);
//     }
// }(typeof window !== "undefined" ? window : this, function(window, noGlobal) {
export default {
        getById: function(id, parent){
            return (parent || document).getElementById(id);
        },
        getByClass: function(cln = '', parent){
            // getElementsByClassName 参数是必须得
            let arr = (parent || document).getElementsByClassName(cln);
            return this.formatArray(arr);
        },
        getByTagName: function(tag = '', parent) {
            let arr = (parent || document).getElementsByTagName(tag);
            return this.formatArray(arr);
        },
        /**
         * 获取父元素
         * @Author   天冰
         * @DateTime 2017-04-05T17:58:37+0800
         * @param    {[type]}                     targetElement [description]
         * @param    {[type]}                     tag           [指定父元素tag]
         * @return   {[type]}                                   [description]
         */
        parentNode: function(targetElement, tag){
            let validParent = null;
            for(let parent = targetElement.parentNode;
                    parent && !validParent;
                    parent = parent.parentNode) {
                validParent = parent && 1 === parent.nodeType && __support.__validTag(tag, parent) && parent
                    || null;
            }
            return validParent;
        },
        /**
         * 插入新元素在指定元素前
         * @Author   天冰
         * @DateTime 2017-04-05T17:33:31+0800
         * @param    {[type]}                     newTargetElement [新元素]
         * @param    {[type]}                     targetElement    [当前元素]
         * @return   {[type]}                                      [description]
         */
        insertBefore: function(newTargetElement, targetElement){
            return __support._insert(this.parentNode(targetElement), newTargetElement, targetElement);
        },
        /**
         * 插入新元素在指定元素子节点最前
         * @Author   天冰
         * @DateTime 2017-04-05T17:49:39+0800
         * @param    {[type]}                     newTargetElement [description]
         * @param    {[type]}                     targetElement    [description]
         * @return   {[type]}                                      [description]
         */
        insertBeforeFirst: function(newTargetElement, targetElement){
            return __support._insert(targetElement, newTargetElement, this.firstChild(targetElement));
        },
        /**
         * 插入新元素在指定元素之后
         * @Author   天冰
         * @DateTime 2017-04-05T17:50:09+0800
         * @param    {[type]}                     newTargetElement [description]
         * @param    {[type]}                     targetElement    [description]
         * @return   {[type]}                                      [description]
         */
        insertAfter: function(newTargetElement, targetElement){
            let lastChild = this.lastChild(targetElement),
                parentNode = this.parentNode(targetElement);
            if(lastChild == targetElement) {
                return this.appendChild(parentNode, newTargetElement);
            } else {
                return __support._insert(parentNode, newTargetElement, this.nextSibling(targetElement));
            }
        },
        /**
         * 加入新元素在指定元素子节点最后
         * @Author   天冰
         * @DateTime 2017-04-05T17:57:27+0800
         * @param    {[type]}                     newTargetElement [description]
         * @param    {[type]}                     targetElement    [description]
         * @return   {[type]}                                      [description]
         */
        insertAfterLast: function(newTargetElement, targetElement){
            return this.appendChild(targetElement, newTargetElement);
        },
        /**
         * 创建新元素
         * @Author   天冰
         * @DateTime 2017-04-05T17:59:11+0800
         * @param    {[type]}                     tag     [description]
         * @param    {[type]}                     options =             {} [属性对象]
         * @param    {[type]}                     style   =             {} [样式对象]
         * @return   {[type]}                             [description]
         */
        createElement: function(tag, options = {}, style = {}) {
            let element = document.createElement(tag);
            // for of 不适合处理原有的原生对象
            /*for(let key of Object.keys(options)) {
                element[key] = value;
            }*/
            Object.assign(element, options);
            Object.assign(element.style, style);
            return element;
        },
        /**
         * 添加新元素到指定元素节点
         * @Author   天冰
         * @DateTime 2017-04-05T18:00:25+0800
         * @param    {[type]}                     targetElement [description]
         * @param    {[type]}                     childElement  [description]
         * @return   {[type]}                                   [description]
         */
        appendChild: function(targetElement, childElement){
            return targetElement.appendChild(childElement) && true || false
            /*let result = true;
            try{
                targetElement.appendChild(childElement);
            } catch (e) {
                result = false;
            }
            return result;*/
        },
        /**
         * 获取第一个有效元素
         * @Author   天冰
         * @DateTime 2017-04-05T18:00:39+0800
         * @param    {[type]}                     targetElement [description]
         * @param    {[type]}                     tag           [指定获取元素的tag]
         * @return   {[type]}                                   [description]
         */
        firstChild: function(targetElement, tag){
            return __support.__choiceValidNode(targetElement.firstChild, tag, 'nextSibling', true);
        },
        /**
         * 获取最后一个有效元素
         * @Author   天冰
         * @DateTime 2017-04-05T18:00:55+0800
         * @param    {[type]}                     targetElement [description]
         * @param    {[type]}                     tag           [指定获取元素的tag]
         * @return   {[type]}                                   [description]
         */
        lastChild: function(targetElement, tag){
            return __support.__choiceValidNode(targetElement.lastChild, tag, 'previousSibling', true);
        },
        /**
         * 下一个有效元素
         * @Author   天冰
         * @DateTime 2017-04-05T18:04:42+0800
         * @param    {[type]}                     targetElement [description]
         * @param    {[type]}                     tag           [指定获取元素的tag]
         * @return   {[type]}                                   [description]
         */
        nextSibling: function(targetElement, tag){
            return __support.__choiceValidNode(targetElement, tag, 'nextSibling');
        },
        /**
         * 上一个有效元素
         * @Author   天冰
         * @DateTime 2017-04-05T18:04:57+0800
         * @param    {[type]}                     targetElement [description]
         * @param    {[type]}                     tag           [指定获取元素的tag]
         * @return   {[type]}                                   [description]
         */
        prevSibling: function(targetElement, tag){
            return __support.__choiceValidNode(targetElement, tag, 'previousSibling');
        },
        /**
         * 所有有效的兄弟元素
         * @Author   天冰
         * @DateTime 2017-04-05T18:05:16+0800
         * @param    {[type]}                     targetElement [description]
         * @param    {[type]}                     tag           [指定获取元素的tag]
         * @return   {[type]}                                   [description]
         */
        siblings: function(targetElement, tag){
            return __support._choiceValidSibling(targetElement.parentNode.firstChild, 'nextSibling', tag, targetElement);
        },
        /**
         * 后面的有效的弟元素
         * @Author   天冰
         * @DateTime 2017-04-05T18:05:34+0800
         * @param    {[type]}                     targetElement [description]
         * @param    {[type]}                     tag           [指定获取元素的tag]
         * @return   {[type]}                                   [description]
         */
        nextAll: function(targetElement, tag){
            return __support._choiceValidSibling(targetElement, 'nextSibling', tag, targetElement);
        },
        /**
         * 前面的有效的兄元素
         * @Author   天冰
         * @DateTime 2017-04-05T18:05:39+0800
         * @param    {[type]}                     targetElement [description]
         * @param    {[type]}                     tag           [指定获取元素的tag]
         * @return   {[type]}                                   [description]
         */
        prevAll: function(targetElement, tag){
            return __support._choiceValidSibling(targetElement, 'previousSibling', tag, targetElement).reverse();
        },
        /**
         * 判断是否是有效的dom
         * @Author   天冰
         * @DateTime 2017-04-05T18:06:29+0800
         * @param    {[type]}                     targetElement [description]
         * @return   {Boolean}                                  [description]
         */
        isDOM: function(targetElement){
            // 首先要对HTMLElement进行类型检查，因为即使在支持HTMLElement的浏览器中，
            // 类型却是有差别的，在Chrome,Opera中HTMLElement的类型为function，此时就不能用它来判断了
            return ( typeof HTMLElement === 'object' ) ? (targetElement instanceof HTMLElement)
                    : (targetElement && typeof targetElement === 'object' && targetElement.nodeType === 1 && typeof targetElement.nodeName === 'string');
        },
        /**
         * 格式化为数组格式
         * @Author   天冰
         * @DateTime 2017-04-05T18:06:42+0800
         * @param    {[type]}                     arr [description]
         * @return   {[type]}                         [description]
         */
        formatArray: function(arr){
            if(!Array.isArray(arr)) {
                return Array.from(arr);
                // es5
                // Array.prototype.slice.call(arr)
            }
        }
    }
    /**
     * 私有支持对象
     * @type {Object}
     */
    const __support = {

        /**
         * 追加元素
         * @Author   天冰
         * @DateTime 2017-04-05T17:46:54+0800
         * @param    {[type]}                     parentNode       [父元素]
         * @param    {[type]}                     newTargetElement [新元素]
         * @param    {[type]}                     targetElement    [指定元素]
         * @return   {[type]}                                      [description]
         */
        __insert: function(parentNode, newTargetElement, targetElement) {
            return (parentNode).insertBefore(newTargetElement, targetElement) && true || false;
        },
        /**
         * 获取一组有效的元素节点
         * @Author   天冰
         * @DateTime 2017-04-05T16:36:07+0800
         * @param    {[type]}                     beginElemnt   [description]
         * @param    {[type]}                     type          [description]
         * @param    {[type]}                     tag           [description]
         * @param    {[type]}                     targetElement =             {} [description]
         * @return   {[type]}                                   [description]
         */
        __choiceValidSibling: function(beginElemnt, type, tag, targetElement = {}){
            let siblings = [];
            while(beginElemnt) {
                1 === beginElemnt.nodeType && this.__validTag(tag, beginElemnt) && beginElemnt != targetElement && siblings.push(beginElemnt);
                beginElemnt = beginElemnt[type];
            }
            return siblings;
        },

        /**
         * 获取一个有效的元素节点
         * @Author   天冰
         * @DateTime 2017-04-05T16:35:51+0800
         * @param    {[type]}                     targetElement [description]
         * @param    {[type]}                     tag           [description]
         * @param    {[type]}                     type          =             'nextSibling' [description]
         * @param    {[type]}                     self          =             false         [description]
         * @return   {[type]}                                   [description]
         */
        __choiceValidNode: function(targetElement, tag, type = 'nextSibling', self = false){
            if(targetElement.nodeType === 1 && self) return targetElement;
            let validChild = null;
            for(let loop = true, nextChild = targetElement[type];
                    nextChild && loop;
                    nextChild = nextChild[type]) {
                if(nextChild && nextChild.nodeType === 1
                    && this.__validTag(tag, targetElement) ) {
                    loop = false;
                    validChild = nextChild;
                }
            }
            return validChild;
            /*let validChild = null,
                nextChild = targetElement[type],
                loop = true;
            while(loop) {
                if(nextChild && nextChild.nodeType === 1
                    && (tag ? tag.toUpperCase() == nextChild.tagName : 1)) {
                    loop = false;
                    validChild = nextChild;
                } else if(!nextChild) {
                    loop = false;
                } else {
                    nextChild = nextChild[type];
                }
            }
            return validChild;*/
        },
        __validTag: function(tag, element) {
            return tag.toUpperCase() == element.tagName;
        }
    }
   /* window.DOM = DOM;
    return DOM;
}));
*/


/*
    offsetWidth=(border-width)*2+(padding-left)+(width)+(padding-right)

　　offsetHeight=(border-width)*2+(padding-top)+(height)+(padding-bottom)

    offsetLeft=(offsetParent的padding-left)+(中间元素的offsetWidth)+(当前元素的margin-left)。

　　offsetTop=(offsetParent的padding-top)+(中间元素的offsetHeight)+(当前元素的margin-top)。

    当offsetParent为body时情况比较特殊

　　在IE8/9/10及Chrome中，offsetLeft = (body的margin-left)+(body的border-width)+(body的padding-left)+(当前元素的margin-left)。

　　在FireFox中，offsetLeft = (body的margin-left)+(body的padding-left)+(当前元素的margin-left)。

    避免offsetParent为body，要用css给父元素定位
*/