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
}

function equals() {
    if (operator) {
        let tempNumber = operate(+numberFirst, +numberSecond, operator);
        tempNumber = Math.round(tempNumber * 10000) / 10000;
        clear();
        numberFirst = tempNumber.toString();
    }
}

function negativeToggle() {
    if (operator && numberSecond) {
        numberSecond = (+numberSecond * -1).toString();
    } else if (numberFirst) {
        numberFirst = (+numberFirst * -1).toString();
    }
}

function appendDigit(digit) {
    if (!operator) {
        if (numberFirst === "0") numberFirst = "";
        numberFirst += digit;
    } else {
        if (numberSecond === "0") numberFirst = "";
        numberSecond += digit;
    }
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
}

function backspace() {
    if (operator) {
        if (numberSecond) {
            numberSecond = numberSecond.slice(0, -1);
        } else {
            operator = null;
        }
    } else if (numberFirst) {
        numberFirst = numberFirst.slice(0, -1);
    }
}

function updateDisplay() {
    displayString = numberFirst;
    if (operator) displayString += `${operator}${numberSecond}`;
    display.textContent = displayString;
}

function changeOperator(selectedOperator) {
    if (operator && numberSecond) {
        equals();
    }
    if (!numberFirst) {
        numberFirst = "0";
    }
    for (const key in OPERATIONS) {
        if (selectedOperator === OPERATIONS[key]) {
            operator = OPERATIONS[key];
        }
    }
}

function processKeyStroke(keyName) {
    switch (keyName) {
        // Digit Keys
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            appendDigit(keyName);
            break;
        // Operator Keys
        case "+":
        case "-":
            changeOperator(keyName);
            break;
        case "*":
            changeOperator(OPERATIONS.MULTIPLY);
            break;
        case "/":
            changeOperator(OPERATIONS.DIVIDE);
            break;
        // Function Keys
        case "Delete":
            clear();
            break;
        case "Backspace":
            backspace();
            break;
        case "'":
        case "!":
            negativeToggle();
            break;
        case ".":
            appendDecimal();
            break;
        case "=":
        case "Enter":
            equals();
    }
}

numberButtons.forEach(button => {
    button.addEventListener("click", e => {
        appendDigit(e.target.textContent);
        updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", e => {
        changeOperator(e.target.textContent);
        updateDisplay();
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
                backspace();
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
        updateDisplay();
    });
});

document.addEventListener("keydown", e => {
    const keyName = e.key;
    processKeyStroke(keyName);
    updateDisplay();
});