// Variables
let firstNumber = null;
let operator = "";
let secondNumber = null;
let display = document.querySelector(".display");
let shouldResetDisplay = false;
display.textContent = 0;

const buttonList = document.querySelectorAll("button");
buttonList.forEach(button => {
    button.addEventListener("click", event => {
        event.preventDefault();
        let value = event.target.value;

        // Number input
        if (!isNaN(+value)) {
            if (shouldResetDisplay) {
                display.textContent = value;
                shouldResetDisplay = false;
            } else if (display.textContent === "0") {
                display.textContent = value;
            } else {
                display.textContent += value;
            }
        }

        switch(value) {
            case "clear":
                firstNumber = null;
                operator = "";
                secondNumber = null;
                display.textContent = "0";
                shouldResetDisplay = false;
                break;
            case "delete":
                console.log("delete button clicked")
                console.log(secondNumber)
                // Delete starting from the right of the equation
                if (secondNumber != null) {
                    console.log("hello")
                    secondNumber = null;
                    display.textContent = "0";
                    break;
                } else if (operator !== "") {
                    operator = "";
                    break;
                } else if (firstNumber !== null) {
                    firstNumber = null;
                    break;
                }
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                if (firstNumber === null) {
                    firstNumber = +display.textContent;
                } else if (operator !== "" && !shouldResetDisplay) {
                    secondNumber = +display.textContent;
                    firstNumber = operate(firstNumber, operator, secondNumber);
                    display.textContent = firstNumber;
                }
                operator = value;
                shouldResetDisplay = true;
                break;

            case ".":
                if (!display.textContent.includes(".")) {
                    display.textContent += ".";
                }
                break;

            case "=":
                if (firstNumber !== null && operator !== "") {
                    secondNumber = +display.textContent;
                    firstNumber = operate(firstNumber, operator, secondNumber);
                    
                    if (isNaN(firstNumber)) {
                        display.textContent = "To Infinity and beyond!";
                    } else {
                        display.textContent = Math.floor(firstNumber * 100) / 100;
                    }

                    firstNumber = null;
                    operator = "";
                    secondNumber = null;
                    shouldResetDisplay = true;
                }
                break;
        }
    })
})

function operate(first, op, second) {
    switch(op) {
        case "+": return first + second;
        case "-": return first - second;
        case "*": return first * second;
        case "/": return second !== 0 ? first / second : NaN;
        default: return first;
    }
}