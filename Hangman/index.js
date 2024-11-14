window.onload = function(){
    let alfabeto = document.getElementById("alfabeto");
    let categoriaPantalla = document.getElementById("categoria");
    let palabraPantalla = document.getElementById("palabra");
    let vidasPantalla = document.getElementById("vidas");
    let letras;
    let categoria;
    let palabra;
    let vidas;
    let boton = document.getElementById("reiniciar");


    const palabrasPorCategoria = [
        { categoria: "Animales", palabras: ["elefante", "jirafa", "camaleon", "ballena", "pinguino", "tiburon", "cocodrilo", "canguro", "murcielago", "flamenco"] },
        { categoria: "Frutas", palabras: ["manzana", "banana", "cereza", "durazno", "sandia", "mango", "papaya", "fresa", "kiwi"] },
        { categoria: "Colores", palabras: ["rojo", "verde", "azul", "amarillo", "naranja", "morado", "rosado", "turquesa", "gris", "negro"] },
        { categoria: "Países", palabras: ["argentina", "canada", "brasil", "mexico", "italia", "alemania", "japon", "francia", "rusia", "egipto"] },
        { categoria: "Deportes", palabras: ["futbol", "baloncesto", "natacion", "tenis", "golf", "atletismo", "voleibol", "esgrima", "ciclismo", "boxeo"] },
        { categoria: "Profesiones", palabras: ["arquitecto", "ingeniero", "doctor", "profesor", "abogado", "bombero", "policia", "panadero", "pintor", "cientifico"] },
        { categoria: "Instrumentos Musicales", palabras: ["guitarra", "piano", "violin", "bateria", "flauta", "saxofon", "trompeta", "arpa", "xilofono", "bajo"] },
        { categoria: "Cuerpo Humano", palabras: ["corazon", "pulmon", "cerebro", "estomago", "hueso", "musculo", "higado", "riñon", "piel", "ojo"] },
        { categoria: "Tecnología", palabras: ["computadora", "telefono", "teclado", "internet", "robot", "dron", "microchip", "pantalla", "impresora", "tablet"] },
        { categoria: "Transporte", palabras: ["avion", "bicicleta", "barco", "tren", "automovil", "motocicleta", "autobus", "camion", "submarino", "helicoptero"] }
    ];

    function iniciar(){

        alfabeto.innerHTML = "";

        for(let i = 97; i <= 122; i++){
            alfabeto.innerHTML += '<div class="letra">' + String.fromCharCode(i) + '</div>';
        }

        letras = document.getElementsByClassName("letra");

        categoria = palabrasPorCategoria[Math.floor(Math.random() * palabrasPorCategoria.length)];
        categoriaPantalla.innerHTML = `The Choosen Category is ${categoria.categoria}`;

        palabra = categoria.palabras[Math.floor(Math.random() * palabrasPorCategoria.length)];

        function ocultarPalabra(palabra){
            return Array(palabra.length).fill(" _ ");
        }

        let palabraOculta = ocultarPalabra(palabra)

        function pintar(vidas){
            palabraPantalla.innerHTML = palabraOculta.join(" ");
            vidasPantalla.innerHTML = `You have ${vidas} lives`;
        }

        vidas = 10;
        pintar(vidas);

    

        for(let letra of letras){
            letra.addEventListener("click", (e) => {
                let seleccionar = e.target.textContent;
                let letraCorrecta = false;
            
                for (let i = 0; i < palabra.length; i++) {
                    if (palabra[i] == seleccionar) {
                        palabraOculta[i] = seleccionar;
                        letraCorrecta = true;
                    }
                }

                if (!letraCorrecta) {
                    vidas--;
                }

                pintar(vidas);

                e.target.style.pointerEvents = "none";
                e.target.style.opacity = "0.5";

                if(vidas == 0){
                    vidasPantalla.innerHTML = "¡You have lost!"
                    for(let letra of letras){
                        letra.style.pointerEvents = "none";
                        letra.style.opacity = "0.5";
                    }
                    boton.style.display = "block";
                }
    
                if(!palabraPantalla.innerHTML.includes("_")){
                    vidasPantalla.innerHTML = "You have won";
                    for(let letra of letras){
                        letra.style.pointerEvents = "none";
                        letra.style.opacity = "0.5";
                    }
                    boton.style.display = "block";
                }

            });
        }
    }

    iniciar();

    boton.addEventListener("click", () => {
        iniciar();
        boton.style.display = "none";
    });

}