window.onload = function() {
    let reloj = document.getElementById("reloj");
    let cartas = document.getElementById("cartas");
    let boton = document.getElementById("boton");


    function jugar() {
    reloj.innerHTML = "00:00";
    let segundos = 0;
    let minutos = 0;
    let funcionando = false;
    let relojFunc;

    function numero() {
        segundos++;

        if (segundos == 60) {
            segundos = 0;
            minutos++;
        }
        segundos = segundos.toString().padStart(2, "0");
        minutos = minutos.toString().padStart(2, "0");
        reloj.innerHTML = `${minutos}:${segundos}`;

        if (minutos == 2) {
            clearInterval(relojFunc);
            reloj.innerHTML = "Se ha acabado el tiempo";
            bloquearJuego();
            boton.style.display = "block";
        }
    }
    

    function bloquearJuego() {
        let todasLasCartas = document.getElementsByClassName("carta");
        for (let i = 0; i < todasLasCartas.length; i++) {
            todasLasCartas[i].removeEventListener("click", manejarCarta);
        }
    }

    
        boton.style.display = "none";
        cartas.innerHTML = ""; 
        let colores = [
            "#FF5733", "#FF5733",
            "#33FF57", "#33FF57", 
            "#3357FF", "#3357FF",
            "#F0E130", "#F0E130",
            "#8E44AD", "#8E44AD", 
            "#E67E22", "#E67E22",
            "#1ABC9C", "#1ABC9C",
            "#123D45", "#123D45",
            "#111111", "#111111",
            "#FFFFFF", "#FFFFFF"
        ];

        colores = colores.sort(() => Math.random() - 0.5);

        for (let i = 0; i < 20; i++) {
            cartas.innerHTML += `<div class="carta">
                                    <div class="frente"></div>
                                    <div class="reves" style="background-color: ${colores[i]}"></div>
                                </div>`;
        }

        let carta = document.getElementsByClassName("carta");

        let cartasVolteadas = [];
        let bloqueado = false;
        let ParesEmparejados = 0;

        function manejarCarta(e) {
            if (bloqueado || minutos >= 5) return;

            e.currentTarget.style.transform = "rotateY(180deg)"; 
            cartasVolteadas.push(e.currentTarget);

            if (cartasVolteadas.length === 2) {
                bloqueado = true;

                let cartaAComprobar1 = cartasVolteadas[0].querySelector(".reves").style.backgroundColor;
                let cartaAComprobar2 = cartasVolteadas[1].querySelector(".reves").style.backgroundColor;

                if (cartaAComprobar1 == cartaAComprobar2) {
                    ParesEmparejados++;
                    cartasVolteadas = [];
                    bloqueado = false;
                    comprobarVictoria();
                } else {
                    setTimeout(() => {
                        cartasVolteadas[0].style.transform = "rotateY(0deg)";
                        cartasVolteadas[1].style.transform = "rotateY(0deg)";
                        bloqueado = false;
                        cartasVolteadas = [];
                    }, 1000);
                }
            }
        }

        function comprobarVictoria() {
            if (ParesEmparejados == 10) { 
                clearInterval(relojFunc);
                reloj.innerHTML = "Has emparejado todas las cartas¡Enhorabuena!";
                bloquearJuego();  
                boton.style.display = "block";
            }
        }

        for (let j = 0; j < 20; j++) {
            carta[j].addEventListener("click", (e) => {
                manejarCarta(e);
                
                if (!funcionando) {
                    funcionando = true;
                    relojFunc = setInterval(numero, 1000);
                }
            });
        }
    }

    jugar();

    boton.addEventListener("click", () => {
        jugar();
    })
};
