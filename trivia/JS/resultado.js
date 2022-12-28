function pintarResultado (){
    var puntaje = localStorage.getItem("SCORE");
    var puntajeContenedor = document.getElementById("score")

    if (puntaje === null)  {
        puntajeContenedor.innerHTML = 0 + " puntos"
    } else {
        puntajeContenedor.innerHTML = localStorage.getItem("SCORE") + " puntos";
    }
}

pintarResultado();