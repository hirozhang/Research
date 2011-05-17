/**
 * Date: 11-1-24
 * Time: 下午2:32
 */

var Timer = {
    _data : {},

    start : function(key) {
        Timer._data[key] = new Date();
    },

    stop : function(key) {
        var time = Timer._data[key];
        if(time) {
            Timer._data[key] = new Date() - time;
        }
    },

    getTime : function(key) {
        return Timer._data[key];
    }
}

//ex
Timer.start('createElement');
for(var i=0; i<count; i++) {
    element = document.createElement('div');
}

Timer.stop('createElement');

alert('created' + count + 'in' + Timer.getTime('createElement'));