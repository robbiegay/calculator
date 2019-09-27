// JS

// Array with all the button values
// let calcBtns = ['C', '', '', '/', '7', '8', '9', 'X', '4', '5', '6', '-', '1', '2', '3', '+', '0', '', '.', '='];
let calcBtns = ['C', '', '', '/', 7, 8, 9, 'X', 4, 5, 6, '-', 1, 2, 3, '+', 0, '', '.', '='];
// Default Values
let calcAns = 0;
let num1 = '';
let num2 = '';
let operand = '';
let operation = 0;

// Renders the page elements on load
function loadCalc() {
    // Function to render elements
    function renderElement(element, classes) {
        let output = document.createElement(element);
        output.className = classes;
        return output;
    }

    // Create Elements
    let container = renderElement('div', 'container-fluid');
    let row = renderElement('div', 'row');

    let leftCol = renderElement('div', 'col-0 col-sm-0 col-md-1 col-lg-2');
    let centerCol = renderElement('div', 'col-12 col-sm-12 col-md-10 col-lg-8 text-center');
    let rightCol = renderElement('div', 'col-0 col-sm-0 col-md-1 col-lg-2');

    let title = renderElement('h1', 'my-5 display-4 text-white');
    // Added a colorful title :)
    title.innerHTML = '<span class="text-danger">C</span><span class="text-primary">a</span><span class="text-warning">l</span><span class="text-dark">c</span><span class="text-danger">u</span><span class="text-primary">l</span><span class="text-warning">a</span><span class="text-dark">t</span><span class="text-danger">o</span><span class="text-primary">r</span>';
    // title.innerHTML = 'Calculator';

    let displayRow = renderElement('div', 'row');

    let display = renderElement('div', 'col bg-light text-right ml-0');
    display.id = 'displayWindow';
    display.setAttribute('style', 'height: 80px;');
    display.innerHTML = `${calcAns}`;

    let bottom = renderElement('div', 'p-5');

    // Append Elements
    centerCol.appendChild(title);
    centerCol.appendChild(displayRow);
    displayRow.appendChild(display)
    createCalc(20);
    centerCol.appendChild(bottom);

    row.appendChild(rightCol);
    row.appendChild(centerCol);
    row.appendChild(leftCol);

    container.appendChild(row);

    let app = document.getElementById('app');
    app.appendChild(container);

    // Creates the calculator
    function createCalc(gridSize) {
        let row = document.createElement('div');
        row.className = 'row';
        for (let i = 0; i < gridSize; i++) {
            let btn = document.createElement('button');
            btn.className = 'col-3 border bg-light display-4 button';
            btn.setAttribute('type', 'button');
            btn.id = `btn-${calcBtns[i]}`;
            btn.setAttribute('style', 'height: 80px;');
            let text = document.createTextNode(`${calcBtns[i]}`);
            btn.appendChild(text);
            if (calcBtns[i] !== '') {
                btn.addEventListener('click', clickedOn);
            } else {
                // Disables the blank buttons
                btn.disabled = true;
            }
            row.appendChild(btn);
            centerCol.appendChild(row);

            // Click function
            function clickedOn() {

                // The first number
                if (operation === 0) {
                    // Can make the first number negative, if nothing else is inputted yet
                    if (calcBtns[i] === '-' && num1 === '') {
                        num1 += '-';
                    }
                    // If the number doesn't have a decimal yet, add one
                    else if (calcBtns[i] === '.' && !num1.includes('.')) {
                        num1 += '.';
                    }
                    // If it's a number, concatenate it
                    else if (typeof calcBtns[i] === 'number') {
                        // Stops input number from being longer than 15 digits
                        if (num1.length < 15) {
                            num1 += String(calcBtns[i]);
                        }
                        if (calcBtns[i] === 0) {
                            if (num1 === '') {
                                num1 = '0';
                            }
                        }
                    }
                    else if (calcBtns[i] === '+' || calcBtns[i] === '-' || calcBtns[i] === '/' || calcBtns[i] === 'X') {
                        operation = 1;
                        operand = calcBtns[i];

                        // For calculating on a second round of inputs
                    } else if (calcBtns[i] === '=') {
                        if (operand === '+') {
                            operation = 0;
                            calcAns = Number(num1) + Number(num2);
                            num1 = calcAns;
                            // num2 = '';
                        } else if (operand === '-') {
                            operation = 0;
                            calcAns = Number(num1) - Number(num2);
                            num1 = calcAns;
                            // num2 = '';
                        } else if (operand === '/') {
                            operation = 0;
                            calcAns = Number(num1) / Number(num2);
                            num1 = calcAns;
                            // num2 = '';
                        } else if (operand === 'X') {
                            operation = 0;
                            calcAns = Number(num1) * Number(num2);
                            num1 = calcAns;
                            // num2 = '';
                        }
                    }
                    display.innerHTML = `${num1}`;
                }

                // The operand
                if (operation === 1) {
                    if (calcBtns[i] === '+' || calcBtns[i] === '-' || calcBtns[i] === '/' || calcBtns[i] === 'X') {
                        operand = calcBtns[i];
                    } else if (calcBtns[i] === '=') {
                        if (operand === '+') {
                            operation = 0;
                            calcAns = Number(num1) + Number(num1);
                            num2 = num1;
                            num1 = calcAns;
                        } else if (operand === '-') {
                            operation = 0;
                            calcAns = Number(num1) - Number(num2);
                            // num2 = num1;
                            num1 = calcAns;
                        } else if (operand === '/') {
                            operation = 0;
                            calcAns = Number(num1) / Number(num2);
                            // num2 = num1;
                            num1 = calcAns;
                        } else if (operand === 'X') {
                            operation = 0;
                            calcAns = Number(num1) * Number(num1);
                            // num2 = num1;
                            num1 = calcAns;
                        }
                    } else {
                        operation = 2;
                    }
                    display.innerHTML = `${operand}`;
                }

                // The second number
                if (operation === 2) {
                    // Adds the decimal
                    if (calcBtns[i] === '.' && !num2.includes('.')) {
                        num2 += '.';
                    }
                    // If it's a number, concatenate it
                    else if (typeof calcBtns[i] === 'number') {
                        // Stops input number from being longer than 15 digits
                        if (num2.length < 15) {
                            num2 += String(calcBtns[i]);
                        }
                        if (calcBtns[i] === 0) {
                            if (num1 === '') {
                                num1 = '0';
                            }
                        }
                        display.innerHTML = num2;

                        // If equal = calculate the result
                    } 

                    
                    if (calcBtns[i] === '=') {
                        if (operand === '+') {
                            operation = 1;
                            calcAns = Number(num1) + Number(num2);
                            num1 = calcAns;
                            num2 = '';
                        } else if (operand === '-') {
                            operation = 1;
                            calcAns = Number(num1) - Number(num2);
                            num1 = calcAns;
                            // num2 = '';
                        } else if (operand === '/') {
                            operation = 1;
                            calcAns = Number(num1) / Number(num2);
                            num1 = calcAns;
                            // num2 = '';
                        } else if (operand === 'X') {
                            operation = 1;
                            calcAns = Number(num1) * Number(num2);
                            num1 = calcAns;
                            // num2 = '';
                        }
                        display.innerHTML = `${num2}`;
                    } 
                    if (calcBtns[i] === '+') {
                        operation = 2;
                        calcAns = Number(num1) + Number(num2);
                        num1 = calcAns;
                        num2 = '';
                        display.innerHTML = '+';
                    } if (calcBtns[i] === '-') {
                        operation = 2;
                        calcAns = Number(num1) - Number(num2);
                        num1 = calcAns;
                        num2 = '';
                        display.innerHTML = '-';
                    } if (calcBtns[i] === '/') {
                        operation = 2;
                        calcAns = Number(num1) / Number(num2);
                        num1 = calcAns;
                        num2 = '';
                        display.innerHTML = '/';
                    } if (calcBtns[i] === 'X') {
                        operation = 2;
                        calcAns = Number(num1) * Number(num2);
                        num1 = calcAns;
                        num2 = '';
                        display.innerHTML = '*';
                    }


                }
                // Equals
                if (calcBtns[i] === '=') {
                    display.innerHTML = `${calcAns}`;
                    // If results = NaN, reset to 0
                    if (calcAns === 'NaN') {
                        calcAns = 0;
                    }
                }

                // Clear Button
                if (calcBtns[i] === 'C') {
                    clear();
                }

                function clear() {
                    num1 = '';
                    num2 = '';
                    operand = '';
                    calcAns = 0;
                    operation = 0;
                    display.innerHTML = `${calcAns}`;
                }

                // if (calcAns.length > 10) {
                //     display.setAttribute('style', 'font-size: 24px;');
                // } else {
                //     display.setAttribute('style', 'font-size: 50px;');
                // }
                // Console Logs
                console.log(`num1: ${num1}`);
                console.log(`opr: ${operand}`);
                console.log(`num2: ${num2}`);
                console.log(`answer: ${calcAns}`);
                console.log(`state: ${operation}`);
                console.log('-------------------');
            }
        }
    }
}