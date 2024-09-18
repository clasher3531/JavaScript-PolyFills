// Implement ClearAllTimeout

const timerUtils = {
    allTimerArray: [],
    setTimeout: function(fn, delay) {
        const id = setTimeout(fn, delay);
        this.allTimerArray.push(id);
        return id;
    },
    clearAllTimeOut: function() {
        while(this.allTimerArray.length > 0) {
            clearTimeout(this.allTimerArray.pop());
        }
    }
}

// Testing
timerUtils.setTimeout(() => {console.log("hello")}, 2000);
timerUtils.setTimeout(() => {console.log("hello1")}, 3000);
timerUtils.setTimeout(() => {console.log("hello2")}, 4000);
timerUtils.setTimeout(() => {console.log("hello3")}, 5000);

timerUtils.clearAllTimeOut();