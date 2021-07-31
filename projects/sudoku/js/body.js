function showStatistics(){
  alert(`Statistics\n------------\n\n`
      + `Attempts: ${attempts}\n`
      + `Correct Solutions: ${correctSolutions}\n`
      + `Given Up: ${givenUp}\n`
      + `Shortest Time: ${shortestTime}`
    );
}

function showRules(){
  alert(`Rules\n-------\n\n`
      + `1. No duplicates of the numbers 1-9 horizontally\n`
      + `2. No duplicates of the numbers 1-9 vertically\n`
      + `3. No duplicates of the numbers 1-9 in the 3x3 cell groups`
    );
}


function createSudoku(board, isReset=false){
  const getDifficulty = document.getElementsByName("difficulty-setting");

  for (var i = 0; i < getDifficulty.length; i++){
    if (getDifficulty[i].checked)
      var [difficulty, limit] = DIFFICULTIES[getDifficulty[i].id];
  }
  var hidden = createHiddenBoard(board, difficulty, limit);

  for (var i = 1; i <= BOARD_SIZE; i++){
    for (var j = 1; j <= BOARD_SIZE; j++){
      var element = document.getElementById(i+"x"+j);

      if (isReset){
        if (board[i-1][j-1] === 0){
          element.innerHTML = "";
          element.style.backgroundColor = "";
          element.onclick = initialise;
        }
        else{
          let temp;
          if (type == "numbers")
            temp = board[i-1][j-1];
          else if (type == "letters")
            temp = TO_CHAR[board[i-1][j-1]];

          element.innerHTML = temp;
          element.style.backgroundColor = FIXED_NUMBER_COLOUR;
          element.onclick = null;
        }
        continue;
      }

      if (hidden[i-1][j-1] !== 0){
        let temp;
        if (type == "numbers")
          temp = board[i-1][j-1];
        else if (type == "letters")
          temp = TO_CHAR[board[i-1][j-1]];

        element.innerHTML = temp;
        element.style.backgroundColor = FIXED_NUMBER_COLOUR;
        element.onclick = null;
      }
      else{
        element.innerHTML = "";
        element.style.backgroundColor = "";
        element.onclick = initialise;
      }
    }
  }
  return hidden;
}


function revealNumbers(hiddenBoard, finalBoard){
  for (var i = 1; i <= BOARD_SIZE; i++){
    for (var j = 1; j <= BOARD_SIZE; j++){
      var element = document.getElementById(i+"x"+j);
      let temp;
      if (type == "numbers")
        temp = finalBoard[i-1][j-1];
      else if (type == "letters")
        temp = TO_CHAR[finalBoard[i-1][j-1]];

      element.innerHTML = temp;

      if (hiddenBoard[i-1][j-1] !== 0)
        element.style.backgroundColor = FIXED_NUMBER_COLOUR;
      else
        element.style.backgroundColor = "";
    }
  }
  isRevealed = true;
}


function initialise(e){
  currentObj = this;

  if (previousObj && previousObj.style.backgroundColor == "rgb(221, 221, 221)")
    previousObj = currentObj;

  currentObj.style.backgroundColor = HIGHLIGHT_COLOUR;

  if (previousObj === undefined)
    previousObj = currentObj;
  else
    previousObj.style.backgroundColor = "";

  if (previousObj.id == currentObj.id)
    currentObj.style.backgroundColor = HIGHLIGHT_COLOUR;

  previousObj = currentObj;

	document.documentElement.onkeydown = insertNumber;

}

function insertNumber(e){
  if (isRevealed) return false;
  if (!currentObj || currentObj.style.backgroundColor == "rgb(221, 221, 221)") return false;
  currentObj.style.backgroundColor = HIGHLIGHT_COLOUR;

  if (e.keyCode)
    code = e.keyCode;
  else if (e.which){
    code = e.which;
  }

  if (code == 8 || code == 46)
    currentObj.innerHTML = ""

  if (code == 27){
    currentObj.style.backgroundColor = "";
    currentObj = null;
    return false;
  }
  var idSplit = currentObj.id.split("x"),
      i = +idSplit[0], j = +idSplit[1],
      nextObj;


  if (code == 39 || (code == 68 && type == "numbers")){     // Right
    nextObj = document.getElementById(`${i}x${j + 1}`);
    if (j <= BOARD_SIZE){
	    while (j <= BOARD_SIZE && nextObj && nextObj.style.backgroundColor)
		    nextObj = document.getElementById(`${i}x${++j}`);
    }
  }
  else if (code == 37 || (code == 65 && type == "numbers")){ // Left
    nextObj = document.getElementById(`${i}x${j - 1}`);
    if (j >= 1){
      while (j >= 1 && nextObj && nextObj.style.backgroundColor)
        nextObj = document.getElementById(`${i}x${--j}`);
    }
  }
  else if (code == 40 || (code == 83 && type == "numbers")){  // Down
    nextObj = document.getElementById(`${i + 1}x${j}`);
    if (i <= BOARD_SIZE){
      while (i <= BOARD_SIZE && nextObj && nextObj.style.backgroundColor)
        nextObj = document.getElementById(`${++i}x${j}`);
    }
  }
  else if (code == 38 || (code == 87 && type == "numbers")){ // Up
    nextObj = document.getElementById(`${i - 1}x${j}`);
    if (i >= 1){
      while (i >= 1 && nextObj && nextObj.style.backgroundColor)
        nextObj = document.getElementById(`${--i}x${j}`);
    }
  }

  if (nextObj){
    currentObj = nextObj;
    currentObj.style.backgroundColor = HIGHLIGHT_COLOUR;
    previousObj.style.backgroundColor = "";
    previousObj = currentObj;
  }

  var theChar = String.fromCharCode(code);

  if (type === "numbers"){
    if (code >= 49 && code <= 57)  //57
      currentObj.innerHTML = theChar;
    else if (code >= 97 && code <= 105)  // 105
      currentObj.innerHTML = String.fromCharCode(code - 48);
  }
  else if (type == "letters"){
    if (/[a-y]/i.test(theChar))
      currentObj.innerHTML = theChar.toUpperCase();
  }
}


