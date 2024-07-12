const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const functionButtons = document.querySelectorAll(".function");
const display = document.querySelector("#display");

let displayString = "";
let numberFirst = "";
let numberSecond = "";
let operator = null;
const OPERATIONS = Object.freeze({
    ADD: "+",
    SUBTRACT: "-",
    MULTIPLY: "×",
    DIVIDE: "÷"
});
const FUNCTIONS = Object.freeze({
    CLEAR: "AC",
    BACKSPACE: "⌫",
    NEGATIVE_TOGGLE: "±",
    DECIMAL: ".",
    EQUALS: "="
});

display.textContent = displayString;

function add(a = 0, b = 0) {
    return a + b;
}

function subtract(a = 0, b = 0) {
    return a - b;
}

function multiply(a = 0, b = 0) {
    return a * b;
}

function divide(a = 0, b = 1) {
    return a / b;
}

function operate(numberFirst = 0, numberSecond = 0, operator) {
    if (operator) {
        switch (operator) {
            case OPERATIONS.ADD:
                return add(numberFirst, numberSecond);
            case OPERATIONS.SUBTRACT:
                return subtract(numberFirst, numberSecond);
            case OPERATIONS.MULTIPLY:
                return multiply(numberFirst, numberSecond);
            case OPERATIONS.DIVIDE:
                return divide(numberFirst, numberSecond);
        }
    }
}

function clear() {
    numberFirst = "";
    numberSecond = "";
    operator = null;
    updateDisplay();
}

function equals() {
    if (operator) {
        const tempNumber = operate(+numberFirst, +numberSecond, operator);
        clear();
        numberFirst = tempNumber.toString();
        updateDisplay();
    }
}

numberButtons.forEach(button => {
    button.addEventListener("click", e => {
        if (!operator) {
            if (numberFirst === "0") numberFirst = "";
            numberFirst += e.target.textContent;
        } else {
            if (numberSecond === "0") numberFirst = "";
            numberSecond += e.target.textContent;
        }
        updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", e => {
        if (!operator) {
            for (const key in OPERATIONS) {
                if (e.target.textContent === OPERATIONS[key]) {
                    operator = OPERATIONS[key];
                    updateDisplay();
                }
            }
        }
    });
});

functionButtons.forEach(button => {
    button.addEventListener("click", e => {
        const selectedFunction = e.target.textContent
        switch (selectedFunction) {
            case FUNCTIONS.CLEAR:
                clear();
                break;
            case FUNCTIONS.BACKSPACE:
                console.log(selectedFunction);
                break;
            case FUNCTIONS.NEGATIVE_TOGGLE:
                console.log(selectedFunction);
                break;
            case FUNCTIONS.DECIMAL:
                console.log(selectedFunction);
                break;
            case FUNCTIONS.EQUALS:
                equals();
        }
    });
});

function updateDisplay() {
    displayString = numberFirst;
    if (operator) displayString += ` ${operator} ${numberSecond}`;
    display.textContent = displayString;
}