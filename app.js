const comenzarBtn = document.getElementById('comenzar-btn');
const detenerBtn = document.getElementById('detener-btn');
const tiempoElemento = document.getElementById('tiempo');
const cronometroDiv = document.getElementById('cronometro');
const establecerLimiteBtn = document.getElementById('establecer-limite-btn');
const limiteInput = document.getElementById('limite');

let segundos = 0;
let minutos = 0;
let limiteUso = 60; 
let intervaloMonitoreo = null;

function actualizarCronometro() {
    segundos++;
    if (segundos === 60) {
        segundos = 0;
        minutos++;
    }
    
    const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;
    const segundosFormateados = segundos < 10 ? `0${segundos}` : segundos;
    
    tiempoElemento.textContent = `${minutosFormateados}:${segundosFormateados}`;
    
    verificarLimite(); 
}

function verificarLimite() {
    if (minutos >= limiteUso) {
        alert("Has excedido tu tiempo límite de uso.");
        detenerCronometro();
    }
}

function iniciarCronometro() {
    segundos = 0;
    minutos = 0;
    tiempoElemento.textContent = "00:00";
    cronometroDiv.style.display = "block"; 
    detenerBtn.style.display = "inline-block"; 
    intervaloMonitoreo = setInterval(actualizarCronometro, 1000); 
}

function detenerCronometro() {
    clearInterval(intervaloMonitoreo); 
    detenerBtn.style.display = "none"; 
}

function establecerLimiteDeUso(nuevoLimite) {
    limiteUso = nuevoLimite;
    console.log(`Límite de uso personalizado: ${limiteUso} minutos`);
}

comenzarBtn.addEventListener('click', function() {
    iniciarCronometro(); 
});

detenerBtn.addEventListener('click', function() {
    detenerCronometro(); 
});

establecerLimiteBtn.addEventListener('click', function() {
    const nuevoLimite = parseInt(limiteInput.value);
    if (!isNaN(nuevoLimite) && nuevoLimite > 0) {
        establecerLimiteDeUso(nuevoLimite);
        alert(`Nuevo límite establecido: ${nuevoLimite} minutos`);
    } else {
        alert("Por favor, ingresa un valor válido.");
    }
});