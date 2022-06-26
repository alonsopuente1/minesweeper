const width = 600;
const height = 600;

let board;
let flagIMG;
let gameOver = false;

function preload() {
    flagIMG = loadImage('images/flag.png');
}

function setup() {
    let gap = width / 20;
    createCanvas(width, height);
    board = make2DArray(20, 20);
    for(let i = 0; i < 20; i++) {
        for(let j = 0; j < 20; j++) {
            board[i][j] = new Cell(i * gap, j * gap + gap);
        }
    }
    background(255);
    drawBoard();
    chooseMines(50);
    addNums();
}

function updateBoard() {
    background(255);
    drawBoard();
    if(gameOver) {
        for(let i = 0; i < 20; i++) {
            for(let j = 0; j < 20; j++) {
                board[i][j].show = true;
            }
        }
        drawBoard();
        textSize(91);
        fill('red');
        text("GAME OVER", 20, height / 2);
        return;
    }
}

function mousePressed() {
    if(gameOver) { return; }
    if(mouseButton === RIGHT) {
        flag(mouseX, mouseY);
        console.log("hello");
    }
    else { reveal(mouseX, mouseY); }
    updateBoard();
}
