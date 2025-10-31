/* FUNCIONES */

function MatrizInputs(IDcontainer, n) {
    const container = document.getElementById(IDcontainer);
    if (!container) return console.warn(`No se encontro el contenedor de la matriz`);

    n = parseInt(n, 10);
    if (!n) return console.warn('n no detectado');

    container.innerHTML = '';
    // controlar columnas mediante la variable CSS --cols (definida en style.css)
    container.style.setProperty('--cols', String(n));
    // asegurar que la clase de rejilla está presente para aplicar estilos
    container.classList.add('matriz_grid');

    // Crear inputs (n x n)
    for (let i = 0; i < n * n; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'celda_matriz';
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
            if (Number.isNaN(num)) {
                // aviso y abortar lectura si hay valor no numérico
                alert(`Valor no numérico en ${IDcontainer} (fila ${row + 1}, col ${col + 1}). Corrige antes de sumar.`);
                return null;
            }
            fila.push(num);
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
        // aceptar min/max en cualquier orden
        const min = Math.min(minVal, maxVal);
        const max = Math.max(minVal, maxVal);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    for (let row = 0; row < n; row++) {
        const fila = [];
        for (let col = 0; col < n; col++) {
            const idx = row * n + col;
            const input = inputs[idx];

            const valor = aleatorioEntero(-10, 10);
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
    if (!container) return;
    const inputs = container.getElementsByTagName("input");
    for (let input of inputs) {
        input.value = 0;
    }
}

function GenerarMatrizPrueba3x3(IDcontainer) {
    const n = 3;
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

function restMatrices(A, B) {
    const n = A.length;
    let result = [];
    for (let i = 0; i < n; i++) {
        let row = [];
        for (let j = 0; j < n; j++) {
            row.push(A[i][j] - B[i][j]);
        }
        result.push(row);
    }
    return result;
}
function multMatrices(A, B) {
    const filasA = A.length;
    const colsA = A[0].length;
    const filasB = B.length;
    const colsB = B[0].length;

    if (colsA !== filasB) {
        alert(`Incompatibilidad: columnas de A (${colsA}) ≠ filas de B (${filasB}).`);
        return null;
    }

    const result = [];
    for (let i = 0; i < filasA; i++) {
        const fila = [];
        for (let j = 0; j < colsB; j++) {
            let suma = 0;
            for (let k = 0; k < colsA; k++) {
                suma += A[i][k] * B[k][j];
            }
            fila.push(suma);
        }
        result.push(fila);
    }
    return result;
}


   
document.addEventListener("DOMContentLoaded", () => {
    const inputNA = document.getElementById("nA");
    const inputNB = document.getElementById("nB");
    const btnGenerateA = document.getElementById("generateA");
    const btnGenerateB = document.getElementById("generateB");
    const btnSumar = document.getElementById("sum");
    const btnRestAB = document.getElementById("restAB");
    const btnRestBA = document.getElementById("restBA");
    function leerNA() {
        if (!inputNA) return null;
        const n = parseInt(inputNA.value, 10);
        return (Number.isInteger(n) && n >= 2 && n <= 10) ? n : null;
    }
    function leerNB() {
        if (!inputNB) return null;
        const n = parseInt(inputNB.value, 10);
        return (Number.isInteger(n) && n >= 2 && n <= 10) ? n : null;
    }

    // Botones para Matriz A
    const btnGenSA = document.getElementById("genSA");
    const btnRandSA = document.getElementById("randSA");
    const btnClearSA = document.getElementById("clearSA");

    // Botones para Matriz B
    const btnGenSB = document.getElementById("genSB");
    const btnRandSB = document.getElementById("randSB");
    const btnClearSB = document.getElementById("clearSB");

    // Generar cada matriz según su propio input
    if (btnGenerateA) {
        btnGenerateA.addEventListener("click", () => {
            const n = leerNA();
            if (!n) return alert("Introduce un tamaño válido entre 2 y 10 para la Matriz A");
            MatrizInputs("matrizSA", n);
            const contR = document.getElementById("matrizR");
            if (contR) contR.innerHTML = '';
        });
    }
    if (btnGenerateB) {
        btnGenerateB.addEventListener("click", () => {
            const n = leerNB();
            if (!n) return alert("Introduce un tamaño válido entre 2 y 10 para la Matriz B");
            MatrizInputs("matrizSB", n);
            const contR = document.getElementById("matrizR");
            if (contR) contR.innerHTML = '';
        });
    }

     // Sumar matrices
     if (btnSumar) {
         btnSumar.addEventListener("click", () => {
            const nA = leerNA();
            const nB = leerNB();
            if (!nA || !nB) return alert("Primero genera ambas matrices");
            if (nA !== nB) {
                return alert("Error: Las matrices deben tener el mismo tamaño para sumar (nA debe ser igual a nB).");
            }
            
            // confirmar al usuario que desea continuar con la suma
            const confirmar = confirm(`Ambas matrices son ${nA} x ${nA}. ¿Deseas sumar A + B?`);
            if (!confirmar) return;

            const A = LeerMatriz("matrizSA", nA);
            const B = LeerMatriz("matrizSB", nA);

            if (!A || !B) return alert("Matrices no válidas");

            const result = sumMatrices(A, B);

            // Mostrar resultado
            const contR = document.getElementById("matrizR");
            if (!contR) return;
            contR.innerHTML = '';
            // usar la variable CSS para definir columnas
            contR.style.setProperty('--cols', String(nA));
            contR.classList.add('matriz_grid');

            for (let i = 0; i < nA; i++) {
                for (let j = 0; j < nA; j++) {
                    const celda = document.createElement("div");
                    celda.className = "celda_resultado";
                    celda.textContent = result[i][j];
                    contR.appendChild(celda);
                }
            }
         });
     }

     
     // Resta A - B
    if (btnRestAB) {
		btnRestAB.addEventListener("click", () => {
			const nA = leerNA();
			const nB = leerNB();
			if (!nA || !nB) return alert("Primero genera ambas matrices");
			if (nA !== nB) return alert("Error: Las matrices deben tener el mismo tamaño para restar.");

			const confirmar = confirm(`Ambas matrices son ${nA} x ${nA}. ¿Deseas restar A - B?`);
			if (!confirmar) return;

			const A = LeerMatriz("matrizSA", nA);
			const B = LeerMatriz("matrizSB", nA);
			if (!A || !B) return alert("Matrices no válidas");

			const result = restMatrices(A, B);

			// Mostrar resultado
			const contR = document.getElementById("matrizR");
			if (!contR) return;
			contR.innerHTML = '';
			contR.style.setProperty('--cols', String(nA));
			contR.classList.add('matriz_grid');

			// Cambiar título
			const title = document.querySelector(".result_matriz h2");
			if (title) title.textContent = "Resultado (A - B)";

			for (let i = 0; i < nA; i++) {
				for (let j = 0; j < nA; j++) {
					const celda = document.createElement("div");
					celda.className = "celda_resultado";
					celda.textContent = result[i][j];
					contR.appendChild(celda);
				}
			}
		});
	}

	// Resta B - A
	if (btnRestBA) {
		btnRestBA.addEventListener("click", () => {
			const nA = leerNA();
			const nB = leerNB();
			if (!nA || !nB) return alert("Primero genera ambas matrices");
			if (nA !== nB) return alert("Error: Las matrices deben tener el mismo tamaño para restar.");

			const confirmar = confirm(`Ambas matrices son ${nA} x ${nA}. ¿Deseas restar B - A?`);
			if (!confirmar) return;

			const A = LeerMatriz("matrizSA", nA);
			const B = LeerMatriz("matrizSB", nA);
			if (!A || !B) return alert("Matrices no válidas");

			const result = restMatrices(B, A); // invertir orden

			// Mostrar resultado
			const contR = document.getElementById("matrizR");
			if (!contR) return;
			contR.innerHTML = '';
			contR.style.setProperty('--cols', String(nA));
			contR.classList.add('matriz_grid');

			// Cambiar título
			const title = document.querySelector(".result_matriz h2");
			if (title) title.textContent = "Resultado (B - A)";

			for (let i = 0; i < nA; i++) {
				for (let j = 0; j < nA; j++) {
					const celda = document.createElement("div");
					celda.className = "celda_resultado";
					celda.textContent = result[i][j];
					contR.appendChild(celda);
				}
			}
		});
	}
    // Multiplicación A × B
    const btnMultAB = document.getElementById("multAB");
    if (btnMultAB) {
    btnMultAB.addEventListener("click", () => {
        const nA = leerNA();
        const nB = leerNB();
        if (!nA || !nB) return alert("Primero genera ambas matrices A y B.");

        const A = LeerMatriz("matrizSA", nA);
        const B = LeerMatriz("matrizSB", nB);
        if (!A || !B) return alert("Matrices no válidas.");

        // Validar compatibilidad
        if (A[0].length !== B.length) {
            return alert(`Incompatibilidad: columnas de A (${A[0].length}) ≠ filas de B (${B.length}).`);
        }

        const confirmar = confirm(`¿Deseas multiplicar A (${nA}×${nA}) × B (${nB}×${nB})?`);
        if (!confirmar) return;

        const result = multMatrices(A, B);
        if (!result) return;

        // Mostrar resultado
        const contR = document.getElementById("matrizR");
        if (!contR) return;
        contR.innerHTML = '';
        contR.style.setProperty('--cols', String(result[0].length));
        contR.classList.add('matriz_grid');

        // Cambiar título
        const title = document.querySelector(".result_matriz h2");
        if (title) title.textContent = "Resultado (A × B)";

        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < result[0].length; j++) {
                const celda = document.createElement("div");
                celda.className = "celda_resultado";
                celda.textContent = result[i][j];
                contR.appendChild(celda);
            }
        }
    });
}

	/* FUNCIONALIDADES DE CADA MATRIZ*/
	if (btnGenSA) {
		btnGenSA.addEventListener("click", () => {
			if (inputNA) inputNA.value = '3';
			GenerarMatrizPrueba3x3("matrizSA");
			const contR = document.getElementById("matrizR");
			if (contR) contR.innerHTML = '';
		});
	}
	if (btnRandSA) {
		btnRandSA.addEventListener("click", () => {
			const n = parseInt(inputNA?.value, 10);
			if (!n) return alert("Primero genera la matriz A");
			RellenarMatrizAleatoria("matrizSA", n);
		});
	}
	if (btnClearSA) {
		btnClearSA.addEventListener("click", () => {
			clearMatrix("matrizSA");
			const contR = document.getElementById("matrizR");
			if (contR) contR.innerHTML = '';
		});
	}

	// Generar / Aleatorios / Limpiar para Matriz B
	if (btnGenSB) {
		btnGenSB.addEventListener("click", () => {
			if (inputNB) inputNB.value = '3';
			GenerarMatrizPrueba3x3("matrizSB");
			const contR = document.getElementById("matrizR");
			if (contR) contR.innerHTML = '';
		});
	}
	if (btnRandSB) {
		btnRandSB.addEventListener("click", () => {
			const n = parseInt(inputNB?.value, 10);
			if (!n) return alert("Primero genera la matriz B");
			RellenarMatrizAleatoria("matrizSB", n);
		});
	}
	if (btnClearSB) {
		btnClearSB.addEventListener("click", () => {
			clearMatrix("matrizSB");
			const contR = document.getElementById("matrizR");
			if (contR) contR.innerHTML = '';
		});
	}

}); 