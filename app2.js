const buttons = document.querySelectorAll('button');
const display = document.querySelector('.display');
let firstNumber = '';
let secondNumber = '';
let math = ''
let calculated = false;
const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', '/', '×'];

buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const value = event.target.innerHTML;
        operation(value);
    });
});

function operation(value){
    switch (value) {
        case '+/-':  if(!action.includes(display.innerHTML)) { toggle();} break;
        case 'C': clearValues();clearDisplay(); break;
        case '⌫':  deleteNumber();break;
        case '%':  percent();break;
        case '=': calculate();break;
        default:
            if (action.includes(value)) {
                math = value;
                displayNumber(value);
            }else if(digit.includes(value)){
                fillNumber(value)
            }
            break;
    }
}

function clearValues() {
    firstNumber = secondNumber =  math = '';
    calculated = false;
}

function clearDisplay() {
    display.innerHTML = '0';
}

function displayNumber(number) {
    display.innerHTML = number;
}

function switchNumber(newNum) {
    if (math === '') {
        firstNumber = newNum;
    } else {
        secondNumber = newNum;
    }
}

function toggle() {
    let newNum = display.innerHTML;

    if (display.innerHTML.startsWith('-')) {
        newNum = newNum.slice(1);
        displayNumber(newNum);
    } else {
        newNum = '-' + newNum;
        displayNumber(newNum);
    }
    switchNumber(newNum);
}

function percent() {
    let newNum = (parseFloat(display.innerHTML) / 100).toString();
    displayNumber(newNum);
    switchNumber(newNum);
}

function fillNumber(value){
    if (calculated) {
        clearValues();
        firstNumber = value;
        displayNumber(firstNumber);
        return;
    }
    if (value === '.' && display.innerHTML.includes('.')) {
        return;
    }
    if (secondNumber === '' && math === '') {
        firstNumber += value;
        displayNumber(firstNumber);
    } else {
        secondNumber += value;
        displayNumber(secondNumber);
    }
}

function calculate(){
    if (secondNumber === '') {
        secondNumber = firstNumber;
    }
    switch (math) {
        case '+': firstNumber = (+firstNumber) + (+secondNumber); break;
        case '-': firstNumber = (+firstNumber) - (+secondNumber); break;
        case '×': firstNumber = (+firstNumber) * (+secondNumber); break;
        case '/':
            if (+secondNumber === 0) {
                clearValues();
                clearDisplay();
                return;
            }
            firstNumber = (+firstNumber) / (+secondNumber)
            break;
    }
    calculated = true;
    displayNumber(firstNumber);
}


function deleteNumber() {
    let newNum = display.innerHTML;
    if (calculated) {
        return;
    }
    if (newNum.length > 1) {
        newNum = newNum.slice(0, -1);
        displayNumber(newNum);
    } else {
        clearDisplay();
    }
    switchNumber(newNum);
}


