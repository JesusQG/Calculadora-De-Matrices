/* FUNCIONES */

function MatrizInputs(IDcontainer, n) {
    const container = document.getElementById(IDcontainer);
    if (!container) return console.warn(`No se encontro el contenedor de la matriz`);

    n = parseInt(n, 10);
    if (!n) return console.warn('n no detectado');

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

function LeerMatriz(IDcontainer, n) {
    const container = document.getElementById(IDcontainer);
    if (!container) {
        console.warn(`No se encontró el contenedor`);
        return null;
    }

    n = parseInt(n, 10);
    if (!n) {
        console.warn('n no detectado');
        return null;
    }

    const inputs = Array.from(container.querySelectorAll('input'));
    const matriz = [];

    for (let row = 0; row < n; row++) {
        const fila = [];
        for (let col = 0; col < n; col++) {
            const idx = row * n + col;
            const input = inputs[idx];
            const raw = input ? input.value.trim() : '';
            const num = raw === '' ? 0 : Number(raw);
            fila.push(Number.isNaN(num) ? NaN : num);
        }
        matriz.push(fila);
    }

    return matriz;
}

function sumMatrices(A, B) {
    const n = A.length;
    let result = [];
    for (let i = 0; i < n; i++) {
        let row = [];
        for (let j = 0; j < n; j++) {
            row.push(A[i][j] + B[i][j]);
        }
        result.push(row);
    }
    return result;
}

function RellenarMatrizAleatoria(IDcontainer, n) {
    const container = document.getElementById(IDcontainer);
    if (!container) {
        console.warn(`No se encontró el contenedor "${IDcontainer}"`);
        return null;
    }

    n = parseInt(n, 10);
    if (!n || n < 1) {
        console.warn('n debe ser un entero positivo');
        return null;
    }

    const inputs = Array.from(container.querySelectorAll('input'));
    const matriz = [];

    function aleatorioEntero(minVal, maxVal) {
        return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
    }

    for (let row = 0; row < n; row++) {
        const fila = [];
        for (let col = 0; col < n; col++) {
            const idx = row * n + col;
            const input = inputs[idx];

            const valor = aleatorioEntero(11, -11);
            if (input) {
                input.value = String(valor);
            }
            fila.push(valor);
        }
        matriz.push(fila);
    }

    return matriz; 
}

function clearMatrix(containerId) {
    const container = document.getElementById(containerId);
    const inputs = container.getElementsByTagName("input");
    for (let input of inputs) {
        input.value = 0;
    }
}

function GenerarMatrizPrueba3x3(IDcontainer) {
    const n = 3;

    // Asegurar que existen los inputs (usa MatrizInputs para crear la rejilla)
    MatrizInputs(IDcontainer, n);

    const container = document.getElementById(IDcontainer);
    if (!container) {
        console.warn(`No se encontró el contenedor "${IDcontainer}"`);
        return null;
    }

    const inputs = Array.from(container.querySelectorAll('input'));
    const matriz = [];

    function enteroAleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    for (let row = 0; row < n; row++) {
        const fila = [];
        for (let col = 0; col < n; col++) {
            const idx = row * n + col;
            const valor = enteroAleatorio(2, 5);
            const input = inputs[idx];
            if (input) input.value = String(valor);
            fila.push(valor);
        }
        matriz.push(fila);
    }

    return matriz;
}



/* ============================================================
   CÓDIGO PRINCIPAL: Interacción con los botones
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {

    const inputN = document.getElementById("n");
    const btnGenerar = document.getElementById("generate");
    const btnSumar = document.getElementById("sum");

    // Botones para Matriz A
    const btnGenSA = document.getElementById("genSA");
    const btnRandSA = document.getElementById("randSA");
    const btnClearSA = document.getElementById("clearSA");

    // Botones para Matriz B
    const btnGenSB = document.getElementById("genSB");
    const btnRandSB = document.getElementById("randSB");
    const btnClearSB = document.getElementById("clearSB");

    // Helper: leer n válido
    function leerN() {
        if (!inputN) return null;
        const n = parseInt(inputN.value, 10);
        return (Number.isInteger(n) && n >= 2 && n <= 10) ? n : null;
    }

    // Generar ambas matrices según el input n
    if (btnGenerar) {
        btnGenerar.addEventListener("click", () => {
            const n = leerN();
            if (!n) {
                alert("Introduce un tamaño válido entre 2 y 10");
                return;
            }
            MatrizInputs("matrizSA", n);
            MatrizInputs("matrizSB", n);
            const contR = document.getElementById("matrizSAB");
            if (contR) contR.innerHTML = ''; // limpiar resultado anterior
        });
    }

    // Sumar matrices
    if (btnSumar) {
        btnSumar.addEventListener("click", () => {
            const n = parseInt(inputN?.value, 10);
            if (!n) return alert("Primero genera las matrices");

            const A = LeerMatriz("matrizSA", n);
            const B = LeerMatriz("matrizSB", n);

            if (!A || !B) return alert("Matrices no válidas");

            const result = sumMatrices(A, B);

            // Mostrar resultado
            const contR = document.getElementById("matrizSAB");
            if (!contR) return;
            contR.innerHTML = '';
            contR.style.display = 'grid';
            contR.style.gridTemplateColumns = `repeat(${n}, 50px)`;
            contR.style.gap = '5px';

            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    const celda = document.createElement("div");
                    celda.className = "celda_resultado";
                    celda.textContent = result[i][j];
                    celda.style.width = '50px';
                    celda.style.height = '30px';
                    celda.style.textAlign = 'center';
                    celda.style.border = '1px solid #ccc';
                    celda.style.borderRadius = '5px';
                    contR.appendChild(celda);
                }
            }
        });
    }

    // Generar / Aleatorios / Limpiar para Matriz A
    if (btnGenSA) {
        btnGenSA.addEventListener("click", () => {
            // Generar ejemplo 3x3 en la Matriz A
            if (inputN) inputN.value = '3';
            GenerarMatrizPrueba3x3("matrizSA");
            const contR = document.getElementById("matrizSAB");
            if (contR) contR.innerHTML = '';
        });
    }
    if (btnRandSA) {
        btnRandSA.addEventListener("click", () => {
            const n = parseInt(inputN?.value, 10);
            if (!n) return alert("Primero genera la matriz A");
            RellenarMatrizAleatoria("matrizSA", n);
        });
    }
    if (btnClearSA) {
        btnClearSA.addEventListener("click", () => {
            clearMatrix("matrizSA");
            const contR = document.getElementById("matrizSAB");
            if (contR) contR.innerHTML = '';
        });
    }

    // Generar / Aleatorios / Limpiar para Matriz B
    if (btnGenSB) {
        btnGenSB.addEventListener("click", () => {
            // Generar ejemplo 3x3 en la Matriz B
            if (inputN) inputN.value = '3';
            GenerarMatrizPrueba3x3("matrizSB");
            const contR = document.getElementById("matrizSAB");
            if (contR) contR.innerHTML = '';
        });
    }
    if (btnRandSB) {
        btnRandSB.addEventListener("click", () => {
            const n = parseInt(inputN?.value, 10);
            if (!n) return alert("Primero genera la matriz B");
            RellenarMatrizAleatoria("matrizSB", n);
        });
    }
    if (btnClearSB) {
        btnClearSB.addEventListener("click", () => {
            clearMatrix("matrizSB");
            const contR = document.getElementById("matrizSAB");
            if (contR) contR.innerHTML = '';
        });
    }

});