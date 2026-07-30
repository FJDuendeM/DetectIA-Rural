//
// DETECTIA RURAL
// =========================

const elementos = [

    {
        tipo: "imagen",
        archivo: "imagenes/imagen1.jpg",
        respuesta: "REAL"
    },

    {
        tipo: "video",
        archivo: "videos/video1.mp4",
        respuesta: "REAL"
    },

    {
        tipo: "imagen",
        archivo: "imagenes/imagen2.png",
        respuesta: "IA"
    },

    {
        tipo: "video",
        archivo: "videos/video2.mp4",
        respuesta: "REAL"
    },

    {
        tipo: "imagen",
        archivo: "imagenes/imagen3.jpg",
        respuesta: "REAL"
    },

    {
        tipo: "video",
        archivo: "videos/video3.mp4",
        respuesta: "IA"
    },

    {
        tipo: "imagen",
        archivo: "imagenes/imagen5.jpg",
        respuesta: "IA"
    },

    {
        tipo: "imagen",
        archivo: "imagenes/imagen4.jpg",
        respuesta: "REAL"
    },

    {
        tipo: "imagen",
        archivo: "imagenes/imagen6.png",
        respuesta: "REAL"
    }

];

let elementosJuego = [];

let indice = 0;
let puntos = 0;

// =========================
// ELEMENTOS HTML
// =========================

const inicio = document.getElementById("inicio");
const juego = document.getElementById("juego");
const final = document.getElementById("final");

const contenido = document.getElementById("contenido");
const botones = document.getElementById("botones");

const contador = document.getElementById("contador");
const mensaje = document.getElementById("mensaje");

// =========================
// MEZCLAR ELEMENTOS
// =========================

function mezclarElementos(lista){

    for(let i = lista.length - 1; i > 0; i--){

        const j = Math.floor(Math.random() * (i + 1));

        [lista[i], lista[j]] = [lista[j], lista[i]];

    }

}

// =========================
// COMENZAR
// =========================

function comenzar(){

    indice = 0;
    puntos = 0;

    elementosJuego = [...elementos];

    mezclarElementos(elementosJuego);

    inicio.style.display = "none";
    juego.style.display = "block";

    cargarElemento();

}

// =========================
// CARGAR IMAGEN O VIDEO
// =========================

function cargarElemento(){

    mensaje.innerHTML = "";

    contador.innerHTML =
    `Elemento ${indice + 1} de ${elementosJuego.length}`;

    contenido.innerHTML = "";

    // ---------------------
    // IMAGEN
    // ---------------------

    if(elementosJuego[indice].tipo == "imagen"){

        botones.style.display = "block";

        contenido.innerHTML = `
        <img
        src="${elementosJuego[indice].archivo}"
        width="900">
        `;

    }

    // ---------------------
    // VIDEO
    // ---------------------

    else{

        botones.style.display = "none";

        contenido.innerHTML = `
        <video id="videoActual" width="900" controls autoplay>
            <source src="${elementosJuego[indice].archivo}" type="video/mp4">
            Tu navegador no soporta videos.
        </video>
        `;

        const video = document.getElementById("videoActual");

        video.onended = function(){

            botones.style.display = "block";

        };

    }

}

// =========================
// RESPUESTA
// =========================

function responder(opcion){

    if(opcion == elementosJuego[indice].respuesta){

        puntos++;

        mensaje.innerHTML = "✅ ¡Correcto!";
        mensaje.style.color = "lightgreen";

    }

    else{

        mensaje.innerHTML = "❌ Incorrecto";
        mensaje.style.color = "red";

    }

    setTimeout(siguiente,1500);

}

// =========================
// SIGUIENTE
// =========================

function siguiente(){

    indice++;

    if(indice >= elementosJuego.length){

        terminar();

    }

    else{

        cargarElemento();

    }

}

// =========================
// FINAL
// =========================

function terminar(){

    juego.style.display = "none";

    final.style.display = "block";

    document.getElementById("puntaje").innerHTML =
    `Obtuviste ${puntos} de ${elementosJuego.length} puntos`;

}