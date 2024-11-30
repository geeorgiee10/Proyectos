var paginaABuscar = 2;
var cargarbtn;
var numResults;
var tiempCarga;
var enCurso;
var peliculas = [];

window.onload = ()=>{
    let btn = document.getElementById("boton").addEventListener("click",  peticionModerna);
    let lista = document.getElementById("lista");
    let titulo = document.getElementById("titulo");
    let buscador = document.getElementById("buscador");
    let tipo = document.getElementById("tipo");
    let btnCerrarInforme = document.getElementById("btnCerrarInforme");
    let listaInforme = document.getElementById("listaInforme");
    let vistaInforme = document.getElementById("vistaInforme");
    numResults = document.getElementById("numResultados");
    tiempCarga = document.getElementById("tiempoCarga");
    let crearInformeBtn = document.getElementById("crearInforme");
    
    
    crearInformeBtn.addEventListener("click", generarInforme);

    btnCerrarInforme.addEventListener("click", () => {
        vistaInforme.style.display = "none";
    });

    buscador.addEventListener("keypress", (e) => {
        if (e.key === "Enter") { 
            peticionModerna(); 
        }
    });

    buscador.addEventListener("input", () => {
        if (buscador.value.length >= 3) {
            peticionModerna();
        }
    });

    window.addEventListener("scroll", () => {
        const endOfPage = window.innerHeight + document.documentElement.scrollTop >= (document.body.offsetHeight * 0.7)

        if(endOfPage){
            if(!enCurso){
                cargarMas();
            }
        }
    });

    titulo.addEventListener("click", () =>{
        paginaABuscar = 0;
        lista.innerHTML = "";
        numResults.innerHTML = "";
        buscador.value = "";
    });

    

}

function peticionModerna(){
    tiempCarga.style.display = "block";
    fetch("https://www.omdbapi.com/?apikey=5784e290&s=" + buscador.value + "&type="+ tipo.value + "", {method: "GET"})
    .then((res) => res.json())
    .then((datosRecibidos) =>{
        lista.innerHTML = "";

        numResults.innerHTML = "Se han encontrado " + datosRecibidos.totalResults + " resultados";

        tiempCarga.style.display = "none";

        if (datosRecibidos.Search && datosRecibidos.Search.length > 0) {
            peliculas = datosRecibidos;
            forEach(datosRecibidos);
        } 
        else {
            numResults.innerHTML = "";
        }

    })
    .catch((err) => console.log("error:", err));
}

function cargarMas(){
    tiempCarga.style.display = "block";
    enCurso = true;

    fetch("https://www.omdbapi.com/?apikey=5784e290&s=" + buscador.value + "&type=" + tipo.value + "&page=" + paginaABuscar, {method: "GET"})
    .then((res) => res.json())
    .then((datosRecibidos) =>{

        paginaABuscar++;
        tiempCarga.style.display = "none";

        if (datosRecibidos.Search && datosRecibidos.Search.length > 0) {
            
            forEach(datosRecibidos);
            
        } 
        else {
            numResults.innerHTML = "";
        }
        
        enCurso = false;

    })
    .catch((err) => console.log("error:", err));
}

