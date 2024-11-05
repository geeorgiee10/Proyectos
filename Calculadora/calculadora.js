window.onload = function(){

    let pant = document.getElementById("pantalla");

    const op = document.getElementsByClassName("op");
    const num = document.getElementsByClassName("num");

    let coma = document.getElementById(".");
    let limpiar = document.getElementById("C");

    let igual = document.getElementById("igual");
    let resultado = false;

    const simbolos = ["+", "-", "*", "/", "."];

    for(let i = 0; i < op.length; i++){
        op[i].addEventListener("click", (e) =>{
            operaciones(e);
        })
    }
    
    for(let j = 0; j < num.length; j++){
        num[j].addEventListener("click", (e) =>{
            numeros(e);
        })
    }

    function operaciones (e){
        if(pant.value == ""){
            pant.value = "";
        }
        else if(simbolos.includes(pant.value.slice(-1))){
            pant.value = pant.value;
        }
        else{
            pant.value += e.target.innerHTML;
        }
    }

    function numeros (e){
        if(resultado == true){
            pant.value = "";
            pant.value += e.target.innerHTML;
            resultado = false;
        }
        else{
            pant.value += e.target.innerHTML;
        }
    }

    coma.addEventListener("click", () =>{
        if(pant.value == "" || resultado == true){
            pant.value = "";
            pant.value += "0.";
            resultado = false;
        }
        else if(pant.value.includes(".")){
            pant.value += "";
        }
        else{    
            pant.value += ".";
        }
    })

    limpiar.addEventListener("click", () =>{
        pant.value = "";
    })

    igual.addEventListener("click", () =>{
        pant.value = eval(pant.value);
        resultado = true;
        if(pant.value == "NaN"){
            pant.value = "Error";
        }
        else if(pant.value == "Infinity"){
            pant.value = "Error: Dividir entre 0";
        }
    })
    
}




