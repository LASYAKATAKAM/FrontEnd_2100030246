let data = [];
let filteredData = [];

document.addEventListener('DOMContentLoaded', () => {
    const fileUpload = document.getElementById('fileUpload');
    fileUpload.addEventListener('change', handleFileUpload);
    
    const filterInput = document.getElementById('filter');
    filterInput.addEventListener('input', filterTable);

    const sortColumnSelect = document.getElementById('sortColumn');
    const sortOrderSelect = document.getElementById('sortOrder');
    sortColumnSelect.addEventListener('change', sortTable);
    sortOrderSelect.addEventListener('change', sortTable);
});

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
        const reader = new FileReader();
        reader.onload = function(e) {
            const text = e.target.result;
            data = parseCSV(text);
            filteredData = [...data];
            renderTableHeaders();
            renderTable();
            populateDropdowns();
        };
        reader.readAsText(file);
    } else {
        alert('Please upload a valid CSV file.');
    }
}

function parseCSV(text) {
    const rows = text.trim().split('\n');
    const headers = rows[0].split(',').map(header => header.trim());
    return rows.slice(1).map(row => {
        const values = row.split(',').map(value => value.trim());
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = values[index];
        });
        return obj;
    });
}

function renderTableHeaders() {
    const headerRow = document.getElementById('tableHeaders');
    headerRow.innerHTML = '';
    const headers = Object.keys(data[0]);
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        th.setAttribute('data-column', header);
        th.addEventListener('click', () => {
            document.getElementById('sortColumn').value = header;
            sortTable();
        });
        headerRow.appendChild(th);
    });
}

function renderTable() {
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = '';
    filteredData.forEach(row => {
        const tr = document.createElement('tr');
        Object.values(row).forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
}

function sortTable() {
    const sortColumn = document.getElementById('sortColumn').value;
    const sortOrder = document.getElementById('sortOrder').value;

    filteredData.sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    renderTable();
}

function filterTable() {
    const filterValue = document.getElementById('filter').value.toLowerCase();
    const filterColumn = document.getElementById('filterColumn').value;
    filteredData = data.filter(row => {
        return String(row[filterColumn]).toLowerCase().includes(filterValue);
    });
    renderTable();
}

function populateDropdowns() {
    const filterColumnSelect = document.getElementById('filterColumn');
    const sortColumnSelect = document.getElementById('sortColumn');
    filterColumnSelect.innerHTML = '';
    sortColumnSelect.innerHTML = '';
    const headers = Object.keys(data[0]);
    headers.forEach(header => {
        const filterOption = document.createElement('option');
        filterOption.value = header;
        filterOption.textContent = header;
        filterColumnSelect.appendChild(filterOption);

        const sortOption = document.createElement('option');
        sortOption.value = header;
        sortOption.textContent = header;
        sortColumnSelect.appendChild(sortOption);
    });
}
