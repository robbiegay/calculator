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

    let leftCol = renderElement('div', 'col-0 col-sm-1 col-md-2 col-lg-3');
    let centerCol = renderElement('div', 'col-12 col-sm-10 col-md-8 col-lg-6 text-center');
    let rightCol = renderElement('div', 'col-0 col-sm-1 col-md-2 col-lg-3');

    let title = renderElement('h1', 'my-5 display-4 text-white');
    title.innerHTML = 'Calculator';

    let display = renderElement('div', 'col bg-light display-4 text-right');
    display.setAttribute('style', 'height: 80px;');
    display.innerHTML = `${calcAns}`;

    let bottom = renderElement('div', 'p-5');

    // Append Elements
    centerCol.appendChild(title);
    centerCol.appendChild(display);
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
                // Clear Button
                if (calcBtns[i] === 'C') {
                    num1 = '';
                    num2 = '';
                    operand = '';
                    calcAns = 0;
                    operation = 0;
                }
                // The first number
                if (operation === 0) {
                    // Can make the first number negative, if nothing else is inputted yet
                    if (calcBtns[i] === '-' && num1 === '') {
                        num1 += '-';
                        console.log(num1);
                    }
                    // If the number doesn't have a decimal yet, add one
                    else if (calcBtns[i] === '.' && !num1.includes('.')) {
                        num1 += '.';
                        console.log(num1);
                    }
                    // If it's a number, concatenate it
                    else if (typeof calcBtns[i] === 'number') {
                        num1 += String(calcBtns[i]);
                        console.log(num1);
                    }
                    else if (calcBtns[i] === '+' || calcBtns[i] === '-' || calcBtns[i] === '/' || calcBtns[i] === 'X') {
                        operation = 1;
                        operand = calcBtns[i];
                    }
                }
                if (operation === 1) {
                    if (calcBtns[i] === '+' || calcBtns[i] === '-' || calcBtns[i] === '/' || calcBtns[i] === 'X') {
                        operand = calcBtns[i];
                    } else {
                        operation = 2;
                    }
                }
                if (operation === 2) {
                    if (calcBtns[i] === '.' && !num1.includes('.')) {
                        num1 += '.';
                        console.log(num1);
                    }
                    // If it's a number, concatenate it
                    else if (typeof calcBtns[i] === 'number') {
                        num1 += String(calcBtns[i]);
                        console.log(String(calcBtns[i]));
                    } else if (calcBtns[i] === '+') {
                        operation = 0;
                        calcAns = Number(num1) + Number(num2);
                    } else if (calcBtns[i] === '-') {
                        operation = 0;
                        calcAns = Number(num1) - Number(num2);
                    } else if (calcBtns[i] === '/') {
                        operation = 0;
                        calcAns = Number(num1) / Number(num2);
                    } else if (calcBtns[i] === 'X') {
                        operation = 0;
                        calcAns = Number(num1) * Number(num2);
                    }
                }
                display.innerHTML = `${Number(num1)}`;
                console.log(num1);
                console.log(calcAns);
            }
        }
    }
}


// else if (calcBtns[i] === '=') {
//     // Equals
//     // If nothing after operand, should apply to self
//     display.innerHTML = `${calcAns}`;
// } else if (calcBtns[i] === 'C') {
//     // Clear
//     num1 = null;
//     num2 = null;
//     operand = null;
//     calcAns = 0;






// function clickedOn() {
//     if (typeof calcBtns[i] === 'number') {
//         // Numbers
//         if (num1 === null) {
//             // Can make the first number negative
//             if (calcBtns[i] === '-') {
//                 num1 += '-';
//             } 
//             // If the number doesn't have a decimal yet, add one
//             else if (calcBtns[i] === '.' && !num1.includes('.')) {
//                 num1 += '.';
//             } else if (calcBtns[i] === '1') {
//                 num1 += calcBtns[i];
//             }
//         } else {
//             num2 = calcBtns[i];
//         }
//     } else if (calcBtns[i] === '=') {
//         // Equals
//         // If nothing after operand, should apply to self
//         display.innerHTML = `${calcAns}`;
//     }  else if (calcBtns[i] === 'C') { 
//         // Clear
//         num1 = null;
//         num2 = null;
//         operand = null;
//         calcAns = 0;
//     } else { 
//         // Operands
//         operand = calcBtns[i];
//     }
//     // Updates displays
//     // console.log(num1, operand, num2);
//     // Displays the button pressed
//     display.innerHTML = `${Number(num1)}`;
// }

