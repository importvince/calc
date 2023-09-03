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
//trackers
let currentDisplay = [];
let operationTracker = [];
let operatorClickCount = 0;
let isEqualsClicked = false;


//clear button function AKA reset everything
reset.addEventListener('click', () => {
    display.innerHTML = "";
    currentDisplay.splice(0, currentDisplay.length);
    operationTracker = [];
    operatorClickCount = 0;
    num1 = "";
    num2 = "";
    operator = "";
})

//delete button function
backspace.addEventListener('click', () => {
    //if words on screen, just remove it all
    if(display.innerHTML == 'undefined' || display.innerHTML == 'Infinity' || display.innerHTML == 'get real') {
        display.innerHTML = "";
    //otherwise just delete the last character
    } else {
        let array = [];
        for (let i = 0; i < display.innerHTML.length; i++) {
            array.push(display.innerHTML[i]);
        }
        console.log[array];
        let sliced = array.slice(0, -1);
        let slicedString = sliced.join("");
        display.innerHTML = slicedString;
    }
});

//display number and operator buttons once pressed
for (let i = 0; i < displayBtns.length; i++) {
    displayBtns[i].addEventListener('click', function() {
      display.innerHTML += displayBtns[i].innerHTML;
      currentDisplay.push(display.innerHTML);
      //keep count of operator press count and type
      if(allOpBtns.includes(displayBtns[i])) {
        operatorClickCount++;
        operationTracker.push(displayBtns[i].innerHTML);
      }
      //if more than one operator pressed, run solver
      if(operatorClickCount > 1) {
        solver();
        //if only one is pressed, enable the equals button
      } else {
        isEqualsClicked = false;
        equals.disabled = false;
      }
    }
)
};

// solver function
function solver() {
    //grab last element in current display
    let equationString = currentDisplay.pop();
    let equationArray = [];
    //break it up into compenent pieces
    for (let i = 0; i<equationString.length; i++) {
        equationArray.push(equationString[i]);
    }
    //find where the operator (non number) is
    let operatorIndex = equationArray.findIndex(e => isNaN(e));
    console.log(operatorIndex);
    //slice the array up to the operator for num1
    let num1String = equationArray.slice(0,operatorIndex).join("");
    console.log(num1String);
    //slice the array after the operator for num2
    let num2String = equationArray.slice((operatorIndex + 1)).join("");
    console.log(num2String);

    num1 = parseInt(num1String);
    num2 = parseInt(num2String);
    //if equals is pressed again without a second number, just assume num1 and num2 are the same
    if(isNaN(num2)) {
        num2 = num1;
    }
    //slice the operaotr out of the array for operator variable
    operator = equationArray.slice(operatorIndex, (operatorIndex + 1)).toString();
    console.log(num1,num2,operator);
    //run the operate functions with these variables and round to 2 decimal places
    let result = operate(num1,num2,operator);
    //check for long decimals and round
    let resultString = result.toString();
    if(resultString.length > 10) {
        result = result.toFixed(2);
    }
    //put that result in the display and set it equal to num1 for next operation
    display.innerHTML = result;
    num1 = result;
    num2 = "";
    //if an operator button has been pressed 0 or 1 times, set the operator variable back to nothing
    if(operatorClickCount <= 1) {
        operator = '';
        //otherwise, set it equal to the last element in the array that tracks which operator has been pressed
    } else {
        operator =  operationTracker.pop().toString();
        //display that operator next to the result
        display.innerHTML+=operator;
        //set count back to 1 so that the operator variable is cleared if solver is run again using the equals button instead
        operatorClickCount = 1;
        //place the new operaotr back into the tracker since we removed it
        operationTracker = [operator];
        //enable the equals button
        isEqualsClicked = false;
        equals.disabled = false;
    }
}

//solve if equals is clicked
equals.addEventListener('click', () => {
    //disable the equals button after 1 press
    if (!isEqualsClicked) {
        solver();
        equals.disabled = true;
        isEqualsClicked = true;
        operator = "";
        operatorClickCount--;
    } else {
        return;
    }
});



// basic math functionality
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
        if(b == 0) {
            const divided = 'get real';
            return divided;
        } else {
            const divided = divide(a,b);
            console.log(divided);
            return divided;
        }
    } else console.log('Error');
};

