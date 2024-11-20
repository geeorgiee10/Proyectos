
window.onload = () => {
    const svg = document.querySelector('svg');
    let puntuacion1 = document.getElementById("Puntuacion1");
    let puntuacion2 = document.getElementById("Puntuacion2");
    const numBolas = 1;
    const bolas = [];

    const gameArea = document.querySelector('#container');
    let gameAreaWidth = gameArea.offsetWidth;
    let gameAreaHeight = gameArea.offsetHeight;

    svg.setAttribute('width', gameAreaWidth);
    svg.setAttribute('height', gameAreaHeight);

    const rectanguloWidth = 25;
    const rectanguloHeight = 150;
    const velocidadRectangulo = 5;

    let posicionXRectangulo1 = gameAreaWidth * 0.03;
    let posicionXRectangulo2 = gameAreaWidth * 0.95;

    let posicionYRectangulo1 = gameAreaHeight * 0.3;
    let posicionYRectangulo2 = gameAreaHeight * 0.3;

    let puntuacionJugador1 = 0;
    let puntuacionJugador2 = 0;

    let mover1arriba = false;
    let mover1abajo = false;
    let mover2arriba = false;
    let mover2abajo = false;

    class Pelota {
        constructor() {
            for (let i = 0; i < numBolas; i++) {
                const bola = {
                    posX: gameAreaWidth * 0.5,
                    posY: gameAreaHeight * 0.5,
                    radio: 20,
                    velX: (Math.random() > 0.5 ? 1 : -1) * 4,
                    velY: (Math.random() > 0.5 ? 1 : -1) * 4,
                    elemento: null
                };

                const circulo = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circulo.setAttribute('cx', bola.posX);
                circulo.setAttribute('cy', bola.posY);
                circulo.setAttribute('r', bola.radio);
                circulo.setAttribute('class', 'circle');
                svg.appendChild(circulo);
                bola.elemento = circulo;
                bolas.push(bola);
            }
        }
    }

    class Rectangulo {
        constructor(containerId, x, y, width, height, fill) {
            const svg = document.getElementById(containerId);
            this.rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            this.rect.setAttribute('x', x);
            this.rect.setAttribute('y', y);
            this.rect.setAttribute('width', width);
            this.rect.setAttribute('height', height);
            this.rect.setAttribute('fill', fill);
            svg.appendChild(this.rect);
        }
        cambiarPosY(nuevaPosY) {
            this.rect.setAttribute("y", nuevaPosY);
        }
    }

    const rectangulo1 = new Rectangulo('gameArea', posicionXRectangulo1, posicionYRectangulo1, rectanguloWidth, rectanguloHeight, '#00ff99');
    const rectangulo2 = new Rectangulo('gameArea', posicionXRectangulo2, posicionYRectangulo2, rectanguloWidth, rectanguloHeight, '#00ff99');
    const movimiento = new Pelota();

    function detectarColision() {
        for (let bola of bolas) {
            if (bola.posX - bola.radio <= posicionXRectangulo1 + rectanguloWidth && bola.posY >= posicionYRectangulo1
                && bola.posY <= posicionYRectangulo1 + rectanguloHeight) {
                bola.posX = posicionXRectangulo1 + rectanguloWidth + bola.radio;
                bola.velX *= -1;

                bola.velX = bola.velX * 1.1;
                bola.velY = bola.velY * 1.1;
            }
            if (bola.posX + bola.radio >= posicionXRectangulo2 && bola.posY >= posicionYRectangulo2
                && bola.posY <= posicionYRectangulo2 + rectanguloHeight) {
                bola.posX = posicionXRectangulo2 - bola.radio;
                bola.velX *= -1;

                bola.velX = bola.velX * 1.1;
                bola.velY = bola.velY * 1.1;
            }
        }
    }

    function moverRecuadros() {
        if (mover1arriba) {
            posicionYRectangulo1 = Math.max(0, posicionYRectangulo1 - velocidadRectangulo);
        }
        if (mover1abajo) {
            posicionYRectangulo1 = Math.min(gameAreaHeight - rectanguloHeight, posicionYRectangulo1 + velocidadRectangulo);
        }
        if (mover2arriba) {
            posicionYRectangulo2 = Math.max(0, posicionYRectangulo2 - velocidadRectangulo);
        }
        if (mover2abajo) {
            posicionYRectangulo2 = Math.min(gameAreaHeight - rectanguloHeight, posicionYRectangulo2 + velocidadRectangulo);
        }

        rectangulo1.cambiarPosY(posicionYRectangulo1);
        rectangulo2.cambiarPosY(posicionYRectangulo2);
    }

    function moverBolas() {
        for (let bola of bolas) {
            bola.posX += bola.velX;
            bola.posY += bola.velY;

            if (bola.posX + bola.radio >= gameAreaWidth) {
                puntuacionJugador1++;
            }

            if (bola.posX - bola.radio <= 0) {
                puntuacionJugador2++;
            }

            if (bola.posX + bola.radio >= gameAreaWidth || bola.posX - bola.radio <= 0) {
                bola.posX = gameAreaWidth * 0.5;
                bola.posY = gameAreaHeight * 0.5;

                bola.velX = (Math.random() > 0.5 ? 1 : -1) * 4;
                bola.velY = (Math.random() > 0.5 ? 1 : -1) * 4;
            }
            if ((bola.posY + bola.radio) >= gameAreaHeight || (bola.posY - bola.radio) <= 0) {
                bola.velY *= -1;
            }

            bola.elemento.setAttribute('cx', bola.posX);
            bola.elemento.setAttribute('cy', bola.posY);
        }

        puntuacion1.innerHTML = puntuacionJugador1;
        puntuacion2.innerHTML = puntuacionJugador2;
    }

    document.addEventListener("keydown", (e) => {
        if (e.key == "w") {
            mover1arriba = true;
        }
        if (e.key == "s") {
            mover1abajo = true;
        }
        if (e.key == "ArrowUp") {
            mover2arriba = true;
        }
        if (e.key == "ArrowDown") {
            mover2abajo = true;
        }
    });

    document.addEventListener("keyup", (e) => {
        if (e.key == "w") {
            mover1arriba = false;
        }
        if (e.key == "s") {
            mover1abajo = false;
        }
        if (e.key == "ArrowUp") {
            mover2arriba = false;
        }
        if (e.key == "ArrowDown") {
            mover2abajo = false;
        }
    });

    

    

    setInterval(() => {
        moverRecuadros();
        moverBolas();
        detectarColision();
    }, 1000 / 80);
};
