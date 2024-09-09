let counter = 0;
function getData() {
    console.log('Fetching some data......... ' + counter++);
}

function debounce(fn, delay) {
    let timer;
    return function() {
        let context = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, delay);
    }
}

const improveFunction = debounce(getData, 300);