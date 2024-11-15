window.onload = function() {
    let palabraAdivinar = document.getElementById("palabraAdivinar");
    let recargar = document.getElementById("cargarNuevaPalabra");
    let inputPalabra = document.getElementById("palabra");
    let result = document.getElementById("resultado");
    let comp = document.getElementById("comprobar");

    const palabras = [
        "estrella",
        "mariposa",
        "computadora",
        "refrigerador",
        "bicicleta",
        "camioneta",
        "escritorio",
        "aventura",
        "lampara",
        "elefante",
        "murcielago",
        "hospital",
        "chocolate",
        "libertad",
        "microondas",
        "hamburguesa",
        "navegador",
        "silla",
        "delfin",
        "mesa",
        "sol",
        "lago",
        "rio",
        "cielo",
        "bosque",
        "globo",
        "avion",
        "tren",
        "piedra",
        "ciudad"
      ];

        
    function quitar(palabra){
        let letrasQuitar;

        if(palabra.length <= 5){
            letrasQuitar = 2;
        }
        else if(palabra.length <= 10){
            letrasQuitar = 5;
        }
        else{
            letrasQuitar = 8;
        }

        let palabraAModificar = palabra.split("");
        for(let i = 0; i < letrasQuitar; i++){
            let posicionAleatoria = Math.floor(Math.random() * palabraAModificar.length);
            while(palabraAModificar[posicionAleatoria] === " _ "){
                posicionAleatoria = Math.floor(Math.random() * palabraAModificar.length);
            }
            
            palabraAModificar[posicionAleatoria] = " _ ";
            
        }

        return palabraAModificar.join("");
    }

    let palabraIndiceActual;

    function cargarPalabra(){
        palabraIndiceActual = Math.floor(Math.random() * palabras.length);
        palabraAdivinar.innerHTML = quitar(palabras[palabraIndiceActual]);
    }

    cargarPalabra();
    
    recargar.addEventListener("click", () =>{
        cargarPalabra();
        inputPalabra.value = "";
        result.innerHTML = ""; 
    })

    comp.addEventListener("click", () =>{
        if(inputPalabra.value === palabras[palabraIndiceActual]){
            result.style.color = "green";
            palabraAdivinar.innerHTML = palabras[palabraIndiceActual];
            result.innerHTML = "¡Enhorabuena has adivinado la palabra!";
        }
        else{
            result.style.color = "red";
            result.innerHTML = "No es correcto. Intenta de nuevo";
            inputPalabra.value = "";
            
        }
    })
    
}