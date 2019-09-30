// Array with all the button values

let calcBtns = ['C', '', '', '/', '7', '8', '9', 'X', '4', '5', '6', '-', '1', '2', '3', '+', '0', '', '.', '='];

// Default Values
let num1 = '';
let num2 = '';
let operand = '';
// Values for multiple equal sign press
let equalTemp = undefined;
let eqPress = false;

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
    // title.innerHTML = 'Calculator';
    // A colorful title
    title.innerHTML = '<span class="text-danger">C</span><span class="text-primary">a</span><span class="text-warning">l</span><span class="text-dark">c</span><span class="text-danger">u</span><span class="text-primary">l</span><span class="text-warning">a</span><span class="text-dark">t</span><span class="text-danger">o</span><span class="text-primary">r</span>';

    let displayRow = renderElement('div', 'row');

    let display = renderElement('div', 'col bg-light text-right display-4');
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
            // Disables the blank buttons
        } else {
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

// Keyboard btns
document.addEventListener('keydown', function (e) {
    // Keys: Shift and "=/+" --> "+"
    if (e.keyCode === 187 && e.shiftKey) {
        symPress('+');
    }
    // Key "=/+" without Shift --> "="
    if (e.keyCode === 187 && !e.shiftKey) {
        symPress('=');
    }
    // Can use * for multiply
    if (e.keyCode === 56 && e.shiftKey) {
        symPress('X');
    }
    if (e.keyCode === 56 && !e.shiftKey) {
        numPress('8');
    }
    switch (e.keyCode) {
        case 67:
            symPress('C');
            break;
        // Delete key also --> Clear
        case 8:
            symPress('C');
            break;
        case 191:
            symPress('/');
            break;
        case 88:
            symPress('X');
            break;
        case 189:
            symPress('-');
            break;
        // Allows "enter" to be used as "=", since that seems pretty intuitive
        case 13:
            symPress('=');
            break;
        case 190:
            symPress('.');
            break;
        case 48:
            numPress('0');
            break;
        case 49:
            numPress('1');
            break;
        case 50:
            numPress('2');
            break;
        case 51:
            numPress('3');
            break;
        case 52:
            numPress('4');
            break;
        case 53:
            numPress('5');
            break;
        case 54:
            numPress('6');
            break;
        case 55:
            numPress('7');
            break;
        case 57:
            numPress('9');
            break;
    }
    if (displayWindow.innerHTML === 'NaN') {
        clear();
        displayWindow.innerHTML = '-Undefined-';
    }
});




// CALC LOGIC
// Differentiates between numbers and symbols
function clickedOn() {
    if (this.id === 'C' || this.id === '/' || this.id === 'X' || this.id === '-' || this.id === '+' || this.id === '=' || this.id === '.') {
        symPress(this.id);
    } else {
        numPress(this.id);
    }
    // If NaN (for example, from 0/0) clears the calc and displays a message)
    if (displayWindow.innerHTML === 'NaN') {
        clear();
        displayWindow.innerHTML = '-Undefined-';
    }
    // Debugging Logs:
    console.log(`Equation: ${num1}  ${operand} ${num2}`);
    console.log(`Equal temp num: ${equalTemp}; eqPress: ${eqPress}`)
    console.log('---------------');
}

// If a number is pressed
function numPress(inputNum) {
    // Resets the equal temp number on any number press
    equalTemp = undefined;
    // If equal was just pressed, followed by a number, clears the calc
    if (eqPress) {
        clear();
    }
    // Sets num1
    if (operand === '') {
        // Makes it so you can't enter 00000
        if (inputNum === '0' && num1 === '0') {
            num1 = '';
            // Caps the input length at 10 digits
        } else if (num1.length < 10) {
            if (num1 === '0') {
                num1 = '';
            }
            num1 += inputNum;
            displayWindow.innerHTML = num1;
        }
        // Sets num2
    } else {
        if (inputNum === '0' && num2 === '0') {
            num2 = '';
        } else if (num2.length < 10) {
            if (num2 === '0') {
                num2 = '';
            }
            num2 += inputNum;
            displayWindow.innerHTML = num2;
        }
    }
}

// If a symbol is pressed
function symPress(inputSym) {
    // If the sym is not =, then reset the equal values
    if (inputSym !== '=') {
        equalTemp = undefined;
        eqPress = false;
    }
    // Switch cases for various symbols
    switch (inputSym) {
        case '+':
            // Only allows you to input operands if num1 has already been defined
            // Otherwise, you can press an operand, and then a num, which can cause weird results
            if (num1 !== '') {
                // If num2 isn't defined yet, set the operand and do nothing else
                if (num2 === '') {
                    displayWindow.innerHTML = '+';
                    operand = '+';
                    break;
                    // If it has been defined, calculate the last 2 numbers, display that result,
                    // place the result in num1, and clear num2
                } else {
                    multiCalc(operand);
                    displayWindow.innerHTML = num1;
                    operand = '+';
                    break;
                }
            }
            break;
        case '-':
            if (num1 !== '') {
                if (num2 === '') {
                    displayWindow.innerHTML = '-';
                    operand = '-';
                    break;
                } else {
                    multiCalc(operand);
                    displayWindow.innerHTML = num1;
                    operand = '-';
                    break;
                }
            }
            break;
        case '/':
            if (num1 !== '') {
                if (num2 === '') {
                    displayWindow.innerHTML = '/';
                    operand = '/';
                    break;
                } else {
                    multiCalc(operand);
                    displayWindow.innerHTML = num1;
                    operand = '/';
                    break;
                }
            }
            break;
        case 'X':
            if (num1 !== '') {
                if (num2 === '') {
                    displayWindow.innerHTML = 'X';
                    operand = '*';
                    break;
                } else {
                    multiCalc(operand);
                    displayWindow.innerHTML = num1;
                    operand = '*';
                    break;
                }
            }
            break;
        case '=':
            // If either input is '.' --> display "Illegal use of decimal"
            if (num1 === '.' || num2 === '.') {
                clear();
                displayWindow.innerHTML = '-Invalid Use of Decimal-';
            }
            // Records a boolean for if = was the last sym pressed
            eqPress = true;
            // If neither num1 nor num2 have been defined yet, do nothing
            if (num1 === '' && num2 === '') {
                break;
                // If num2 is undefined, calculate using num1 [operand] num1
            } else if (num2 === '') {
                displayWindow.innerHTML = equalCalc(operand);
                break;
                // If num2 has been defined, record num2 in the equal sign's temp num holder, then calculate
            } else {
                equalTemp = num2;
                displayWindow.innerHTML = mathCalc(operand);
                break;
            }
        case '.':
            // If operand is undefined, then apply decimal to num1
            if (operand === '') {
                // Check to make sure num1 doesn't already have a decimal
                if (!num1.includes('.')) {
                    num1 += '.';
                    displayWindow.innerHTML = num1;
                }
            } else {
                if (!num2.includes('.')) {
                    num2 += '.';
                    displayWindow.innerHTML = num2;
                }
            }
            break;
        // Clears the calc and all its variables if btn C is pressed
        case 'C':
            clear();
    }
}

// Normal calculations --> [] + [] =
function mathCalc(sym) {
    switch (sym) {
        case '+':
            // Calculates num1 [operand] num2, stores that value 
            // in num1 and displays it, clears num2 for use in future calculations
            num1 = Number(num1) + Number(num2);
            num2 = '';
            return num1;
        case '-':
            num1 = Number(num1) - Number(num2);
            num2 = '';
            return num1;
        case '/':
            num1 = Number(num1) / Number(num2);
            num2 = '';
            return num1;
        case '*':
            num1 = Number(num1) * Number(num2);
            num2 = '';
            return num1;
    }
}

// [] + [] + []... =
function multiCalc(sym) {
    switch (sym) {
        case '+':
            num1 = Number(num1) + Number(num2);
            num2 = '';
            break;
        case '-':
            num1 = Number(num1) - Number(num2);
            num2 = '';
            break;
        case '/':
            num1 = Number(num1) / Number(num2);
            num2 = '';
            break;
        case '*':
            num1 = Number(num1) * Number(num2);
            num2 = '';
    }
}

// For when equal sign is pressed multiple times --> [] + = = = OR [] + [] = = =
function equalCalc(sym) {
    switch (sym) {
        case '+':
            // If equal's temp num has not been defined yet, define it
            // Otherwise, keep performing calculations using the old value
            if (equalTemp === undefined) {
                equalTemp = num1;
            }
            num1 = Number(num1) + Number(equalTemp);
            num2 = '';
            return num1;
        case '-':
            if (equalTemp === undefined) {
                equalTemp = num1;
            }
            num1 = Number(num1) - Number(equalTemp);
            num2 = '';
            return num1;
        case '/':
            if (equalTemp === undefined) {
                equalTemp = num1;
            }
            num1 = Number(num1) / Number(equalTemp);
            num2 = '';
            return num1;
        case '*':
            if (equalTemp === undefined) {
                equalTemp = num1;
            }
            num1 = Number(num1) * Number(equalTemp);
            num2 = '';
            return num1;
        case '':
            return num1;
    }
}

// Resets all of the calculator's values to their default state
function clear() {
    num1 = '';
    num2 = '';
    operand = '';
    displayWindow.innerHTML = 0;
    equalTemp = undefined;
    eqPress = false;
}


// Cases I tested for:
// [] + [] =
// [] + [] + []... =
// [] + [] =, [] + [] = --> Should reset after first equal sign
// [] + [] =, + [] = --> Shouldn't reset, should add the new value to the first answer
// [] + = = =... --> Should keep adding the first number to the running sum
// [] + [] = = =... --> Should continue to add the second value to the sum
// 
// 
// Things that shouldn't be allowed:
// 00003 (leading zeros); 4.56.87 (multiple decimal points); pressing a symbol before first inputting a number;
// pressing multiple operands in a row --> I made it so that this changes your selected operand (ex. 1 - * + 2 = 3);
// Inputting an unlimited amount of numbers --> I capped input at 10 digits
// 
// Certain cases result in NaN: 0 / 0; . + .
// In these instances, I have the calculator display "-Undefined-" and then internally reset all of its values
// I believe that "undefined" is actually the correct answer for 0 / 0. 
// For . + . --> I've set the display to read "Invalid Use of Decimal"
// 
// A case that I did not solve for:
// .1 + .2 (wasn't really sure how to approach solving this)
// 
// 
// First build was really messy and hard to debug (main.js). For this current build, I first created only core
// functions, and then began adding "edge cases" incrementally. I used a 4-quadrant chart to approach edge cases:
// Urgent vs Less Urgent; High vs Low Importance
// This was a much better way to write code. For the final few edge cases, however, it was still pretty 
// difficult to add fixes while also trying to avoid breaking anything else (which I did several times).

// Added keyboard input. Made it so that * and X can both be used for multiplication. C and Delete can both 
// be used for clear. = and Enter can both be used for equals.