function detalle(e){
    tiempCarga.style.display = "block";

    fetch("https://www.omdbapi.com/?apikey=5784e290&i=" + e.target.idPelicula, {method: "GET"})
    .then((res) => res.json())
    .then((detallesPeliculas) =>{
        tiempCarga.style.display = "none";

        
        let detail = document.createElement("div");
        detail.classList.add("detalles");
        
        let btnCerrar = document.createElement("button");
        btnCerrar.textContent = "X";
        btnCerrar.classList.add("botonCerrar");
        btnCerrar.onclick = () => {
            detail.remove();
        };

        let titulo = document.createElement("h2");
        titulo.textContent = detallesPeliculas.Title;
        titulo.classList.add("titulo");

        let contenedorPeli = document.createElement("div");
        contenedorPeli.classList.add("contentPeli");
        
        let poster = document.createElement("img");
        poster.src = detallesPeliculas.Poster;
        poster.src = detallesPeliculas.Poster !== "N/A" ? detallesPeliculas.Poster : "./predeterminada.jpg";
        poster.alt = detallesPeliculas.Title;
        poster.addEventListener("error", (e) =>{
            poster.src = "./predeterminada.jpg";
        })

        let contenedorInfor = document.createElement("div");
        contenedorInfor.classList.add("contenedorTexto");
        
        let lanzamiento = document.createElement("li");
        lanzamiento.textContent = `Fecha de lanzamiento: ${detallesPeliculas.Released && detallesPeliculas.Released !== "N/A" ? detallesPeliculas.Released : "Desconocida"}`;
        
        let genero = document.createElement("li");
        genero.textContent = `Género: ${detallesPeliculas.Genre && detallesPeliculas.Genre !== "N/A" ? detallesPeliculas.Genre : "Desconocido"}`;
        
        let director = document.createElement("li");
        director.textContent = `Director: ${detallesPeliculas.Director && detallesPeliculas.Director !== "N/A" ? detallesPeliculas.Director : "Desconocido"}`;

        let actores = document.createElement("li");
        actores.textContent = `Actores: ${detallesPeliculas.Actors && detallesPeliculas.Actors !== "N/A" ? detallesPeliculas.Actors : "Desconocidos"}`;

        let idiomas = document.createElement("li");
        idiomas.textContent = `Idiomas de la Pelicula: ${detallesPeliculas.Language && detallesPeliculas.Language !== "N/A" ? detallesPeliculas.Language : "No disponible"}`;
        
        let rating = document.createElement("li");
        rating.textContent = `Valoración: ${detallesPeliculas.imdbRating}`;

        let otherRatings = document.createElement("li");
        otherRatings.innerHTML = "Otras Valoraciones:"

        let ratingsText = document.createElement("ul");
        

        detallesPeliculas.Ratings.forEach(rating => {
            let ratingsTextLi = document.createElement("li");
            ratingsTextLi.innerHTML =  `Fuente: ${rating.Source}  Valor: ${rating.Value}`;
            ratingsText.appendChild(ratingsTextLi);
        });

        otherRatings.appendChild(ratingsText);

        let plot = document.createElement("li");
        plot.textContent = `Resumen: ${detallesPeliculas.Plot || "Sin información"}`;
        plot.textContent = `Resumen: ${detallesPeliculas.Plot && detallesPeliculas.Plot !== "N/A" ? detallesPeliculas.Plot : "Sin información"}`;
                
        
        contenedorInfor.appendChild(lanzamiento);
        contenedorInfor.appendChild(genero);
        contenedorInfor.appendChild(director);
        contenedorInfor.appendChild(actores);
        contenedorInfor.appendChild(idiomas);
        contenedorInfor.appendChild(rating);
        contenedorInfor.appendChild(otherRatings);
        contenedorInfor.appendChild(plot);

        contenedorPeli.appendChild(poster);
        contenedorPeli.appendChild(contenedorInfor);

        detail.appendChild(btnCerrar);
        detail.appendChild(titulo);
        detail.appendChild(contenedorPeli);
        
        document.body.appendChild(detail);

    })
    .catch((err) => console.log("error:", err));
}

function forEach(datos){
    datos.Search.forEach(element => {
        let img = document.createElement("img");
        img.src = element.Poster !== "N/A" ? element.Poster : "./predeterminada.jpg";
        img.alt = element.Title;
        img.idPelicula = element.imdbID;
        img.classList.add("posterPeliculas");
        img.addEventListener("click", detalle);
        img.addEventListener("error", (e) =>{
            img.src = "./predeterminada.jpg";
        })


        lista.appendChild(img);

    });
}


