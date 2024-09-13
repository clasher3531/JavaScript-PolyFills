// PolyFill For Bind Method

//First Approach without using apply method
Function.prototype.myBind1 = function(context, ...args1) {
    let currentContext = context || globalThis;
    let randomKey = Math.random();
    while(currentContext[randomKey] !== undefined) {
        randomKey = Math.random();
    }
    currentContext[randomKey] = this;
    return function(...args2) {
        let mergeArgs = args1.concat(args2);
        let result = currentContext[randomKey](...mergeArgs);
        delete currentContext[randomKey];
        return result;
    }
}

// second Approach using apply method
Function.prototype.myBind2 = function(...args1) {
    let currentObj = this;
    let params = args1.splice(1);
    return function(...args2) {
        let mergeArgs = params.concat(args2);
        currentObj.apply(args1[0], mergeArgs);
    }
}

var myBindResult = personName.getNameAndState.myBind1(personName2);
myBindResult("Karnataka", 'India');

var myBindResult1 = personName.getNameAndState.myBind1(personName2, "Karnataka");
myBindResult1('India');

var myBindResult2 = personName.getNameAndState.myBind2(personName2, "Karnataka", "India");
myBindResult2();

var myBindResult3 = getFullName.myBind2(personName, "Maharashtra", "India");
myBindResult3();

var myBindResult4 = getFullName.myBind2(personName2, "Karnataka");
myBindResult4("India");