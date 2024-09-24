const times = (y) =>  (x) => x * y
const plus = (y) => (x) => x + y
const subtract = (y) =>  (x) => x - y
const divide = (y) => (x) => x / y


/**
 * @param {Array<(arg: any) => any>} funcs 
 * @return {(arg: any) => any}
 */
function pipe(funcs) {
	return function(value) {
		// setting the initial Value to the result
		var result = value;
		for (let i = 0; i < funcs.length; i++) {
			let currentFunction = funcs[i];
			result = currentFunction(result);
		}
		return result;
	}
}

console.log(pipe([times(1), times(2)])(3));

// Above console log looks like this
//console.log(times(2)(times(1)(3)));
