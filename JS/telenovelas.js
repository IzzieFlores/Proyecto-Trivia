const preguntas = [
    {
        pregunta: "¿La novela La Tia Julia y el Escribidor esta inspirada en la vida de:?",
        respuesta: ["Gabriel Garcia Marquez", "Pablo Neruda", "Jorge Luis Borges", "Mario Vargas Llosa"],
        correcta: 1
    },

    {
        pregunta: "¿Nombre del personaje principal de la novela Los Reyes?",
        respuesta: ["Andres Reyes", "Edilberto Reyes", "Mariano Reyes", "Juan Reyes"],
        correcta: 2
    },

    {
        pregunta: "¿Novela colombiana ganadora del Record Guinness en 2010?",
        respuesta: ["Las Juanas", "Yo soy  Betty, La Fea", "Doña Bárbara", "El Clon"],
        correcta: 0
    },

    {
        pregunta: "¿En qué año se transmitió la primera novela mexicana?",
        respuesta: ["1909", "1968", "1900", "1958"],
        correcta: 3
    }
];

var indice_aleatorio = 0;
var pregunta_txt = "";
var interval;

window.onload = iniciar();

function iniciar() {
    loadQuestions();
    if (localStorage.getItem("SCORE") != null) {
        localStorage.removeItem("SCORE");
    }
}

function iniciarCronometro() {
    const contador = 15, cronometroDisplay = document.getElementById("cronometro")

    iniciarTiempo(contador, cronometroDisplay)
}

function iniciarTiempo(duracion, componente) {
    interval = setInterval(() => {
        if (duracion === 0) {

            componente.innerHTML = "Se acabo el tiempo";

            clearInterval(interval);

            loadQuestions()
        } else {
            duracion = duracion < 10 ? "0" + duracion : duracion;

            componente.textContent = "00:" + duracion;

            duracion--;
        }
    }, 1000)
}

function loadQuestions() {
    iniciarCronometro()
    if (preguntas.length > 0) {
        indice_aleatorio = Math.floor(Math.random() * preguntas.length);

        pregunta_txt = "";

        pregunta_txt += '<p class="pregunta">' + preguntas[indice_aleatorio].pregunta + '</p>';

        pregunta_txt += '<button id="opcion0" class="botonTrivias" onclick="verificarRespuestaCorrecta(0, ' + preguntas
        [indice_aleatorio].correcta + ')">' + preguntas[indice_aleatorio].respuesta[0] + '</button>';

        pregunta_txt += '<button id="opcion1" class="botonTrivias" onclick="verificarRespuestaCorrecta(1, ' + preguntas
        [indice_aleatorio].correcta + ')">' + preguntas[indice_aleatorio].respuesta[1] + '</button>';

        pregunta_txt += '<button id="opcion2" class="botonTrivias" onclick="verificarRespuestaCorrecta(2, ' + preguntas
        [indice_aleatorio].correcta + ')">' + preguntas[indice_aleatorio].respuesta[2] + '</button>';

        pregunta_txt += '<button id="opcion3" class="botonTrivias" onclick="verificarRespuestaCorrecta(3, ' + preguntas
        [indice_aleatorio].correcta + ')">' + preguntas[indice_aleatorio].respuesta[3] + '</button>';

        document.getElementById("pregunta").innerHTML = pregunta_txt;

        preguntas.splice(indice_aleatorio, 1);

    } else {

        window.location.href = "../VISTAS/resultado.html";
    }
}

let puntos = 0;

function verificarRespuestaCorrecta(indice, correcta) {
    if (correcta === indice) {
        puntos = puntos + 5;
    }
    localStorage.setItem("SCORE", puntos);

    document.getElementById("opcion0").disabled = true;
    document.getElementById("opcion1").disabled = true;
    document.getElementById("opcion2").disabled = true;
    document.getElementById("opcion3").disabled = true;

}

document.getElementById("siguienteTrivia").addEventListener("click", () => { clearInterval(interval), loadQuestions() }); 