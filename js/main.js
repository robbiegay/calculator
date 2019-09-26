// JS

let calcBtns = ['C', '', '', '/', 7, 8, 9, 'X', 4, 5, 6, '-', 1, 2, 3, '+', 0, '', '.', '='];
let calcAns = 0;
let num1 = null;
let num2 = null;
let operand = '';

function loadCalc() {
    function renderElement(element, classes) {
        let output = document.createElement(element);
        output.className = classes;
        return output;
    }

    // Create Elements
    let container = renderElement('div', 'container-fluid');
    let row = renderElement('div', 'row');

    let leftCol = renderElement('div', 'col-0 col-sm-1 col-md-2 col-lg-3 bg-warning');
    let centerCol = renderElement('div', 'col-12 col-sm-10 col-md-8 col-lg-6 text-center bg-success');
    let rightCol = renderElement('div', 'col-0 col-sm-1 col-md-2 col-lg-3 bg-warning');

    let title = renderElement('h1', 'my-5 display-4');
    title.innerHTML = 'Calculator';

    let display = renderElement('div', 'col bg-white display-4 text-right');
    display.innerHTML = `${calcAns}`;

    // Append Elements
    centerCol.appendChild(title);
    centerCol.appendChild(display);
    createBoard(20);

    row.appendChild(rightCol);
    row.appendChild(centerCol);
    row.appendChild(leftCol);

    container.appendChild(row);

    let app = document.getElementById('app');
    app.appendChild(container);

    function createBoard(gridSize) {
        for (let i = 0; i < gridSize; i++) {
            let div = document.createElement('div');
            div.className = 'col-3 border bg-white display-4';
            div.id = `btn-${calcBtns[i]}`;
            div.setAttribute('style', 'height: 80px;');
            let text = document.createTextNode(`${calcBtns[i]}`);
            div.appendChild(text);
            if (calcBtns[i] !== '') {
                div.addEventListener('click', clickedOn);
            }
            centerCol.appendChild(div);
            function clickedOn() {
                if (typeof calcBtns[i] === 'number') {
                    if (num1 === null) {
                        num1 = calcBtns[i];
                    } else {
                        num2 = calcBtns[i];
                    }
                } else if (calcBtns[i] === '=') {
                    alert('You clicked =');
                } else if (calcBtns[i] === '.') {
                    alert('You clicked .');
                } else if (calcBtns[i] === 'C') {
                    num1 = null;
                    num2 = null;
                    operand = null;
                    calcAns = 0;
                } else {
                    operand = calcBtns[i];
                }
                console.log(num1, operand, num2);
                num1 = calcBtns[i];
                display.innerHTML = `${calcAns}`;
            }
        }
    }

}