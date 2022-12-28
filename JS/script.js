document.getElementById("boton").addEventListener("click",guardarNombre);

function guardarNombre(){
    var nombreUsuario = document.getElementById("nombre").value;

    localStorage.setItem("_nombre",nombreUsuario);
}