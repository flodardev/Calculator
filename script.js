// Vvariables
let operatorSymbol;
let arrayCalcHistory = [];
let array = [];
let anyNumber = "";


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
               anyNumber += value;
            } else {
                display.textContent += +value;
                anyNumber += value;
            }
        }
        
        switch(value) {
            case "clear":
                display.textContent = "0";
                anyNumber = "";
                array.length = 0;
                break;
            case "+":
                display.textContent += ` \u002b `;
                operatorSymbol = value;

                array.push(anyNumber);
                anyNumber = "";

                break;
            case "-":
                display.textContent += ` \u002d `;
                operatorSymbol = value;

                array.push(anyNumber);
                anyNumber = "";

                break;
            case "*":
                display.textContent += ` \u00D7 `;
                operatorSymbol = value;

                array.push(anyNumber);
                anyNumber = "";

                break;
            case "/":
                display.textContent += ` \u00f7 `;
                operatorSymbol = value;

                array.push(anyNumber);
                anyNumber = "";

                break;
            case ".":
                display.textContent += `\u002e`;
                break;
            case "=":
                
                if (anyNumber !== "") {
                    array.push(anyNumber);
                    anyNumber = "";
                }

                display.textContent = operate(array, operatorSymbol);

                if (display.textContent === "") {
                    display.textContent = "0";
                }
                
                // display.textContent += ` \u003d `;
                break;
        }
    })
})


function operate(array, operatorSymbol) {
    console.log(array)

    // Dictionary of operations
    const operations = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
    };

    const operation = operations[operatorSymbol];

    const total = array.reduce((total, current) => {
        return operation(+total, +current);
    }, 0)

    // Push to history array
    arrayCalcHistory.push(total);
    console.log(arrayCalcHistory);

    // Empty the calculation array
    array.length = 0;

    // Reset operator symbol
    operatorSymbol = "";

    return total;
}