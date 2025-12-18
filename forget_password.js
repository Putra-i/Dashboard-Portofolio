// Background Animation (Copied from login.js)
const bgContainer = document.getElementById('bgContainer');
const numRows = 3;
const itemsPerRow = 12;

for (let row = 0; row < numRows; row++) {
    const gridRow = document.createElement('div');
    gridRow.className = `grid-row ${row % 2 === 0 ? 'row-odd' : 'row-even'}`;

    const gridRowContent = document.createElement('div');
    gridRowContent.className = 'grid-row-content';

    for (let i = 0; i < itemsPerRow; i++) {
        const item = document.createElement('div');
        item.className = 'grid-item';
        gridRowContent.appendChild(item);
    }

    gridRow.appendChild(gridRowContent);
    bgContainer.appendChild(gridRow);
}
