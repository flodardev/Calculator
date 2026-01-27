// Basic math operators
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

// Calculator display
const display = document.querySelector(".display");
display.textContent = 0;

// Button functions
const buttonList = document.querySelectorAll("button");
buttonList.forEach(button => {
    button.addEventListener("click", event => {
        event.preventDefault();
        let value = event.target.value;

        if (!isNaN(+value)) {
            if (display.textContent == 0) {
               display.textContent = +value; 
            } else {
                display.textContent += +value;
            }
        }
        
        switch(value) {
            case "clear":
                display.textContent = "0";
                break;
            case "+":
                display.textContent += ` \u002b `;
                break;
            case "-":
                display.textContent += ` \u002d `;
                break;
            case "*":
                display.textContent += ` \u00D7 `;
                break;
            case "/":
                display.textContent += ` \u00f7 `;
                break;
            case ".":
                display.textContent += `\u002e`;
                break;
            case "=":
                display.textContent += ` \u003d `;
                break;
        }
    })
})

