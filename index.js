//grab all number buttons
const numberBtns = document.querySelectorAll('.number')

//grab all buttons that should be displayed 
const displayBtns = document.querySelectorAll('.display')

//grab all operators
const addBtn = document.getElementById('add');
const subtractBtn = document.getElementById('subtract');
const multiplyBtn = document.getElementById('multiply');
const divideBtn = document.getElementById('divide');
//put all operators into an array
const allOpBtns = Array.from(document.getElementsByClassName('operator'));

//grab all other buttons
const reset = document.getElementById('reset');
const backspace = document.getElementById('delete');
const equals = document.getElementById('equal');
const period = document.getElementById('dot');

//grab display
const display = document.getElementById('results');

//global variables
let num1;
let num2;
let operator;
//display tracker array
let currentDisplay = [];

//clear function
reset.addEventListener('click', () => {
    display.innerHTML = "";
    currentDisplay.splice(0, currentDisplay.length);
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

//display number and operator buttons once pressed
for (let i = 0; i < displayBtns.length; i++) {
    displayBtns[i].addEventListener('click', function() {
      display.innerHTML += displayBtns[i].innerHTML;
      currentDisplay.push(display.innerHTML);
      console.log(currentDisplay);
    })
};


//solve function
equals.addEventListener('click', () => {;
    let equationString = currentDisplay.pop();
    let equationArray = [];
    for (let i = 0; i<equationString.length; i++) {
        equationArray.push(equationString[i]);
    }
    let operatorIndex = equationArray.findIndex(e => isNaN(e));
    console.log(operatorIndex);
    let num1String = equationArray.slice(0,operatorIndex).join("");
    console.log(num1String);
    let num2String = equationArray.slice((operatorIndex + 1)).join("");
    console.log(num2String);
    num1 = parseInt(num1String);
    num2 = parseInt(num2String);
    operator = equationArray.slice(operatorIndex, (operatorIndex + 1)).toString();
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

