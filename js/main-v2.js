// Array with all the button values

let calcBtns = ['C', '', '', '/', '7', '8', '9', 'X', '4', '5', '6', '-', '1', '2', '3', '+', '0', '', '.', '='];

// Default Values
let num1 = '';
let num2 = '';
let operand = '';

// Function to render elements
function renderElement(element, classes) {
    let output = document.createElement(element);
    output.className = classes;
    return output;
}

// Renders the page elements on load
function loadCalc() {
    // Create Elements
    let container = renderElement('div', 'container-fluid');
    let row = renderElement('div', 'row');

    let leftCol = renderElement('div', 'col-0 col-sm-0 col-md-1 col-lg-2');
    let centerCol = renderElement('div', 'col-12 col-sm-12 col-md-10 col-lg-8 text-center');
    let rightCol = renderElement('div', 'col-0 col-sm-0 col-md-1 col-lg-2');

    let title = renderElement('h1', 'my-5 display-4 text-white');
    title.innerHTML = 'Calculator';

    let displayRow = renderElement('div', 'row');

    let display = renderElement('div', 'col bg-light text-right ml-0');
    display.id = 'displayWindow';
    display.setAttribute('style', 'height: 80px;');
    display.innerHTML = 0;

    let bottom = renderElement('div', 'p-5');

    // Append Elements
    centerCol.appendChild(title);
    centerCol.appendChild(displayRow);
    displayRow.appendChild(display)

    // Create the btns and append them to calcRow
    let calcRow = document.createElement('div');
    calcRow.className = 'row';
    for (let i = 0; i < 20; i++) {
        let btn = document.createElement('button');
        btn.className = 'col-3 border bg-light display-4 button';
        btn.setAttribute('type', 'button');
        btn.id = `${calcBtns[i]}`;
        btn.setAttribute('style', 'height: 80px;');
        let text = document.createTextNode(`${calcBtns[i]}`);
        btn.appendChild(text);
        if (calcBtns[i] !== '') {
            btn.addEventListener('click', clickedOn);
        } else {
            // Disables the blank buttons
            btn.disabled = true;
        }
        calcRow.appendChild(btn);
        centerCol.appendChild(calcRow);
    }

    centerCol.appendChild(bottom);

    row.appendChild(rightCol);
    row.appendChild(centerCol);
    row.appendChild(leftCol);

    container.appendChild(row);

    let app = document.getElementById('app');
    app.appendChild(container);
}




// CALC LOGIC
// Differentiates between numbers and symbols, converts number values to numbers
function clickedOn() {
    if (this.id === 'C' || this.id === '/' || this.id === 'X' || this.id === '-' || this.id === '+' || this.id === '=' || this.id === '.') {
        symPress(this.id);
    } else {
        numPress(this.id);
    }
}

// Create multidigit numbers
function numPress(inputNum) {
    if (operand === '') {
        num1 += inputNum;
        displayWindow.innerHTML = num1;
    } else {
        num2 += inputNum;
        displayWindow.innerHTML = num2;
    }
}

function symPress(inputSym) {
    switch (inputSym) {
        case '+':
            displayWindow.innerHTML = '+';
            operand = '+';
            break;
        case '-':
            displayWindow.innerHTML = '-';
            operand = '-';
            break;
        case '/':
            displayWindow.innerHTML = '/';
            operand = '/';
            break;
        case 'X':
            displayWindow.innerHTML = '*';
            operand = '*';
            break;
        case '=':
            displayWindow.innerHTML = mathCalc(operand);
            break;
        case '.':
            if (operand === '') {
                if (!num1.includes('.')) {
                    num1 += '.';
                    console.log(num1);
                    displayWindow.innerHTML = num1;
                }
            } else {
                if (!num2.includes('.')) {
                    num2 += '.';
                    console.log(num2);
                    displayWindow.innerHTML = num2;
                }
            }
            break;
        case 'C':
            num1 = '';
            num2 = '';
            operand = '';
            displayWindow.innerHTML = 0;
    }
}

function mathCalc(sym) {
    switch (sym) {
        case '+':
            return Number(num1) + Number(num2);
        case '-':
            return Number(num1) - Number(num2);
        case '/':
            return Number(num1) / Number(num2);
        case '*':
            return Number(num1) * Number(num2);
    }
}


// if (calcBtns[i] === '.' && !num2.includes('.')) {
//     num2 += '.';
// }