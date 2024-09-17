// Implement SetInterval using setTimeout

const setIntervalUtils = function() {
    var mapForSetTimeOutIds = {};
    var uniqueId = 0;
    const setIntervalFn = function(callback, delay, ...args) {
        if (typeof callback !== 'function') {
            throw new Error('Callback function must be of type function');
        }
        var intervalId = uniqueId++;
        const setTimeOutFn = function() {
            mapForSetTimeOutIds[intervalId] = setTimeout(function() {
                setTimeOutFn();
                callback.apply(window, args);
            }, delay);
        }

        setTimeOutFn();
        return intervalId;
    }

    const clearIntervalFn = function(id) {
        clearTimeout(mapForSetTimeOutIds[id]);
        delete mapForSetTimeOutIds[id];
    }

    return {setIntervalFn, clearIntervalFn};
}

const {setIntervalFn, clearIntervalFn} = setIntervalUtils();

var count = 0;
var timeInterval = setIntervalFn(printMessage, 1000, 'Called from function Args');

function printMessage(message) {
    count++;
    if (count === 5) {
        clearIntervalFn(timeInterval);
    }
    console.log(message);
}