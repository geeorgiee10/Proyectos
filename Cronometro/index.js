window.onload = function() {
    let reloj = document.getElementById("reloj");
    let botones = document.getElementsByClassName("botones");


    reloj.innerHTML = "00:00:00";
    let segundos = 0;
    let minutos = 0;
    let horas = 0;
    let funcionando = false;
    let relojFunc;

    function numero(){
        segundos++;
        
        if(segundos == 60){
            segundos = 0;
            minutos++;
        }

        if(minutos == 60){
            minutos = 0;
            horas++;
        }

        segundos = segundos.toString().padStart(2, "0");
        minutos = minutos.toString().padStart(2, "0");
        horas = horas.toString().padStart(2, "0");
        reloj.innerHTML = `${horas}:${minutos}:${segundos}`;
    }

    
    botones[0].addEventListener("click", () =>{
        if(funcionando == false){
            funcionando = true;
            relojFunc = setInterval(numero,1000);
        }
    })

    botones[1].addEventListener("click", () =>{
        if(funcionando == true){
            funcionando = false;
            clearInterval(relojFunc);
        }
    })

    botones[2].addEventListener("click", () =>{
        segundos = 0;
        minutos = 0;
        horas = 0;
        segundos = segundos.toString().padStart(2, "0");
        minutos = minutos.toString().padStart(2, "0");
        horas = horas.toString().padStart(2, "0");
        reloj.innerHTML = `${horas}:${minutos}:${segundos}`;
    })



    

}