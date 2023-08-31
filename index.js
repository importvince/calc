//grab all numbers
// const one = document.getElementById('one');
// const two = document.getElementById('two');
// const three = document.getElementById('three');
// const four = document.getElementById('four');
// const five = document.getElementById('five');
// const six = document.getElementById('six');
// const seven = document.getElementById('seven');
// const eight = document.getElementById('eight');
// const nine = document.getElementById('nine');
// const zero = document.getElementById('ten');

const numberBtns = document.querySelectorAll('.number')

const displayBtns = document.querySelectorAll('.display')

//grab all operators
const addBtn = document.getElementById('+');
const subtractBtn = document.getElementById('-');
const multiplyBtn = document.getElementById('x');
const divideBtn = document.getElementById('/');

//grab all other buttons
const reset = document.getElementById('reset');
const backspace = document.getElementById('delete');
const equals = document.getElementById('=');
const period = document.getElementById('.');

//grab display
const display = document.getElementById('results');

//clear function
reset.addEventListener('click', () => {
    display.innerHTML = "";
    //set num1, num2, and operator to nothing
})

//delete function
backspace.addEventListener('click', () => {
    let array = [];
    for (let i = 0; i < display.innerHTML.length; i++) {
        array.push(display.innerHTML[i]);
    }
    console.log[array];
    let sliced = array.slice(0, -1);
    let slicedString = sliced.join("");
    display.innerHTML = slicedString;
});

//display functions
for (let i = 0; i < displayBtns.length; i++) {
    displayBtns[i].addEventListener('click', function() {
      display.innerHTML += displayBtns[i].innerHTML;
    });
}


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
        const add = added(a, b);
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

