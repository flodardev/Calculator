// Variables
let firstNumber = null;
let operator = "";
let secondNumber = null;
let display = document.querySelector(".display");
let shouldResetDisplay = false;
let oneCycle = false;
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

                secondNumber = +display.textContent;

                shouldResetDisplay = false;
            } else if (display.textContent === "0") {
                display.textContent = value;



            } else {
                display.textContent += value;
            }
        }

        switch(value) {
            case "clear":
                reset();
                break;
            case "delete":
                deleteWhole();
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                if (firstNumber === null) {
                    firstNumber = +display.textContent;
                }  else if (operator !== "" && !shouldResetDisplay) {
                    firstNumber = operate(firstNumber, operator, secondNumber);
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

function deleteInput() {
    // do something
    console.log("deleteInput() triggered")
    let stringFirstNumber = String(firstNumber);
    console.log(stringFirstNumber);
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
}

// Keyboard support
document.addEventListener("keydown", event => {
    event.preventDefault();
    let value = event.key;

    // Number input
    if (!isNaN(+value)) {
        if (shouldResetDisplay) {
            display.textContent = value;

            secondNumber = +display.textContent;

            shouldResetDisplay = false;
        } else if (display.textContent === "0") {
            display.textContent = value;



        } else {
            display.textContent += value;
        }
    }

    switch(value) {
        case "clear":
            reset();
            break;
        case "delete":
            if (oneCycle) {
                reset();
                break;
            }

            // Delete starting from the right of the equation
            if (secondNumber !== null) {
                secondNumber = null;
                display.textContent = "0";
                shouldResetDisplay = true;
                break;
            } else if (operator !== "") {
                operator = "";
                break;
            } else {
                firstNumber = null;
                display.textContent = "0";
                break;
            }
        case "+":
        case "-":
        case "*":
        case "/":
            if (firstNumber === null) {
                firstNumber = +display.textContent;
            }  else if (operator !== "" && !shouldResetDisplay) {
                firstNumber = operate(firstNumber, operator, secondNumber);
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