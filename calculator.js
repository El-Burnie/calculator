const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const functionButtons = document.querySelectorAll(".function"); 

let numberFirst = 0;
let numberSecond = 0;
let operator;
const OPERATIONS = Object.freeze({
    ADD: "ADD",
    SUBTRACT: "SUBTRACT",
    MULTIPLY: "MULTIPLY",
    DIVIDE: "DIVIDE"
});

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

