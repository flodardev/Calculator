// Basic math operators
console.log(add(1, 2))

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

// Three variables
let firstNumber;
let operatorSymbol;
let secondNumber;

// Operate function
function operate(firstNumber, secondNumber, operator) {
    switch(operator){
        case "+":
            return add(firstNumber, secondNumber);
        case "-":
            return substract(firstNumber, secondNumber);
        case "*":
            return multiply(firstNumber, secondNumber);
        case "/":
            return divide(firstNumber,secondNumber);
        default:
            console.log("Operate function default action");
            break;
    }
}