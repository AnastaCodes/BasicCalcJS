let operator = '';
let result = '';
let firstNum = '';
let secondNum = '';
let innerValue = null;
let firstComplete = false;

const calculatorBox = document.querySelector('.calculator-buttons');
const display = document.querySelector('.display');

calculatorBox.addEventListener('click', (event) => {
    const currentClass = event.target.className;
    const currentValue = event.target.innerHTML;
    listener(currentClass, currentValue);
});

function listener(currentClass, currentValue) {
    switch (currentClass) {
        case "number":
            if (!firstComplete) {
                firstNum += currentValue;
                show(firstNum);
            } else {
                secondNum += currentValue;
                show(secondNum);
            }
            break;
        case "multiplication":
            operator = '*';
            show(operator);
            if (firstNum) {
                firstComplete = true;
            }
            if (firstNum && operator && secondNum) {
                calculate(firstNum, operator, secondNum);
                end();
                firstNum = result;
            }
            break;
        case "division":
            operator = '/';
            show(operator);
            if (firstNum) {
                firstComplete = true;
            }
            if (firstNum && operator && secondNum) {
                calculate(firstNum, operator, secondNum);
                end();
                firstNum = result;
            }
            break;
        case "subtraction":
            operator = '-';
            show(operator);
            if (firstNum) {
                firstComplete = true;
            }
            if (firstNum && operator && secondNum) {
                calculate(firstNum, operator, secondNum);
                end();
                firstNum = result;
            }
            break;
        case "addition":
            operator = '+';
            show(operator);
            if (firstNum) {
                firstComplete = true;
            }
            if (firstNum && operator && secondNum) {
                calculate(firstNum, operator, secondNum);
                end();
                firstNum = result;
            }
            break;
        case "calculate":
            if (firstNum && secondNum) {
                calculate(firstNum, operator, secondNum);
                end();
                firstNum = result.toString();
                firstComplete = true;
            }
            break;
        case "decimal":
            innerValue = display.innerHTML;
            if (innerValue === firstNum) {
                if (firstNum.indexOf(currentValue) === -1) {
                    firstNum += currentValue;
                    show(firstNum);
                }
            } else if (innerValue === secondNum) {
                if (secondNum.indexOf(currentValue) === -1) {
                    secondNum += currentValue;
                    show(secondNum);
                }
            } else {
                show('0');
            }
            break;
        case "percent" :
            innerValue = display.innerHTML;
            if (innerValue === firstNum) {
                firstNum = parseFloat(firstNum) * 0.01;
                firstNum = show(firstNum);
            } else if (innerValue === secondNum) {
                secondNum = parseFloat(secondNum) * 0.01;
                secondNum = show(secondNum);
            } else {
                show('0');
            }
            break;
        case "negate":
            innerValue = display.innerHTML;
            switch (innerValue) {
                case '0':
                    firstNum += '-'
                    firstNum = show(firstNum);
                    break;
                case '-':
                    firstNum = '';
                    show('0');
                    break;
                case firstNum:
                    firstNum = parseFloat(firstNum) * -1;
                    firstNum = show(firstNum);
                    break;
                case secondNum:
                    secondNum = parseFloat(secondNum) * -1;
                    secondNum = show(secondNum);
                    break;
                case "multiplication":
                    break;
                default:
                    secondNum += '-'
                    secondNum = show(secondNum);
            }
            break;
        case "clear":
            end();
            show('0');
            break;
        case "delete":
            innerValue = display.innerHTML;
            if (innerValue === firstNum) {
                firstNum = firstNum.slice(0, -1);
                if (firstNum.length <= 0) {
                    firstNum = '0'
                }
                firstNum = show(firstNum);
            } else {
                secondNum.slice(0, -1);
                if (secondNum.length <= 0) {
                    secondNum = '0'
                }
                secondNum = show(secondNum);
            }
            break;
        default:
    }
}

function calculate(firstNum, operator, secondNum) {
    switch (operator) {
        case '*':
            if ((firstNum === '0') || (secondNum === '0')) {
                result = 0;
            } else {
                result = parseFloat(firstNum) * parseFloat(secondNum);
                result = Math.floor(result * 10000) / 10000;
            }
            show(result);
            end();
            break;
        case '/':
            if ((firstNum === '0') || (secondNum === '0')) {
                result = 0;
            } else {
                result = parseFloat(firstNum) / parseFloat(secondNum);
                result = Math.floor(result * 10000) / 10000;
            }
            show(result);
            end();
            break;
        case '+':
            result = parseFloat(firstNum) + parseFloat(secondNum);
            result = Math.floor(result * 10000) / 10000;
            show(result);
            end();
            break;
        case '-':
            result = parseFloat(firstNum) - parseFloat(secondNum);
            result = Math.floor(result * 10000) / 10000;
            show(result);
            end();
            break;
        default:
            result = '0';
    }
    return result;
}

function end() {
    operator = '';
    firstNum = '';
    secondNum = '';
    firstComplete = false;
}

function show(value) {
    value = value.toString();
    display.innerHTML = value;
    return value;
}

