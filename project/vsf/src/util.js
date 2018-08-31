export default {
    typeClass(type = 'default'){
        // 参数默认值无效？？？？
        type = type || 'default';
        return `sf-type-${type}`;
    },
    typeValidator(type = 'default'){
        return ['', 'fall', 'rise', 'disabled', 'primary', 'danger', 'default'].indexOf(type) > -1;
    }
}