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

function operate(numberFirst, numberSecond, operator) {
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

numberButtons.forEach(button => {
    button.addEventListener("click", e => {
        if (numberFirst === "0") numberFirst = "";
        numberFirst += e.target.textContent;
        updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", e => {
        if (!operator) {
            for (const key in OPERATIONS) {
                if (e.target.textContent === OPERATIONS[key]) {
                    operator = OPERATIONS[key];
                }
            }
        }
    });
});

functionButtons.forEach(button => {
    button.addEventListener("click", e => {
        console.log(e.target.textContent);
    });
});

function updateDisplay() {
    displayString = numberFirst;
    if (operator) displayString += ` ${operator} `;
    display.textContent = displayString;
}