let personName = {
  firstName: "Sachin",
  lastName: "Tendulkar",
  getNameAndState: function (state, country) {
    console.log(
      this.firstName + " " + this.lastName + " from " + state + " in " + country
    );
  },
};

const getFullName = function (state, country) {
  console.log(
    this.firstName + " " + this.lastName + " from " + state + " in " + country
  );
};

var personName2 = {
  firstName: "Rahul",
  lastName: "Dravid",
};

// pollyfill for call method

Function.prototype.myCall = function (context, ...args) {
  try {
    let currentContext = context || globalThis;
    if (typeof currentContext !== "object") {
      return new Object(context);
    }
    let randomKey = Symbol();
    currentContext[randomKey] = this;
    let result = currentContext[randomKey](...args);
    delete currentContext[randomKey];
    return result;
  } catch (e) {
    console.error("Syntax Error");
  }
};

personName.getNameAndState.myCall(personName2, "Karnataka", "India");
getFullName.myCall(personName, "Maharashtra", "India");