function getSudoku(){
  var matrix = [],
      temp = [],
      boxes = document.getElementsByTagName("td");

  for (var i = 0; i < boxes.length; i++){
    let inner;
    if (type == "numbers")
      inner = +boxes[i].innerHTML;
    else if (type == "letters")
      inner = TO_NUM[boxes[i].innerHTML] || 0;

    temp.push(inner);
    if (i % BOARD_SIZE == BOARD_SIZE - 1){
      matrix.push(temp);
      temp = [];
    }
  }
  return matrix;
}

const getDisplay = time => time > 9 ? time : "0" + time;

function add() {
  seconds++;
  totalTime++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
  }

  displayTimer.innerHTML = (hours ? getDisplay(hours) : "00")
                         + ":" + (minutes ? getDisplay(minutes) : "00")
                         + ":" + getDisplay(seconds);
  timer();
}

function timer() {
  timeLoop = setTimeout(add, 1000);
}

function resetClock(){
  if (!isGenerated) return false;
  document.getElementById("displayTime").innerHTML = "00:00:00";
  seconds = 0, minutes = 0, hours = 0, totalTime = 0;
}

function endGame(){
  var squareElement = document.getElementsByTagName("td");
  for (var i = 0; i < squareElement.length; i++)
    squareElement[i].onclick = null;
  currentObj = null;
}


function newGame(){
  isGenerated = true;
  hasGivenUp = false;
  isRevealed = false;
  totalTime = 0;

  if (!sizeCheck()) return false;
  resetClock();
  clearTimeout(timeLoop);

  var squareElement = document.getElementsByTagName("td"),
      getGen = document.getElementsByName("generation-algorithm");
      typeOption = document.getElementsByName("inputType");

  for (var i = 0; i < 2; i++){
    if (typeOption[i].checked)
      type = typeOption[i].id;
  }

  if (getGen[0].checked){
    finalBoard = generateSudoku(SOLVED_SUDOKU);
  }
  if (getGen[1].checked){
    for (var i = 0; i < squareElement.length; i++){
      squareElement[i].onclick = initialise;
      squareElement[i].innerHTML = "";
      squareElement[i].style.backgroundColor = "";
    }
    return false;
  }
  localStorage.attempts = ++attempts;
  timer();

  hiddenBoard = createSudoku(finalBoard);
}

function validate(){
  if (isRevealed) return false;
  if (!isGenerated) return false;

  const isCompleted = validSolution(getSudoku());

  if (isCompleted){
    clearTimeout(timeLoop);
    alert("That's right. Well done!");
    if (document.getElementsByName("generation-algorithm")[0].checked){
      localStorage.correctSolutions = ++correctSolutions;

      if (!shortestTime || totalTime < shortestTime){
        shorestTime = totalTime;
        localStorage.shortestTime = totalTime;
      }
    }
    endGame();

  }
  else{
    alert("That's wrong. Try again.");
  }
}

function restart(){
  if (!isGenerated) return false;

  if (document.getElementsByName("generation-algorithm")[1].checked && isRevealed){
    isRevealed = false;
    createSudoku(hiddenBoard, true);
    resetClock();
  }

  if (document.getElementsByName("generation-algorithm")[1].checked){
    hiddenBoard = getSudoku();
  }

  if (isRevealed) return false;
  createSudoku(hiddenBoard, true);
  resetClock();
}

function showSolution(){
  if (!isGenerated) return false;
  if (document.getElementsByName("generation-algorithm")[1].checked && BOARD_SIZE !== 9)
    return false;

  if (document.getElementsByName("generation-algorithm")[1].checked){
    hiddenBoard = getSudoku();
    var hiddenCustomBoard = getSudoku(),
        finalCustomBoard = getSolution(hiddenCustomBoard);

    revealNumbers(hiddenBoard, finalCustomBoard);
  }
  else {
    localStorage.givenUp = ++givenUp;
    clearTimeout(timeLoop);
    revealNumbers(hiddenBoard, finalBoard);
  }
  endGame();
}
