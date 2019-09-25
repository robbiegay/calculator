// JS

function loadCalc() {
    function renderElement(element, classes) {
        let temp = document.createElement(element);
        temp.className = classes;
        return temp;
    }

    let container = renderElement('div', 'container-fluid');

    // let container = document.createElement('div');
    // container.className = 'container-fluid';

    let row = document.createElement('row');

    let leftCol = document.createElement('div');
    leftCol.className = 'col-0 col-sm-1 col-md-2 col-lg-3';

    let centerCol = document.createElement('div');
    centerCol.className = 'col-12 col-sm-10 col-md-8 col-lg-6 text-center';

    let title = document.createElement('h1');
    title.className = 'my-5 display-4';
    title.innerHTML = 'Calculator';

    let rightCol = document.createElement('div');
    rightCol.className = 'col-0 col-sm-1 col-md-2 col-lg-3';

    centerCol.appendChild(title);

    row.appendChild(rightCol);
    row.appendChild(centerCol);
    row.appendChild(leftCol);

    container.appendChild(row);

    let app = document.getElementById('app');
    app.appendChild(container);

}

