window.onload = function(){

    let td = document.getElementsByClassName("casillas");
    let empieza = document.getElementById("quien");
    let reinicio = document.getElementById("reiniciar");

    
    let numRandom = Math.floor(Math.random() *2);

    reinicio.addEventListener("click", (e) =>{
        for(let celdas = 0; celdas < td.length; celdas++){
            td[celdas].innerHTML = "";
        }
        empezar();
    })

    function empezar(){
        if(numRandom == 1){
            empieza.innerHTML = "Empieza la X";
        
        }
        else{
            empieza.innerHTML = "Empieza el O";
         
        }
    }
    empezar();

    pintarCasillas();

    function pintarCasillas(){
        for(let i = 0; i < td.length; i++){
            td[i].addEventListener("click", (e) =>{
                if(e.target.innerHTML === ""){
                    if(empieza.innerHTML.includes("X")){
                        e.target.innerHTML = "X";
                        empieza.innerHTML = "Turno del O";   
                    }
                    else{
                        e.target.innerHTML = "O";
                        empieza.innerHTML = "Turno de la X";
                    }
                    hasGanado()
                }
            })
        }
    }

    function hasGanado(){
        const combinacionesGanadoras = [
            [0, 1, 2], 
            [3, 4, 5], 
            [6, 7, 8], 
            [0, 3, 6], 
            [1, 4, 7], 
            [2, 5, 8], 
            [0, 4, 8], 
            [2, 4, 6]  
        ];

        
        for(let comb of combinacionesGanadoras){
            const[a, b, c] = comb;
            if(td[a].innerHTML === "X" && td[b].innerHTML === "X" && td[c].innerHTML === "X"){
                empieza.innerHTML = "Ha ganado la X";
                return;
            }
            else if(td[a].innerHTML === "O" && td[b].innerHTML === "O" && td[c].innerHTML === "O"){
                empieza.innerHTML = "Ha ganado la O";
                return;
            }
            
        }


        let empatar = false;
        for(let i = 0; i < td.length; i++){
            if(td[i].innerHTML === ""){
                empatar = true;
            }
        }

        if(!empatar){
            empieza.innerHTML = "Empate";
        }

    }

    

}


