/* FUNCIONES */

function MatrizInputs(IDcontainer, n) {
    const container = document.getElementById(IDcontainer);
    if (!container) return console.warn(`No se encontro el contenedor de la matriz`);

    n = parseInt(n, 10);
    if (!n) return console.warn('no se encuentra el tamaño de la matriz');

    container.innerHTML = '';
    container.style.display = 'grid';
    container.style.gridTemplateColumns = `repeat(${n}, 50px)`;
    container.style.gap = '5px';

    // Crear inputs (n x n)
    for (let i = 0; i < n * n; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'celda_matriz';
        input.style.width = '50px';
        input.style.boxSizing = 'border-box';
        container.appendChild(input);
    }
}