window.onload = function(){

    let td = document.getElementsByClassName("casillas");
    let empieza = document.getElementById("quien");
    let reinicio = document.getElementById("reiniciar");
    let opcion = document.getElementsByClassName("muestra");
    
    let numeroColumnas = 7;
    let numRandom = Math.floor(Math.random() *2);
    let finalizar = false;

    for(let i = 0; i < td.length; i++){
        td[i].addEventListener("click", (e) =>{
            pintarCasillas(e , i);
            hasGanado();
        })
    }
    
    for(let j = 0; j < td.length; j++){
        td[j].addEventListener("mouseover", (e) =>{
            if(finalizar){return}
            let columna = j % numeroColumnas;
            opcion[columna].style.backgroundColor = empieza.style.backgroundColor;
            
        })
        td[j].addEventListener("mouseout", (e) =>{
            let columna = j % numeroColumnas;
            opcion[columna].style.backgroundColor = "transparent";
            
        })
    }

    reinicio.addEventListener("click", (e) =>{
        for(let celdas = 0; celdas < td.length; celdas++){
            td[celdas].style.backgroundColor = "white";
            td[celdas].innerHTML = "";
            empieza.innerHTML = "";
        }
        finalizar = false;
        empezar();
    })

    function empezar(){
        if(numRandom == 1){
            empieza.style.backgroundColor = "lightgreen";
        }
        else{
            empieza.style.backgroundColor = "red";
        }
    }
    empezar();

    function pintarCasillas(es, celda){
        if(finalizar == true){return} 
        let columna = celda % numeroColumnas;

            if(es.target.innerHTML === ""){
                if(empieza.style.backgroundColor == "lightgreen"){
                    es.target.style.backgroundColor = "lightgreen";
                    es.target.innerHTML = " ";
                    empieza.style.backgroundColor = "red";
                }
                else{
                    es.target.style.backgroundColor = "red";
                    es.target.innerHTML = " ";
                    empieza.style.backgroundColor = "lightgreen";
                }
                
            }
    }

    function generarCombinacionesGanadoras(filas, columnas) {
        const combinacionesGanadoras = [];
    
        // Combinaciones horizontales
        for (let fila = 0; fila < filas; fila++) {
            for (let col = 0; col <= columnas - 4; col++) {
                combinacionesGanadoras.push([
                    fila * columnas + col,
                    fila * columnas + col + 1,
                    fila * columnas + col + 2,
                    fila * columnas + col + 3
                ]);
            }
        }
    
        // Combinaciones verticales
        for (let col = 0; col < columnas; col++) {
            for (let fila = 0; fila <= filas - 4; fila++) {
                combinacionesGanadoras.push([
                    fila * columnas + col,
                    (fila + 1) * columnas + col,
                    (fila + 2) * columnas + col,
                    (fila + 3) * columnas + col
                ]);
            }
        }
    
        // Combinaciones diagonales hacia la derecha
        for (let fila = 0; fila <= filas - 4; fila++) {
            for (let col = 0; col <= columnas - 4; col++) {
                combinacionesGanadoras.push([
                    fila * columnas + col,
                    (fila + 1) * columnas + (col + 1),
                    (fila + 2) * columnas + (col + 2),
                    (fila + 3) * columnas + (col + 3)
                ]);
            }
        }
    
        // Combinaciones diagonales hacia la izquierda
        for (let fila = 0; fila <= filas - 4; fila++) {
            for (let col = 3; col < columnas; col++) {
                combinacionesGanadoras.push([
                    fila * columnas + col,
                    (fila + 1) * columnas + (col - 1),
                    (fila + 2) * columnas + (col - 2),
                    (fila + 3) * columnas + (col - 3)
                ]);
            }
        }
    
        return combinacionesGanadoras;
    }

    function hasGanado(){
        
        const combinacionesGanadoras = generarCombinacionesGanadoras(6,7)

        for(let comb of combinacionesGanadoras){
            const[a, b, c, d] = comb;
            if(td[a].style.backgroundColor == "lightgreen" && 
               td[b].style.backgroundColor == "lightgreen" &&
               td[c].style.backgroundColor == "lightgreen" && 
               td[d].style.backgroundColor == "lightgreen"){
                    empieza.style.backgroundColor = "lightgreen";
                    empieza.innerHTML = "Winner";
                    finalizar = true;
                    return;
            }
            else if(td[a].style.backgroundColor == "red" && 
                    td[b].style.backgroundColor == "red" &&
                    td[c].style.backgroundColor == "red" && 
                    td[d].style.backgroundColor == "red"){
                empieza.style.backgroundColor = "red";        
                empieza.innerHTML = "Winner";
                finalizar = true;
                return;
            }
            
        }


        let empate = true;
        for (let i = 0; i < td.length; i++) {
            if (td[i].innerHTML === "") {
                empate = false;
                return;
        }
    }

        if (empate) {
            empieza.style.backgroundColor = "transparent";
            empieza.innerHTML = "Empate";
            finalizar = true;
        }
        
    }
}


