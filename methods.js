class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Cell {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.mine = false;
    this.num = "0";
    this.show = false;
    this.flag = false;
  }
}

function make2DArray(cols, rows) {
  let array = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      array[i] = [];
      array[i][j] = null;
    }
  }
  return array;
}

function countNeighbours(x, y) {
  let mines = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (x + i < 0 || y + j < 0 || x + i > 19 || y + j > 19) {
        continue;
      }
      if (board[x + i][y + j].mine) {
        mines++;
      }
    }
  }
  return mines;
}

function addNums() {
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      if (board[i][j].mine) {
        continue;
      }
      board[i][j].num = "" + countNeighbours(i, j);
    }
  }
}

function chooseMines(num) {
  for (let i = 0; i < num; i++) {
    let x = floor(random(0, 19.9));
    let y = floor(random(0, 19.9));
    if (board[x][y].mine) {
      i--;
      continue;
    } else {
      board[x][y].mine = true;
    }
  }
}

function drawBoard() {
  let gap = width / 20;
  textSize(32);
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      if (board[i][j].num != "0" && board[i][j].show) {
        fill(0);
        text(board[i][j].num, board[i][j].pos.x + 6.5, board[i][j].pos.y - 3.5);
      }
      if (!board[i][j].show) {
        fill(172, 174, 169);
        rect(board[i][j].pos.x, board[i][j].pos.y - gap, gap, gap);
      }
      if (board[i][j].flag) {
        image(flagIMG, board[i][j].pos.x, board[i][j].pos.y - gap, gap, gap);
      }
      if (board[i][j].mine && board[i][j].show) {
        fill(234, 235, 230);
        ellipse(
          board[i][j].pos.x + gap / 2,
          board[i][j].pos.y - gap / 2,
          20,
          20
        );
      }
    }
  }
  for (let i = 0; i < 20; i++) {
    line(i * gap, 0, i * gap, height);
    line(0, i * gap, width, i * gap);
  }
}

function flag(x, y) {
  let gap = width / 20;
  let currentPos;
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      currentPos = board[i][j];
      if (
        currentPos.pos.x < x &&
        currentPos.pos.x + gap > x &&
        currentPos.pos.y - gap < y &&
        currentPos.pos.y > y &&
        !currentPos.show
      ) {
        board[i][j].flag = !board[i][j].flag;
        return;
      }
    }
  }
}

function explode(x, y) {
  if (x < 0 || y < 0 || x > 19 || y > 19) {
    return;
  }
  if (board[x][y].num == "0" && !board[x][y].show) {
    board[x][y].show = true;
    explode(x + 1, y);
    explode(x - 1, y);
    explode(x, y - 1);
    explode(x, y + 1);
  } else if (board[x][y].num != "0" && !board[x][y].show) {
    board[x][y].show = true;
    return;
  }
}

function reveal(x, y) {
  let gap = width / 20;
  let currentPos;
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      currentPos = board[i][j];
      if (
        currentPos.pos.x < x &&
        currentPos.pos.x + gap > x &&
        currentPos.pos.y - gap < y &&
        currentPos.pos.y > y &&
        !currentPos.flag &&
        !currentPos.mine
      ) {
        if (board[i][j].num == "0") {
          explode(i, j);
        } else {
          board[i][j].show = true;
        }
        return;
      }
      if (
        currentPos.pos.x < x &&
        currentPos.pos.x + gap > x &&
        currentPos.pos.y - gap < y &&
        currentPos.pos.y > y &&
        !currentPos.flag &&
        currentPos.mine
      ) {
        board[i][j].show = true;
        gameOver = true;
      }
    }
  }
}
