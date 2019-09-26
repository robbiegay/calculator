// JS

function loadCalc() {
    function renderElement(element, classes) {
        let output = document.createElement(element);
        output.className = classes;
        return output;
    }

    // Create Elements
    let container = renderElement('div', 'container-fluid');
    let row = renderElement('row');

    // let leftCol = renderElement('div', 'col-0 col-sm-1 col-md-2 col-lg-3 bg-warning');
    // let centerCol = renderElement('div', 'col-12 col-sm-10 col-md-8 col-lg-6 text-center bg-success');
    // let rightCol = renderElement('div', 'col-0 col-sm-1 col-md-2 col-lg-3 bg-warning');

    let leftCol = renderElement('div', 'col bg-warning');
    let centerCol = renderElement('div', 'col text-center bg-success');
    let rightCol = renderElement('div', 'col bg-warning');

    let title = renderElement('h1', 'my-5 display-4');
    title.innerHTML = 'Calculator';

    let calc = renderElement('table', 'bg-light');
    calc.innerHTML = '<tr class="table"><th>0</th></tr><tr><td>test</td></tr>';

    let testP = renderElement('p', 'bg-warning');
    testP.innerHTML = 'this is only a test.';

    // Append Elements
    centerCol.appendChild(title);
    centerCol.appendChild(calc);
    centerCol.appendChild(testP);

    row.appendChild(rightCol);
    row.appendChild(centerCol);
    row.appendChild(leftCol);

    container.appendChild(row);

    let app = document.getElementById('app');
    app.appendChild(container);

    createBoard(20);

}


function createBoard(gridSize) {
    for (let i = 0; i < gridSize; i++) {
        let div = document.createElement('div');
        div.className += 'col-3 border bg-white display-2';
        div.id = `tile-${i}`;
        div.setAttribute('style', 'height: 40px;');
        let text = document.createTextNode('_');
        div.appendChild(text);
        div.addEventListener('click', clickedOn);
        document.body.appendChild(div);
    }
}


function clickedOn () {
    alert('yes');
}