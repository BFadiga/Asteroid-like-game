// puxar informação do canvas
const canvas = document.getElementById('jogo');
const ctx = canvas.getContext('2d');
ctx.font = "20px Arial";


// Altura máxima e minima do randomizador de spawn do inimigo
const altspawnmin = 30;
const altspawnmax = 370;

// Largura máxima e mínima para parâmetros de randomização 
const xmin = 50;
const xmax = 110;

// Altura máxima e mínima para parâmetros de randomização
const ymin = 75;
const ymax = 90;

// Desenho inicial
// retorno ao início
const x0 = 0;

// Bloco inimigo
let x1 = 0;
// randomização da posição em que o bloco aparece em Y-axis
let y1 = Math.floor(Math.random() * (altspawnmax - altspawnmin + 1) + altspawnmin);

// Posição inicial do player
let x2 = 700;
let y2 = 0;

// Tamanho da nave do player
const x2_largura = 80;
const y2_altura = 80;

// Se true, o jogo para, pois o player entrou em colisão com um meteoro.
let acertou = false;

// variável da velocidade do inimigo
let speed = 3;

// Contagem da pontuação do player, ela se baseia em quantas vezes já se desviou dos asteroides com sucesso
let contagem = 0;

// Imagens que compõem a nave do player
const pmoveup = new Image();
pmoveup.src = '../imagens/op.png'; 

const pmovedown = new Image();
pmovedown.src = '../imagens/down.png'; 

const pmoveleft = new Image();
pmoveleft.src = '../imagens/right.png';

const pmoveright = new Image();
pmoveright.src = '../imagens/left.png'; 

const alien = new Image();
alien.src = `../imagens/skull.png`

// define a imagem base como a do player virado para direita
let playeratual = pmoveright;



// Randomizador da largura e altura do inimigo
let x_tamanho = Math.floor(Math.random() * (xmax - xmin + 1) + xmin);
let y_tamanho = Math.floor(Math.random() * (ymax - ymin + 1) + ymin);


// Tela de gameover
    function gameover(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'red';
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Game Over! Pressione espaço para recomeçar.", canvas.width / 2, canvas.height / 2);
        ctx.font = "20px Arial";
        ctx.textAlign = "left";
    }


// função que define a colisão.
    function colision(){
        if (((x1 + x_tamanho) > x2 && x1 < (x2 + x2_largura)) && ((y1 + y_tamanho) > y2 && y1 < (y2 + y2_altura))){
        acertou = true;
        gameover();
        }
    }

// Função que reseta a posição do inimigo assim que chega no fim da tela, randomizando sua posição no Y-axis, e re-randomizando seu tamanho/altura
    function revamp(){
        x1 = x0;
        y1 = Math.floor(Math.random() * (altspawnmax - altspawnmin + 1) + altspawnmin);
        x_tamanho = Math.floor(Math.random() * (xmax - xmin + 1) + xmin); 
        y_tamanho = Math.floor(Math.random() * (ymax - ymin + 1) + ymin); 
    }

// Gameloop, o centro de todas as coisas
function gameloop(){
    // se o inimigo passa o tamanho do canvas, ativa o revamp, e aumenta a pontuação do player
    if (x1 > canvas.width){
    revamp();
    contagem++;
    accel();
    }    
    // chama o inimigo e player
    square();
    // chama o placar
    pontos();
    // aumenta movimentação do inimigo
    x1 += speed;
    // chama colisão
    colision();
    // chama o "counter" de pontos
    // inicia processo de game-over caso: !acertou.
    if (!acertou) {
        requestAnimationFrame(gameloop);
    }}


    // função que acelera o jogo à cada dez fases, a dificuldade é basicamente impossível na contagem 60.
    function accel(){
        if (contagem == 10){
            speed++;
        }
        else if (contagem == 20){
            speed++;
        } 
        else if (contagem == 30){
            speed++;
        } 
        else if (contagem == 40){
            speed++;
        } 
        else if (contagem == 50){
            speed++;
        } 
        else if (contagem == 60){
            speed++;
        } 
        else if (contagem == 70){
            speed++;
        }
    }


// controles do player
window.onkeydown = pressbutton;
function pressbutton(button){
    if (button.keyCode == 38){
        if (y2 - 25 >= 0) { 
            y2 -= 75;
            playeratual = pmoveup;
        }
    }
    if (button.keyCode == 40){
        if (y2 + 25 <= canvas.height - y2_altura) { 
            y2 += 75;
            playeratual = pmovedown;
        }
    }
    if (button.keyCode == 39){
        if (x2 + 25 <= canvas.width - x2_largura) { 
            x2 += 75;
            playeratual = pmoveleft;
        }
    }
    if (button.keyCode == 37){
        if (x2 - 75 >= 0) { 
            x2 -= 25;
            playeratual = pmoveright;
        }
    }
    if (button.keyCode == 32){
        location.reload(true);
    }
}


// chama o inimigo e o player
function square(){
    ctx.clearRect(0, 0, 800, 400);
    ctx.drawImage(alien, x1, y1, x_tamanho, y_tamanho);
    ctx.drawImage(playeratual, x2, y2, x2_largura, y2_altura);
}

function pontos(){
    // Tentativa em criar uma pontuação que apenas limpe a área em uso (update: FUNCIONOU)
    ctx.clearRect(canvas.width - 160, canvas.height - 40, 150, 30);
    ctx.fillStyle = '#000';
    ctx.fillText(`Pontuação: ${contagem}`, canvas.width - 150, canvas.height - 10);
}

// função que pergunta se pode iniciar o jogo. Caso o player não o queira, deverá confirmar mais uma vez, e será avisado de que o site será fechado
function iniciarjogo(){
    if (confirm(`Gostaria de iniciar o jogo?`)){
        requestAnimationFrame(gameloop);
    }

        else{
            if (confirm(`Isto irá fechar a página, gostaria de confirmar?`)){
            close();
            }
                else{
                    iniciarjogo();
                }
        }
}

iniciarjogo();
