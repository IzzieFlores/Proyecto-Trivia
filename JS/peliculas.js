const preguntas = [
    {
        pregunta: "¿En qué película aparece Jack Nicholson?",
        respuesta: ["50 Sombras de Grey", "El resplandor", "Intensamente", "Silen Hill"],
        correcta: 1
    },

    {
        pregunta: "¿En qué género de cine se encuentra la película V de Vendetta?",
        respuesta: ["Thriller Psicológico", "Drama", "Ciencia Ficción", "Romance"],
        correcta: 2
    },

    {
        pregunta: "¿Cuáles eran los personajes principales del Titanic?",
        respuesta: ["Jack Dawson y Rose DeWitt Bukater", "Noah Caulhon y Allie Halminton", "Ryan Reynolds y Blake Lively", "Romeo Montesco y Julieta Capuleto"],
        correcta: 0
    },

    {
        pregunta: "¿Cuál fue el símbolo de Katniss Everdeen en Los juegos del hambre?",
        respuesta: ["Águila", "Leona", "Cisne", "Sinsajo"],
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

            componente.innerHTML = "Se acabó el tiempo";

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

        pregunta_txt += '<button id="opcion0" class="botonTrivias" onclick="verificarRespuestaCorrecta(0, ' + preguntas[indice_aleatorio].correcta + ')">' + preguntas[indice_aleatorio].respuesta[0] + '</button>';

        pregunta_txt += '<button id="opcion1" class="botonTrivias" onclick="verificarRespuestaCorrecta(1, ' + preguntas[indice_aleatorio].correcta + ')">' + preguntas[indice_aleatorio].respuesta[1] + '</button>';

        pregunta_txt += '<button id="opcion2" class="botonTrivias" onclick="verificarRespuestaCorrecta(2, ' + preguntas[indice_aleatorio].correcta + ')">' + preguntas[indice_aleatorio].respuesta[2] + '</button>';

        pregunta_txt += '<button id="opcion3" class="botonTrivias" onclick="verificarRespuestaCorrecta(3, ' + preguntas[indice_aleatorio].correcta + ')">' + preguntas[indice_aleatorio].respuesta[3] + '</button>';

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