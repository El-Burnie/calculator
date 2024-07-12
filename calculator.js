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

function negativeToggle() {
    if (operator && numberSecond) {
        numberSecond = (+numberSecond * -1).toString();
    } else if (numberFirst) {
        numberFirst = (+numberFirst * -1).toString();
    }
    updateDisplay();
}

function appendDecimal() {
    const decimal = FUNCTIONS.DECIMAL;
    if (operator && !numberSecond.includes(decimal)) {
        if (!numberSecond) {
            numberSecond = `0${decimal}`;
        } else {
            numberSecond += decimal;
        }
    } else if (!numberFirst.includes(decimal)) {
        if (!numberFirst) {
            numberFirst = `0${decimal}`;
        } else {
            numberFirst += decimal;
        }
    }
    updateDisplay();
}

function updateDisplay() {
    displayString = numberFirst;
    if (operator) displayString += ` ${operator} ${numberSecond}`;
    display.textContent = displayString;
}

function changeOperator(selectedOperator) {
    for (const key in OPERATIONS) {
        if (selectedOperator === OPERATIONS[key]) {
            operator = OPERATIONS[key];
            updateDisplay();
        }
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
        if (operator && numberSecond) {
            equals();
        }
        changeOperator(e.target.textContent);
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
                negativeToggle();
                break;
            case FUNCTIONS.DECIMAL:
                appendDecimal();
                break;
            case FUNCTIONS.EQUALS:
                equals();
        }
    });
});