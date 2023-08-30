// basic functionality
function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return a/b;
}

function operate(a,b, operator) {
    if(operator == 'add') {
        const added = add(a, b);
        console.log(added);
    } else if(operator == 'subtract') {
        const subtracted = subtract(a,b);
        console.log(subtracted);
    } else if(operator == 'multiply') {
        const multiplied = multiply(a,b);
        console.log(multiplied);
    } else if(operator == 'divide') {
        const divided = divide(a,b);
        console.log(divided);
    } else console.log('Please enter a valid operator in string form');
}