// Variables
let firstNumber = null;
let operator = "";
let secondNumber = null;
let display = document.querySelector(".display");
let shouldResetDisplay = false;
let oneCycle = false;
display.textContent = 0;

let onFirstNumber = true;
let onSecondNumber = false;

const buttonList = document.querySelectorAll("button");
buttonList.forEach(button => {
    button.addEventListener("click", event => {
        event.preventDefault();
        let value = event.target.value;

        // Number input
        if (!isNaN(+value)) {
            if (shouldResetDisplay) {
                display.textContent = value;

                if (onFirstNumber) {
                    firstNumber = +display.textContent;
                }

                if (onSecondNumber) {
                    secondNumber = +display.textContent;
                }

                shouldResetDisplay = false;
            } else if (display.textContent === "0") {
                display.textContent = value;
                if (onFirstNumber) {
                    firstNumber = value;
                }
            } else if (onFirstNumber) {
                display.textContent += value;
                firstNumber += value;
            } else if (onSecondNumber) {
                display.textContent += value;
                secondNumber += value;
            }
        }

        switch(value) {
            case "clear":
                reset();
                break;
            case "delete":
                // deleteWhole();
                if (firstNumber === null) {
                    reset();
                } else {
                    deleteInput();
                }
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                if (onFirstNumber) {
                    onFirstNumber = false;
                    onSecondNumber = true;
                }  else if (operator !== "" && !shouldResetDisplay) {
                    firstNumber = operate(+firstNumber, operator, +secondNumber);
                    display.textContent = firstNumber;
                    
                    oneCycle = true;
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
                    secondNumber = display.textContent;
                    firstNumber = operate(+firstNumber, operator, +secondNumber);
                    
                    if (isNaN(firstNumber)) {
                        display.textContent = "To Infinity and beyond!";
                    } else {
                        display.textContent = Math.floor(firstNumber * 100) / 100;
                    }

                    firstNumber = null;
                    operator = "";
                    secondNumber = null;
                    onFirstNumber = true;
                    onSecondNumber = false;
                    shouldResetDisplay = true;
                }
                break;
        }
    })
})

function deleteInput() {
    // First number
    if (onFirstNumber) {
        let stringFirstNumber = String(firstNumber);

        stringFirstNumber = stringFirstNumber.slice(0, -1);
        display.textContent = stringFirstNumber;
        firstNumber = +display.textContent;
        //console.log("first number: " + stringFirstNumber)

        // Check empty string
        if (firstNumber === 0) {
            console.log("first number is empty")
            display.textContent = 0;
        }
    }
 

    // Second number
    if (onSecondNumber) {
        let stringSecondNumber = String(secondNumber);
        stringSecondNumber = stringSecondNumber.slice(0, -1);
        display.textContent = stringSecondNumber;
        secondNumber = +display.textContent;
        //console.log("second number: " + stringSecondNumber)
        if (secondNumber === 0) {
            console.log("second number is empty")
            display.textContent = 0;

            onSecondNumber = false;
            onFirstNumber = true;
        }
    }

}

function deleteWhole() {
    if (oneCycle) {
        reset();
        return;
    }

    // Delete starting from the right of the equation
    if (secondNumber !== null) {
        secondNumber = null;
        display.textContent = "0";
        shouldResetDisplay = true;
        return;
    } else if (operator !== "") {
        operator = "";
        return;
    } else {
        firstNumber = null;
        display.textContent = "0";
        return
    }
}

function operate(first, op, second) {
    switch(op) {
        case "+": return first + second;
        case "-": return first - second;
        case "*": return first * second;
        case "/": return second !== 0 ? first / second : NaN;
        default: return first;
    }
}

function reset() {
    firstNumber = null;
    operator = "";
    secondNumber = null;
    display.textContent = "0";
    shouldResetDisplay = false;
    oneCycle = false;
    onFirstNumber = true;
    onSecondNumber = false;
}

// Keyboard support
document.addEventListener("keydown", event => {
        event.preventDefault();
        let value = event.key;
        console.log(value)

        // Number input
        if (!isNaN(+value)) {
            if (shouldResetDisplay) {
                display.textContent = value;

                if (onFirstNumber) {
                    firstNumber = +display.textContent;
                }

                if (onSecondNumber) {
                    secondNumber = +display.textContent;
                }

                shouldResetDisplay = false;
            } else if (display.textContent === "0") {
                display.textContent = value;
                if (onFirstNumber) {
                    firstNumber = value;
                }
            } else if (onFirstNumber) {
                display.textContent += value;
                firstNumber += value;
            } else if (onSecondNumber) {
                display.textContent += value;
                secondNumber += value;
            }
        }

        switch(value) {
            case "Escape":
                reset();
                break;
            case "Backspace":
                // deleteWhole();
                deleteInput();
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                if (onFirstNumber) {
                    onFirstNumber = false;
                    onSecondNumber = true;
                }  else if (operator !== "" && !shouldResetDisplay) {
                    firstNumber = operate(+firstNumber, operator, +secondNumber);
                    display.textContent = firstNumber;
                    
                    oneCycle = true;
                }
                operator = value;
                operatorHistory.textContent = operator;
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
                    firstNumber = operate(+firstNumber, operator, +secondNumber);
                    
                    if (isNaN(firstNumber)) {
                        display.textContent = "To Infinity and beyond!";
                    } else {
                        display.textContent = Math.floor(firstNumber * 100) / 100;
                        oneCycle = true;
                    }

                    firstNumber = null;
                    operator = "";
                    secondNumber = null;
                    onFirstNumber = true;
                    onSecondNumber = false;
                    shouldResetDisplay = true;
                }
                break;
        }
})