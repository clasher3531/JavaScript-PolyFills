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

// pollyfill for call method

Function.prototype.myCall = function(context, ...args) {
    try {
        let currentContext = context || globalThis;
        let randomKey = Math.random();
        while(currentContext[randomKey] !== undefined) {
            randomKey = Math.random();
        }
        currentContext[randomKey] = this;
        var result = currentContext[randomKey](...args);
        delete currentContext[randomKey];
        return result;
    } catch(e) {
        console.error('Syntax Error');
    }
    
}

personName.getNameAndState.myCall(personName2, "Karnataka", "India")
getFullName.myCall(personName, 'Maharashtra', "India");