function generarInforme() {
    let peliculasRating = [];
    let peliculasRecaudacion = [];
    let peliculasVotos = [];

    peliculas.Search.forEach((obj, index) => {
        fetch("https://www.omdbapi.com/?apikey=5784e290&i=" + obj.imdbID, { method: "GET" })
            .then((res) => res.json())
            .then((detalles) => {
                if (detalles.imdbRating && detalles.imdbRating !== "N/A") {
                    peliculasRating.push(detalles);
                }

                if (detalles.BoxOffice && detalles.BoxOffice !== "N/A") {
                    peliculasRecaudacion.push(detalles);
                }

                if (detalles.imdbVotes && detalles.imdbVotes !== "N/A") {
                    peliculasVotos.push(detalles);
                }

                if (peliculasRating.length === peliculas.Search.length || index === peliculas.Search.length - 1) {
                    let topValoracion = peliculasRating.length > 0 ? peliculasRating.slice(0, 5) : [{ Title: "Sin datos", imdbRating: "0" }];
                    let topRecaudacion = peliculasRecaudacion.length > 0 ? peliculasRecaudacion.slice(0, 5) : [{ Title: "Sin datos", BoxOffice: "0" }];
                    let topVotos = peliculasVotos.length > 0 ? peliculasVotos.slice(0, 5) : [{ Title: "Sin datos", imdbVotes: "0" }];

                    listaInforme.innerHTML = "<h3>Películas mejor valoradas:</h3>";
                    topValoracion.forEach((obj) => {
                        listaInforme.innerHTML += `<li>${obj.Title} - Valoración: ${obj.imdbRating}</li>`;
                    });

                    listaInforme.innerHTML += "<h3>Películas que más han recaudado:</h3>";
                    topRecaudacion.forEach((obj) => {
                        listaInforme.innerHTML += `<li>${obj.Title} - Recaudación: ${obj.BoxOffice}</li>`;
                    });

                    listaInforme.innerHTML += "<h3>Películas más votadas:</h3>";
                    topVotos.forEach((obj) => {
                        listaInforme.innerHTML += `<li>${obj.Title} - Votos: ${obj.imdbVotes}</li>`;
                    });

                    vistaInforme.style.display = "flex";

                    let TitulosRating = topValoracion.map((obj) => obj.Title);
                    let idRating = topValoracion.map((obj) => obj.imdbRating !== "0" ? parseFloat(obj.imdbRating) : 0);
                    generarGrafica(TitulosRating, idRating, "Películas mejor valoradas", "IMDb Rating", "graficaRating");

                    let TitulosRecaudacion = topRecaudacion.map((obj) => obj.Title);
                    let idRecaudacion = topRecaudacion.map((obj) => obj.BoxOffice !== "0" ? parseInt(obj.BoxOffice.replace(/\D/g, "")) : 0);
                    generarGrafica(TitulosRecaudacion, idRecaudacion, "Películas que más han recaudado", "Recaudación ($)", "graficaRecaudacion");

                    let TitulosVotos = topVotos.map((obj) => obj.Title);
                    let idVotos = topVotos.map((obj) => obj.imdbVotes !== "0" ? parseInt(obj.imdbVotes.replace(/,/g, "")) : 0);
                    generarGrafica(TitulosVotos, idVotos, "Películas más votadas", "Número de Votos", "graficaVotos");
                }
            })
            .catch((err) => console.log("error:", err));
    });
}

function generarGrafica(labels, data, title, yTitle, divId) {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(() => {
        let datosGrafica = [["Película", yTitle]];
        labels.forEach((label, index) => datosGrafica.push([label, data[index]]));

        let dataTable = google.visualization.arrayToDataTable(datosGrafica);

        let options = {
            title: title,
            hAxis: { title: "Películas", minValue: 0 },
            vAxis: { title: yTitle, minValue: 0 },
            legend: "none",
        };

        let chart = new google.visualization.ColumnChart(document.getElementById(divId));
        chart.draw(dataTable, options);
    });
}

