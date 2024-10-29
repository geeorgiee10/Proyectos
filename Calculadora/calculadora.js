window.onload = function(){

    let pant = document.getElementById("pantalla");

    let sum = document.getElementById("sumar");
    let res = document.getElementById("restar");
    let mul = document.getElementById("multiplicar");
    let div = document.getElementById("dividir");

    let uno = document.getElementById("1");
    let dos = document.getElementById("2");
    let tres = document.getElementById("3");
    let cuatro = document.getElementById("4");
    let cinco = document.getElementById("5");
    let seis = document.getElementById("6");
    let siete = document.getElementById("7");
    let ocho = document.getElementById("8");
    let nueve = document.getElementById("9");
    let cero = document.getElementById("0");
    let coma = document.getElementById(".");
    let limpiar = document.getElementById("C");

    let igual = document.getElementById("igual");
    let resultado = false;

    const simbolos = ["+", "-", "*", "/", "."];


    sum.addEventListener("click", () =>{
        if(pant.value == ""){
            pant.value = "";
        }
        else if(simbolos.includes(pant.value.slice(-1))){
            pant.value = pant.value;
        }
        else{
            pant.value += "+";
        }
    })

    res.addEventListener("click", () =>{
        if(pant.value == ""){
            pant.value = "";
        }
        else if(simbolos.includes(pant.value.slice(-1))){
            pant.value = pant.value;
        }
        else{
            pant.value += "-";
        }
    })

    mul.addEventListener("click", () =>{
        if(pant.value == ""){
            pant.value = "";
        }
        else if(simbolos.includes(pant.value.slice(-1))){
            pant.value = pant.value;
        }
        else{
            pant.value += "*";
        }
    })

    div.addEventListener("click", () =>{
        if(pant.value == ""){
            pant.value = "";
        }
        else if(simbolos.includes(pant.value.slice(-1))){
            pant.value = pant.value;
        }
        else{
            pant.value += "/";
        }
    })

    uno.addEventListener("click", () =>{
        if(resultado == true){
            pant.value = "";
            pant.value += "1";
            resultado = false;
        }
        else{
            pant.value += "1";
        }
    })

    dos.addEventListener("click", () =>{
        if(resultado == true){
            pant.value = "";
            pant.value += "2";
            resultado = false;
        }
        else{
            pant.value += "2";
        }
    })

    tres.addEventListener("click", () =>{
        if(resultado == true){
            pant.value = "";
            pant.value += "3";
            resultado = false;
        }
        else{
            pant.value += "3";
        }
    })

    cuatro.addEventListener("click", () =>{
        if(resultado == true){
            pant.value = "";
            pant.value += "4";
            resultado = false;
        }
        else{
            pant.value += "4";
        }
    })

    cinco.addEventListener("click", () =>{
        if(resultado == true){
            pant.value = "";
            pant.value += "5";
            resultado = false;
        }
        else{
            pant.value += "5";
        }
    })

    seis.addEventListener("click", () =>{
        if(resultado == true){
            pant.value = "";
            pant.value += "6";
            resultado = false;
        }
        else{
            pant.value += "6";
        }
    })

    siete.addEventListener("click", () =>{
        if(resultado == true){
            pant.value = "";
            pant.value += "7";
            resultado = false;
        }
        else{
            pant.value += "7";
        }
    })

    ocho.addEventListener("click", () =>{
        if(resultado == true){
            pant.value = "";
            pant.value += "8";
            resultado = false;
        }
        else{
            pant.value += "8";
        }
    })

    nueve.addEventListener("click", () =>{
        if(resultado == true){
            pant.value = "";
            pant.value += "9";
            resultado = false;
        }
        else{
            pant.value += "9";
        }
    })

    cero.addEventListener("click", () =>{
        if(resultado == true){
            pant.value = "";
            pant.value += "0";
            resultado = false;
        }
        else{
            pant.value += "0";
        }
    })

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
    })
    
}




