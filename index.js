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
let operatorSymbols = ['+', '-', '*', '/'];
//trackers
let currentDisplay = [];
let operationTracker = [];
let operatorClickCount = 0;
let isEqualsClicked = false;
let isPeriodClicked = false;


//clear button function AKA reset everything
reset.addEventListener('click', () => {
    display.textContent = "";
    currentDisplay.splice(0, currentDisplay.length);
    operationTracker = [];
    operatorClickCount = 0;
    num1 = "";
    num2 = "";
    operator = "";

    //enable period button
    period.disabled = false;
    isPeriodClicked = false;
})

//delete button function
backspace.addEventListener('click', () => {
    //if words on screen, just remove it all
    if(display.textContent == 'undefined' || display.textContent == 'Infinity' || display.textContent == 'get real') {
        display.textContent = "";
    //otherwise just delete the last character
    } else {
        let array = [];
        for (let i = 0; i < display.textContent.length; i++) {
            array.push(display.textContent[i]);
        }
        console.log[array];
        let sliced = array.slice(0, -1);
        let slicedString = sliced.join("");
        display.textContent = slicedString;
    }
});

//same as above, but for 'Backspace' keyboard click
document.addEventListener('keydown', (e) => {
    if(
        e.key === 'Backspace'
    ) {
    //if words on screen, just remove it all
    if(display.textContent == 'undefined' || display.textContent == 'Infinity' || display.textContent == 'get real') {
        display.textContent = "";
    //otherwise just delete the last character
    } else {
        let array = [];
        //push all values into a new array
        for (let i = 0; i < display.textContent.length; i++) {
            array.push(display.textContent[i]);
        }
        console.log[array];
        //slice that array up to the last value, turn into a string, and display
        let sliced = array.slice(0, -1);
        let slicedString = sliced.join("");
        display.textContent = slicedString;
    }
}
});

//display number and operator buttons once pressed
for (let i = 0; i < displayBtns.length; i++) {
    displayBtns[i].addEventListener('click', function() {
      display.textContent += displayBtns[i].textContent;
      currentDisplay.push(display.textContent);
      console.log(currentDisplay);

      //keep count of operator press count and type
      if(allOpBtns.includes(displayBtns[i])) {
        operatorClickCount++;
        operationTracker.push(displayBtns[i].textContent);
        console.log(operatorClickCount);

        //enable period button
        period.disabled = false;
        isPeriodClicked = false;
      }
      //if more than one operator pressed, run solver
      if(operatorClickCount > 1) {
        solver();
        //if only one is pressed, enable the equals button
      } else {
        //enable equals button
        isEqualsClicked = false;
        equals.disabled = false;
      }
    }
)
};

//same as above, but for number keyboard clicks
document.addEventListener('keydown', (e) => {
    console.log(e.key);
    if (
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '+' ||
        e.key === '-' ||
        e.key === '*' ||
        e.key === '/' ||
        e.key === '.'
    ) {
        let button = e.key;
        display.textContent += button;
        currentDisplay.push(display.textContent);
        console.log(currentDisplay);
        //keep count of operator press count and type
        if(operatorSymbols.includes(button)) {
            operatorClickCount++;
            operationTracker.push(button);
            console.log(operatorClickCount);
            console.log(operationTracker);

            //enable period button
            period.disabled = false;
            isPeriodClicked = false;
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
})

// solver function
function solver() {
    //grab last element in current display
    let equationString = currentDisplay.pop();
    let equationArray = [];

    //break it up into compenent pieces
    for (let i = 0; i<equationString.length; i++) {
        equationArray.push(equationString[i]);
    }

    //find where the operator is while avoiding decimals 
    let operatorIndex = equationArray.findIndex((e) => {
        return typeof(e) == 'string' && operatorSymbols.includes(e);
    });
    console.log('opindex: '+ operatorIndex)

    //slice the array up to the operator for num1
    let num1String = equationArray.slice(0,operatorIndex).join("");
    console.log(num1String);

    //slice the array after the operator for num2
    let num2String = equationArray.slice((operatorIndex +1)).join("");
    console.log(num2String);

    //turn those both into Float type
    num1 = parseFloat(num1String);
    num2 = parseFloat(num2String);

    //if equals is pressed again without a second number, just assume num1 and num2 are the same
    if(isNaN(num2)) {
        num2 = num1;
    }

    //slice the operator out of the array for operator variable
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
    display.textContent = result;
    num1 = result;
    num2 = "";

    //if an operator button has been pressed 0 or 1 times, set the operator variable back to nothing
    if(operatorClickCount <= 1) {
        operator = '';

        //otherwise, set it equal to the last element in the array that tracks which operator has been pressed
    } else {
        operator =  operationTracker.pop().toString();

        //display that operator next to the result
        display.textContent+=operator;

        //set count back to 1 so that the operator variable is cleared if solver is run again using the equals button instead
        operatorClickCount = 1;

        //place the new operator back into the tracker since we removed it
        operationTracker = [operator];

        //enable the equals button
        isEqualsClicked = false;
        equals.disabled = false;

        //enable the period button
        period.disabled = false;
        isPeriodClicked = false;
    }
}

//limit to one decimal per side of equation
period.addEventListener('click', () => {
    if(!isPeriodClicked) {
        period.disabled = true;
        isPeriodClicked = true;
    }
});

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

//same as above, but for 'Shift' keyboard click
document.addEventListener('keydown', (e) => {
    if(
        e.key === 'Enter'
    ) {
    //disable the equals button after 1 press and run solver
    if (!isEqualsClicked) {
        solver();
        equals.disabled = true;
        isEqualsClicked = true;
        operator = "";
        operatorClickCount--;
    } else {
        return;
    }
    }
});

//same as above but for equals button
document.addEventListener('keydown', (e) => {
    if(
        e.key === '='
    ) {
    //disable the equals button after 1 press and run solver
    if (!isEqualsClicked) {
        solver();
        equals.disabled = true;
        isEqualsClicked = true;
        operator = "";
        operatorClickCount--;
    } else {
        return;
    }
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
    } else if(operator == '*') {
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

