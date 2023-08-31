// still need to do: 
// capture num2
// prevent more than 1 operator

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

//global variables
let num1;
let num2;
let operator;

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
    //set most recent number or operator variable to nothing
});

//display number and operator buttons once pressed
for (let i = 0; i < displayBtns.length; i++) {
    displayBtns[i].addEventListener('click', function() {
      display.innerHTML += displayBtns[i].innerHTML;
      //assign first number variable 
      num1 = parseInt(display.innerHTML);
      num2 = 3;
      //catch operator and assign it to a variable
      if(displayBtns[i] == addBtn) {
        operator = addBtn.innerHTML;
        return num1, num2, operator;
        // idea for num2: create an array and push display.innerHTML to it. if the last value of array is =, then findLast('+'), slice from this index forward and assign to num2?
        } else if(displayBtns[i] == subtractBtn) {
        operator = subtractBtn.innerHTML;
        return num1, num2, operator;
        } else if(displayBtns[i] == multiplyBtn) {
        operator = multiplyBtn.innerHTML;
        return num1, num2, operator;
        } else if(displayBtns[i] == divideBtn) {
        operator = divideBtn.innerHTML;
        return num1, num2, operator;
        }
    }
    )
};

//solve function **WORKS!! now just need to figure out the num2 capture
equals.addEventListener('click', () => {
    console.log(num1,num2,operator);
    let result = operate(num1,num2,operator);
    display.innerHTML = result;
    num1 = result;
    num2 = "";
    operator =  "";
});


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
    if(operator == '+') {
        const added = add(a, b);
        console.log(added);
        return added;
    } else if(operator == '-') {
        const subtracted = subtract(a,b);
        console.log(subtracted);
        return subtracted;
    } else if(operator == 'x') {
        const multiplied = multiply(a,b);
        console.log(multiplied);
        return multiplied;
    } else if(operator == '/') {
        const divided = divide(a,b);
        console.log(divided);
        return divided;
    } else console.log('Error');
};

