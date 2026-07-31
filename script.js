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

let tiempoInicio = 0;
let tiempoFinal = 0;
let tiempoTotal = 0;

// =========================
// JUGADOR
// =========================

let nombreJugador = "";

// =========================
// RANKING
// =========================

const CLAVE_RANKING = "detectia_rural_ranking";

function obtenerRanking() {

    return JSON.parse(localStorage.getItem(CLAVE_RANKING)) || [];

}

function guardarRankingLocal(ranking) {

    localStorage.setItem(
        CLAVE_RANKING,
        JSON.stringify(ranking)
    );

}

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

const inputNombre = document.getElementById("nombreJugador");
const rankingDiv = document.getElementById("ranking");
const puesto = document.getElementById("puesto");

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

    // Si venimos de una partida anterior
    final.style.display = "none";

    // Obtener nombre
    nombreJugador = inputNombre.value.trim();

    if(nombreJugador == ""){

        alert("Por favor, ingresá tu nombre.");

        return;

    }

    indice = 0;
    puntos = 0;

    tiempoInicio = Date.now();

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

    final.style.display = "flex";

    tiempoFinal = Date.now();

    tiempoTotal = Math.round((tiempoFinal - tiempoInicio) / 1000);

    document.getElementById("puntaje").innerHTML =
    `
    🎯 ${nombreJugador}, obtuviste ${puntos} de ${elementosJuego.length} puntos
    <br>
    ⏱ Tiempo: ${tiempoTotal} segundos
    `;

    let ranking = obtenerRanking();

    const nombreBuscado = nombreJugador.toLowerCase();

    const jugador = ranking.find(j =>
        j.nombre.toLowerCase() == nombreBuscado
    );


    if(jugador){

        if(puntos > jugador.puntaje){

            jugador.puntaje = puntos;
            jugador.tiempo = tiempoTotal;
            jugador.fecha = new Date().toLocaleString();

        }

    }

    else{

        ranking.push({

    nombre: nombreJugador,
    puntaje: puntos,
    tiempo: tiempoTotal,
    fecha: new Date().toLocaleString()

});

    }


    ranking.sort((a, b) => {

    if (b.puntaje !== a.puntaje) {
        return b.puntaje - a.puntaje;
    }

    return a.tiempo - b.tiempo;

});


    guardarRankingLocal(ranking);

    mostrarRanking();


    // Mostrar puesto del jugador

    let posicion = ranking.findIndex(j =>
        j.nombre.toLowerCase() == nombreBuscado
    );


    document.getElementById("puesto").innerHTML =
    `🏆 Quedaste en el puesto #${posicion + 1} del ranking`;

}


// =========================
// NUEVO JUGADOR
// =========================

function nuevoJugador(){

    final.style.display = "none";

    inicio.style.display = "block";

    document.getElementById("nombre").value = "";

}

// =========================
// MOSTRAR RANKING
// =========================

function mostrarRanking(){

    let ranking = obtenerRanking();

    let lista = document.getElementById("ranking");

    lista.innerHTML = "";


    ranking.slice(0,10).forEach((jugador,index)=>{

        let medalla = "";
        let color = "";

        if(index == 0){
            medalla = "🥇";
            color = "#ffd700";
        }
        else if(index == 1){
            medalla = "🥈";
            color = "#c0c0c0";
        }
        else if(index == 2){
            medalla = "🥉";
            color = "#cd7f32";
        }
        else{
            medalla = `${index + 1}️⃣`;
            color = "#9cff57";
        }


        lista.innerHTML += `

        <div style="
            background:rgba(255,255,255,.07);
            border-left:6px solid ${color};
            border-radius:12px;
            padding:12px 15px;
            margin-bottom:10px;
        ">

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                font-size:20px;
                font-weight:bold;
            ">

                <span>${medalla} ${jugador.nombre}</span>

                <span style="color:#ffe600;">
                    ⭐ ${jugador.puntaje}
                </span>

            </div>

            <div style="
            margin-top:6px;
            color:#cfcfcf;
            font-size:15px;
            ">
            ⏱ ${jugador.tiempo} s
            <br>
            📅 ${jugador.fecha}
            </div>

        </div>

        `;

    });

}

mostrarRanking();

// =========================
// REINICIAR RANKING
// =========================

function reiniciarRanking(){

    if(!confirm("¿Seguro que querés borrar todo el ranking?")){
        return;
    }

    localStorage.removeItem(CLAVE_RANKING);

    mostrarRanking();

    alert("✅ Ranking reiniciado.");

}

// =========================
// EXPORTAR RANKING
// =========================

function exportarRanking(){

    const ranking = obtenerRanking();

    if(ranking.length === 0){

        alert("No hay ranking para exportar.");

        return;

    }

    const datos = JSON.stringify(ranking, null, 4);

    const blob = new Blob([datos], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const enlace = document.createElement("a");

    enlace.href = url;
    enlace.download = "ranking_detectia_rural.json";

    enlace.click();

    URL.revokeObjectURL(url);

}

// =========================
// IMPORTAR RANKING
// =========================

document.getElementById("archivoRanking").addEventListener("change", importarRanking);

function importarRanking(event){

    const archivo = event.target.files[0];

    if(!archivo){
        return;
    }

    const lector = new FileReader();

    lector.onload = function(e){

        try{

            const ranking = JSON.parse(e.target.result);

            guardarRankingLocal(ranking);

            mostrarRanking();

            alert("✅ Ranking importado correctamente.");

        }

        catch{

            alert("❌ El archivo no es válido.");

        }

    };

    lector.readAsText(archivo);

}