function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}
function operate(firstNum, secondNum, operator) {
    if (operator === "add")
        return Math.round(add(firstNum, secondNum) * 100) / 100;
    else if (operator === "subtract")
        return Math.round(subtract(firstNum, secondNum) * 100) / 100;
    else if (operator === "multiply")
        return Math.round(multiply(firstNum, secondNum) * 100) / 100;
    else if (operator === "divide") {
        if (secondNum === 0) {
            return undefined;
        }
        else {
            return Math.round(divide(firstNum, secondNum) * 100) / 100;
        }
    }
}
// displays the value
function handleDisplay(value) {
    let screenElement = document.querySelector("#screen");
    screenElement.textContent = value;
}
// acts as the "equals" operator
function handleEquals() {
    if (prevNum !== undefined && currNum !== "0" && currOperator !== undefined) {
        let result = operate(Number(prevNum), Number(currNum), currOperator);
        if (result === undefined) {
            alert("Can not divide by 0!");
            handleClear();
        } else {
            handleDisplay(result);
            currNum = result;
            prevNum = undefined;
            currOperator = undefined;
        }
    }
}
// handle clear function
function handleClear() {
    prevNum = undefined;
    currNum = "0";
    currOperator = undefined;
    lastClicked = "0";
    handleDisplay(currNum);
}
// handle delete function
function handleDelete() {
    if (currNum !== "0") {
        currNum = currNum.substring(0, currNum.length - 1);
        handleDisplay(currNum);
    }
}
// handle operator function
function handleOperators(event) {
    if (currOperator !== undefined) {
        handleEquals();
    }
    currOperator = event.target.id;
    lastClicked = event.target.id;
}
// handle numbers
function handleNumbers(event) {
    // after an operator is clicked and when a new number is written
    // for: the first letter of the seoncd operand
    if (isNaN(lastClicked)) {
        prevNum = currNum;
        currNum = event.target.textContent;
        lastClicked = event.target.textContent;
        handleDisplay(currNum);
    }
    // in the beginning or when continuing a number
    // for: both operands
    else {
        if (currNum === "0") {
            currNum = event.target.textContent;
        }
        else {
            currNum += event.target.textContent;
        }
        lastClicked = event.target.textContent;
        handleDisplay(currNum);
    }
}
// handle decimal point function
function handleDecimal() {
    if (!currNum.includes(".")) {
        currNum += ".";
        handleDisplay(currNum);
    }
}
// clear
let clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", handleClear);
// global variables
let prevNum;
let currNum = "0";
let currOperator;
let lastClicked = "0";
// numbers
let allNumberButtons = document.querySelectorAll(".number");
for (let i = 0; i < allNumberButtons.length; i++) {
    allNumberButtons[i].addEventListener("click", handleNumbers);
}
// operators
let allOperatorButtons = document.querySelectorAll(".operator");
for (let i = 0; i < allOperatorButtons.length; i++) {
    allOperatorButtons[i].addEventListener("click", handleOperators);
}
// equals
let equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", handleEquals);
// delete
let deleteButton = document.querySelector("#delete");
deleteButton.addEventListener("click", handleDelete);
// decimal
let decimalButton = document.querySelector("#decimal");
decimalButton.addEventListener("click", handleDecimal);

// start the calculator
handleDisplay(currNum);