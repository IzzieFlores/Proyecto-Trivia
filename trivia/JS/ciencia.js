const preguntas = [
    {
        pregunta: "¿Qué desastre natural se mide con la escala de Richter?",
        respuesta: ["Tornados", "Terremotos", "Inundaciones", "Huracanes"],
        correcta: 1
    },

    {
        pregunta: "¿Quién fue la primera persona en ver las lunas de Júpiter?",
        respuesta: ["Galileo Galilei", "Albert Einstein", "Isaac Newton", "Nicolaus Copernicus"],
        correcta: 2
    },

    {
        pregunta: "¿Cuál es la hormona que ayuda la muda del exoesqueleto de los insectos?",
        respuesta: ["Ecdisona", "Testosterona", "Progesterona", "Oxitocina"],
        correcta: 0
    },

    {
        pregunta: "¿Quién inventó la bombilla eléctrica?",
        respuesta: ["Thomas Alva Edison", "Alexander Graham Bell", "Marie Curie", "Nikola Tesla"],
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