function pintarNombre(){
    document.getElementById("saludo").innerHTML += localStorage.getItem("_nombre");
}

pintarNombre();

const temas = ["peliculas","series","novelas"];