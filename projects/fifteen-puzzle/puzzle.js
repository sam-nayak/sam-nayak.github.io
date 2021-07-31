var moves = 0,
    height = 4, width = 4,
    currentObj,
    puzzle;

const SIZE_MAX = 150,
      SIZE_MIN = 10,
      BOARD_MAX = 100,
      BOARD_MIN = 1;

function generateBoard() {
  if (!sizeCheck()) return false;

  var table = document.getElementById("puzzleBoardDiv");
  table.removeChild(document.getElementById("puzzleBoardTable"));

  var tableCreation = document.createElement("table");
  tableCreation.id = "puzzleBoardTable";

  var tableBody = document.createElement("tbody");

  for (var i = 0; i < height; i++){
    var tr = document.createElement("tr");
    tableBody.appendChild(tr);

    for (var j = 0; j < width; j++){
      var td = document.createElement("td");
      td.id = `${i}x${j}`;
      td.style.height = document.getElementById("boxHeight").value + "px";
      td.style.width = document.getElementById("boxWidth").value + "px";
      tr.appendChild(td);
    }
  }
  tableCreation.appendChild(tableBody);
  table.appendChild(tableCreation);
  generatePuzzle(height, width);
}

function generatePuzzle(height=4, width=4){
  moves = 0;
  document.getElementById("moves-output").innerHTML = `Moves: ${moves}`;
  var length = height * width,
      values = [...Array(length-1)].map((x, y) => y+1).concat(null);

  const shuffleArray = array => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }

  shuffleArray(values);
  puzzle = [];

  for (var i = 0; i < height; i++){
    let currentRow = [];
    for (var j = 0; j < width; j++){
      let cur = values.pop();
      let element = document.getElementById(`${i}x${j}`);

      currentRow.push(cur);
      element.innerHTML = cur;

      if (cur === null){
        currentObj = element;
      }

    }
    puzzle.push(currentRow);
  }
  document.documentElement.onkeydown = moveBoard;
}

function moveBoard(e){
  if (!sizeCheck()) return;
  if (e.keyCode)
    var code = e.keyCode;
  else if (e.which)
    var code = e.which;

  var idSplit = currentObj.id.split("x"),
      i = +idSplit[0], j = +idSplit[1];

  if (code == 37 || code == 65){ // Left
    if (j < width-1){
      puzzle[i][j] = puzzle[i][j+1]
      puzzle[i][j+1] = null;
      document.getElementById(`${i}x${j}`).innerHTML = puzzle[i][j];
      currentObj = document.getElementById(`${i}x${++j}`);
      moves++;
    }
  }
  else if (code == 39 || code == 68){     // Right
    if (j >= 1){
      puzzle[i][j] = puzzle[i][j-1]
      puzzle[i][j-1] = null;
      document.getElementById(`${i}x${j}`).innerHTML = puzzle[i][j];
      currentObj = document.getElementById(`${i}x${--j}`);
      moves++;
    }
  }
  else if (code == 38 || code == 87){ // Up
    if (i < height-1){
      puzzle[i][j] = puzzle[i+1][j]
      puzzle[i+1][j] = null;
      document.getElementById(`${i}x${j}`).innerHTML = puzzle[i][j];
      currentObj = document.getElementById(`${++i}x${j}`);
      moves++;
    }
  }
  else if (code == 40 || code == 83){  // Down
    if (i >= 1){
      puzzle[i][j] = puzzle[i-1][j]
      puzzle[i-1][j] = null;
      document.getElementById(`${i}x${j}`).innerHTML = puzzle[i][j];
      currentObj = document.getElementById(`${--i}x${j}`);
      moves++;
    }
  }
  currentObj.innerHTML = puzzle[i][j];
  document.getElementById("moves-output").innerHTML = `Moves: ${moves}`;
}

function sizeCheck(){
  height = +document.getElementById("inputHeight").value;
  width = +document.getElementById("inputWidth").value;
  return height >= BOARD_MIN && height <= BOARD_MAX
          && width >= BOARD_MIN && width <= BOARD_MAX;
}

generatePuzzle(height, width);
