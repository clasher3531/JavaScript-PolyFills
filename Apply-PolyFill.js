// pollyfil for apply method

let personName = {
    firstName: "Sachin",
    lastName: "Tendulkar",
    getNameAndState: function(state, country) {
        console.log(this.firstName + " " + this.lastName + " from " + state + " in " + country);
    }
}

const getFullName =  function(state, country) {
    console.log(this.firstName + " " + this.lastName + " from " + state + " in " + country);
}

var personName2  = {
    firstName: "Rahul",
    lastName: "Dravid"
}

Function.prototype.myApply = function(context, args) {
    try {
        let currentContext = context || globalThis;
        let randomKey = Math.random();
        while(currentContext[randomKey] !== undefined) {
            randomKey = Math.random();
        }
        currentContext[randomKey] = this;
        let result = currentContext[randomKey](...args);
        delete currentContext[randomKey];
        return result;
    } catch(e) {
        console.error('Syntax Error');
    }
}

personName.getNameAndState.myApply(personName2, ["Karnataka", "India"]);
getFullName.myApply(personName, ["Maharashtra", "India"]);
getFullName.myApply(personName2, ["Karnataka", "India"]);
