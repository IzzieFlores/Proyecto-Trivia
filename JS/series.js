const preguntas = [
    {
        pregunta: "¿Cuantas temporadas tiene la serie Game of Thrones?",
        respuesta: ["4", "20", "8", "12"],
        correcta: 1
    },

    {
        pregunta: "¿De que serie son los personajes Chandler, Phoebe, Mónica, Joey, Ross y Rachel?",
        respuesta: ["Friends", "Elite", "Stranger Things", "The Crown"],
        correcta: 2
    },

    {
        pregunta: "¿Cual es la profesion del personaje principal de la serie Breaking Bad?",
        respuesta: ["Musico", "Quimico", "Medico", "Ingeniero"],
        correcta: 0
    },

    {
        pregunta: "La serie que trata sobre el reinado de la reina Isabel II es…",
        respuesta: ["Peaky Blinders", "Atypical", "Bridgerton", "The Crown"],
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