// Variables
let firstNumber = null;
let operator = "";
let secondNumber = null;
let display = document.querySelector(".display");
let shouldResetDisplay = false;
let oneCycle = false;
let onFirstNumber = true;
let onSecondNumber = false;
let onOperator = false;

display.textContent = 0;

function handleInput(value) {
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
        return; // Exit after handling number
    }

    switch (value) {
        case "clear":
            reset();
            break;
        case "delete":
        case "Backspace":
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
            if (oneCycle) {
                oneCycle = false;
                display.textContent = 0;
            }

            if (onFirstNumber) {
                onFirstNumber = false;
                onSecondNumber = true;
                onOperator = true;
            } else if (operator !== "" && !shouldResetDisplay) {
                firstNumber = operate(+firstNumber, operator, +secondNumber);
                display.textContent = firstNumber;

                oneCycle = true;
            }
            operator = value;
            if (!oneCycle) {
                display.textContent += operator;
            }
            shouldResetDisplay = true;
            break;

        case ".":
            if (!display.textContent.includes(".")) {
                display.textContent += ".";
            }
            break;

        case "=":
        case "Enter":
            if (firstNumber !== null && operator !== "") {
                secondNumber = display.textContent; /* logic used current display content */
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
                oneCycle = true;
            }
            break;
    }
}

// Mouse support
const buttonList = document.querySelectorAll("button");
buttonList.forEach(button => {
    button.addEventListener("click", event => {
        event.preventDefault();
        handleInput(event.target.value);
    })
})

// Keyboard support
document.addEventListener("keydown", event => {
    // Prevent default behavior for special keys to avoid scrolling/etc (optional but good)
    if (event.key === "/" || event.key === "Enter") {
        event.preventDefault();
    }

    let value = event.key;

    // Map keyboard keys to calculator values
    if (value === "Escape") value = "clear";
    if (value === "Backspace") value = "delete";
    if (value === "Enter") value = "=";

    // Filter valid inputs
    const validKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "+", "-", "*", "/", "=", "clear", "delete"];
    if (validKeys.includes(value)) {
        handleInput(value);
    }
})

function deleteInput() {
    // First number
    if (onFirstNumber) {
        let stringFirstNumber = String(display.textContent);

        stringFirstNumber = stringFirstNumber.slice(0, -1);
        display.textContent = stringFirstNumber || "0"; // handle empty string becoming 0
        firstNumber = +display.textContent;

        // Check empty string
        if (firstNumber === 0) {
            display.textContent = 0;
        }
    }

    // Operator
    if (onOperator && secondNumber === null) {
        onOperator = false;
        onFirstNumber = true;
    }

    // Second number
    if (onSecondNumber && onOperator) {
        let stringSecondNumber = String(secondNumber);
        stringSecondNumber = stringSecondNumber.slice(0, -1);
        display.textContent = stringSecondNumber || "0";
        secondNumber = +display.textContent;

        if (secondNumber === 0) {
            display.textContent = `${firstNumber}${operator}`

            onSecondNumber = false;
            onFirstNumber = true;
        }
    }

}

function operate(first, op, second) {
    switch (op) {
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