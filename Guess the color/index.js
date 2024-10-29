window.onload = function() {
    let colorAdivinar = document.getElementById("colorAdiv");
    let recuadrosJS = document.getElementsByClassName("recuadro");
    let newColors = document.getElementById("nuevosColores");
    let modoHard = document.getElementById("hard");
    let modoEasy = document.getElementById("easy");

    let vidaJugables = 3;
    let numRecuadros = 6; 

    //Si se pone de inicio a modo facil descomentar
    /*for(let c = 3; c < recuadrosJS.length; c++){
        recuadrosJS[c].style.backgroundColor = "transparent";
    }*/

    jugar(vidaJugables, numRecuadros); 

    newColors.addEventListener("click", (e) => {
        jugar(vidaJugables, numRecuadros);
    });

    modoHard.addEventListener("click", (e) => {
        numRecuadros = 6;
        vidaJugables = 3;
        jugar(vidaJugables, numRecuadros);
    });
    modoEasy.addEventListener("click", (e) => {
        numRecuadros = 3;
        vidaJugables = 2;
        jugar(vidaJugables, numRecuadros);
        for(let c = 3; c < recuadrosJS.length; c++){
            recuadrosJS[c].style.backgroundColor = "transparent";
        }
    });

    function jugar(vidas, numeroDeRecuadros) {
        

        let randomizar1 = Math.floor(Math.random() * 256);
        let randomizar2 = Math.floor(Math.random() * 256);
        let randomizar3 = Math.floor(Math.random() * 256);
        let colorRandom = `rgb(${randomizar1}, ${randomizar2}, ${randomizar3})`;
        colorAdivinar.innerHTML = colorRandom;

        for (let i = 0; i < numeroDeRecuadros; i++) {
            recuadrosJS[i].style.backgroundColor = colorAleatorio();
        }
        
        let numeroCuadradoRandom = Math.floor(Math.random() * numeroDeRecuadros);
        let recuadroBuscado = recuadrosJS[numeroCuadradoRandom];

        if (recuadroBuscado) {
            recuadroBuscado.style.backgroundColor = colorRandom;

            recuadroBuscado.addEventListener("click", (e) => {
                if (recuadroBuscado.style.backgroundColor === colorAdivinar.innerHTML) {
                    for (let i = 0; i < numeroDeRecuadros; i++) {
                        recuadrosJS[i].style.backgroundColor = colorAdivinar.innerHTML;
                    }
                }
            });
        }

        for (let j = 0; j < numeroDeRecuadros; j++) {
            recuadrosJS[j].onclick = (e) => {
                if (e.target.style.backgroundColor !== colorAdivinar.innerHTML) {
                    vidas--; 
                    if (vidas === 0) {
                        for (let k = 0; k < numeroDeRecuadros; k++) {
                            recuadrosJS[k].style.backgroundColor = "transparent";
                        }
                    } else {
                        e.target.style.backgroundColor = "transparent";   
                    }  
                }
            };
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
