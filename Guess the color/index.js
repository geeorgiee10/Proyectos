window.onload = function() {
    let colorAdivinar = document.getElementById("colorAdiv");
    let recuadrosJS = document.getElementsByClassName("recuadro");
    let newColors = document.getElementById("nuevosColores");
    let modoHard = document.getElementById("hard");
    let modoEasy = document.getElementById("easy");

    let vidaJugables = 3;
    let numRecuadros = 6; 
    let vidasActuales = 3;
    
    //Si se pone de inicio a modo facil descomentar
    /*for(let c = 3; c < recuadrosJS.length; c++){
        recuadrosJS[c].style.backgroundColor = "transparent";
    }*/

    function pintar (numDeRecuadros){
        let randomizar1 = Math.floor(Math.random() * 256);
        let randomizar2 = Math.floor(Math.random() * 256);
        let randomizar3 = Math.floor(Math.random() * 256);
        let colorRandom = `rgb(${randomizar1}, ${randomizar2}, ${randomizar3})`;
        colorAdivinar.innerHTML = colorRandom;

        for (let i = 0; i < numRecuadros; i++) {
            recuadrosJS[i].style.backgroundColor = colorAleatorio();
        }
        let numeroCuadradoRandom = Math.floor(Math.random() * numDeRecuadros);
        let recuadroBuscado = recuadrosJS[numeroCuadradoRandom];
        recuadroBuscado.style.backgroundColor = colorRandom;
    }

    pintar(numRecuadros);
    
    for(let celdas = 0; celdas < recuadrosJS.length; celdas++){
        recuadrosJS[celdas].addEventListener("click", (es) =>{
            jugar(numRecuadros, es)
        });
    }
    newColors.addEventListener("click", (e) => {
        pintar(numRecuadros);
        vidaJugables = vidasActuales;
    });

    modoHard.addEventListener("click", (e) => {
        numRecuadros = 6;
        vidaJugables = 3;
        vidasActuales = 3;
        pintar(numRecuadros);
    });
    modoEasy.addEventListener("click", (e) => {
        numRecuadros = 3;
        vidaJugables = 2;
        vidasActuales = 2;
        console.log("Tienes vidas: " + vidaJugables);
        pintar(numRecuadros);
        for(let c = numRecuadros; c < recuadrosJS.length; c++){
            recuadrosJS[c].style.backgroundColor = "transparent";
        }
    });

    function jugar(numeroDeRecuadros, elemento) {
        if(elemento.target.style.backgroundColor == colorAdivinar.innerHTML){
            for(let i = 0; i < numeroDeRecuadros; i++){
                recuadrosJS[i].style.backgroundColor = elemento.target.style.backgroundColor;
            }
        }
        else{
            elemento.target.style.backgroundColor = "transparent"; 
            vidaJugables--;
            console.log("Las vidas restantes: " + vidaJugables)
            if(vidaJugables === 0){
                for (let k = 0; k < numeroDeRecuadros; k++) {
                    recuadrosJS[k].style.backgroundColor = "transparent";
                }
            }
        }
    }

};

function colorAleatorio() {
    let random1 = Math.floor(Math.random() * 256);
    let random2 = Math.floor(Math.random() * 256);
    let random3 = Math.floor(Math.random() * 256);

    let aleatorizarColor = `rgb(${random1},${random2},${random3})`;

    return aleatorizarColor;
}
