import _ from 'lodash';

var jsonToQueryString = function (obj, prefix) {
    var str = [], p;
    for (p in obj) {
        if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
            str.push((v !== null && typeof v === "object") ?
                jsonToQueryString(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    return str.join("&");
}

var ObjectToQuery = {
    asQuery: function (obj, prefix) {
        return jsonToQueryString(obj, prefix);
    }
}

export default ObjectToQuery;