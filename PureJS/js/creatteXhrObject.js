/**
 * Date: 11-1-21
 * Time: 下午3:22
 */

function creatteXhrObject() {
    var msxml_progid = ['MSXML2.XMLHTTP.6.0', 'MSXML3.XMLHTTP', 'Microsoft.XMLHTTP', 'MSXML2.XMLHTTP.3.0'];

    var req;
    try {
        req = new XMLHttpRequest();
    } catch(e1) {
        for(var i=0, len=msxml_progid.length; i<len; i++){
            try {
                req = new ActiveXObject(msxml_progid[i]);
            } catch(e2) {};
        }
    } finally {
        return req;
    }
}