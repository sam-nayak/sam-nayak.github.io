const HIGHLIGHT_COLOUR = "#ADD8E6",
      FIXED_NUMBER_COLOUR = "#DDDDDD",
      DIFFICULTIES = {
        "Easy": [0.5, 5000],
        "Medium": [0.40, 4000],
        "Hard": [0.35, 3000]
      },
      TO_NUM = {
        'K': 11, 'Y': 25, 'H': 8, 'E': 5, 'B': 2, 'X': 24, 'P': 16, 'W': 23, 'N': 14, 'I': 9,
        'J': 10, 'U': 21, 'A': 1, 'Q': 17, 'T': 20, 'V': 22, 'C': 3, 'M': 13, 'Z': 26,
        'F': 6, 'L': 12, 'G': 7, 'R': 18, 'S': 19, 'O': 15, 'D': 4
      },
      TO_CHAR = {
        1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E', 6: 'F', 7: 'G', 8: 'H', 9: 'I', 10: 'J', 11: 'K', 12: 'L',
        13: 'M', 14: 'N', 15: 'O', 16: 'P', 17: 'Q', 18: 'R', 19: 'S', 20: 'T', 21: 'U', 22: 'V', 23: 'W',
        24: 'X', 25: 'Y', 26: 'Z'
      },
      SOLVED = {
        3 : [[1, 3, 2, 5, 7, 9, 4, 6, 8],
             [4, 9, 8, 2, 6, 1, 3, 7, 5],
             [7, 5, 6, 3, 8, 4, 2, 1, 9],
             [6, 4, 3, 1, 5, 8, 7, 9, 2],
             [5, 2, 1, 7, 9, 3, 8, 4, 6],
             [9, 8, 7, 4, 2, 6, 5, 3, 1],
             [2, 1, 4, 9, 3, 5, 6, 8, 7],
             [3, 6, 5, 8, 1, 7, 9, 2, 4],
             [8, 7, 9, 6, 4, 2, 1, 5, 3]],

        4 : [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
             [9, 10, 11, 12, 1, 2, 3, 4, 13, 14, 15, 16, 5, 6, 7, 8],
             [5, 6, 7, 8, 13, 14, 15, 16, 1, 2, 3, 4, 9, 10, 11, 12],
             [13, 14, 15, 16, 9, 10, 11, 12, 5, 6, 7, 8, 1, 2, 3, 4],
             [3, 1, 4, 2, 7, 5, 8, 6, 11, 9, 14, 10, 15, 12, 16, 13],
             [11, 9, 14, 10, 3, 1, 4, 2, 15, 12, 16, 13, 7, 5, 8, 6],
             [7, 5, 8, 6, 15, 12, 16, 13, 3, 1, 4, 2, 11, 9, 14, 10],
             [15, 12, 16, 13, 11, 9, 14, 10, 7, 5, 8, 6, 3, 1, 4, 2],
             [2, 4, 1, 3, 6, 8, 5, 7, 10, 15, 9, 11, 12, 16, 13, 14],
             [10, 15, 9, 11, 2, 4, 1, 3, 12, 16, 13, 14, 6, 8, 5, 7],
             [6, 8, 5, 7, 12, 16, 13, 14, 2, 4, 1, 3, 10, 15, 9, 11],
             [12, 16, 13, 14, 10, 15, 9, 11, 6, 8, 5, 7, 2, 4, 1, 3],
             [4, 3, 2, 1, 8, 7, 6, 5, 14, 11, 10, 9, 16, 13, 12, 15],
             [14, 11, 10, 9, 4, 3, 2, 1, 16, 13, 12, 15, 8, 7, 6, 5],
             [8, 7, 6, 5, 16, 13, 12, 15, 4, 3, 2, 1, 14, 11, 10, 9],
             [16, 13, 12, 15, 14, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]],

        5 : [[17, 19, 1, 11, 15, 8, 24, 5, 16, 9, 4, 20, 22, 7, 21, 13, 6, 23, 12, 10, 2, 18, 25, 3, 14],
            [4, 9, 14, 13, 8, 6, 21, 18, 17, 12, 1, 2, 3, 16, 15, 24, 25, 7, 5, 19, 11, 10, 22, 23, 20],
            [24, 25, 7, 21, 12, 4, 1, 2, 20, 3, 13, 5, 23, 10, 11, 9, 22, 8, 18, 14, 15, 19, 16, 6, 17],
            [16, 3, 23, 2, 5, 19, 13, 14, 22, 10, 6, 17, 18, 24, 25, 11, 20, 15, 4, 21, 12, 1, 7, 9, 8],
            [20, 10, 18, 22, 6, 15, 25, 23, 11, 7, 12, 9, 8, 19, 14, 17, 1, 3, 16, 2, 4, 24, 21, 13, 5],
            [19, 6, 20, 5, 25, 18, 2, 16, 15, 21, 17, 8, 7, 9, 23, 4, 12, 10, 14, 1, 24, 3, 11, 22, 13],
            [11, 13, 3, 17, 10, 22, 20, 12, 9, 23, 25, 15, 24, 6, 5, 8, 2, 18, 19, 16, 21, 4, 1, 14, 7],
            [15, 24, 9, 18, 21, 10, 7, 3, 4, 5, 14, 1, 11, 2, 16, 20, 13, 17, 23, 22, 6, 25, 19, 8, 12],
            [14, 7, 16, 12, 2, 1, 17, 19, 6, 8, 21, 22, 4, 18, 13, 3, 24, 25, 15, 11, 10, 20, 23, 5, 9],
            [8, 23, 22, 1, 4, 24, 11, 25, 13, 14, 3, 12, 10, 20, 19, 5, 9, 21, 7, 6, 18, 16, 2, 17, 15],
            [12, 1, 5, 10, 24, 2, 3, 21, 14, 11, 15, 25, 6, 22, 17, 16, 8, 9, 13, 4, 20, 23, 18, 7, 19],
            [23, 21, 2, 3, 17, 13, 12, 10, 7, 4, 8, 18, 19, 5, 9, 25, 15, 1, 20, 24, 22, 14, 6, 16, 11],
            [18, 8, 11, 20, 14, 16, 9, 17, 25, 1, 24, 21, 12, 4, 7, 6, 19, 22, 2, 23, 13, 5, 15, 10, 3],
            [6, 22, 25, 19, 13, 5, 8, 20, 18, 15, 23, 3, 16, 1, 2, 21, 11, 14, 10, 7, 9, 17, 12, 4, 24],
            [9, 16, 4, 15, 7, 23, 6, 22, 24, 19, 10, 11, 13, 14, 20, 18, 17, 5, 3, 12, 25, 21, 8, 2, 1],
            [7, 2, 13, 9, 20, 17, 16, 11, 21, 22, 18, 24, 14, 23, 1, 15, 3, 6, 25, 5, 8, 12, 10, 19, 4],
            [22, 18, 19, 24, 16, 3, 4, 8, 12, 25, 5, 13, 17, 15, 6, 10, 7, 11, 1, 9, 14, 2, 20, 21, 23],
            [5, 12, 6, 4, 1, 20, 18, 15, 23, 24, 16, 10, 2, 21, 3, 22, 14, 19, 8, 13, 7, 9, 17, 11, 25],
            [25, 17, 8, 14, 3, 7, 10, 13, 1, 2, 20, 19, 9, 11, 22, 12, 23, 4, 21, 18, 16, 15, 5, 24, 6],
            [10, 15, 21, 23, 11, 14, 19, 9, 5, 6, 7, 4, 25, 12, 8, 2, 16, 24, 17, 20, 1, 13, 3, 18, 22],
            [3, 11, 24, 7, 18, 9, 23, 1, 8, 13, 19, 16, 21, 17, 12, 14, 10, 20, 22, 25, 5, 6, 4, 15, 2],
            [13, 14, 15, 25, 19, 21, 22, 4, 10, 18, 2, 6, 1, 3, 24, 23, 5, 12, 11, 8, 17, 7, 9, 20, 16],
            [2, 4, 17, 16, 9, 11, 15, 7, 19, 20, 22, 14, 5, 25, 10, 1, 18, 13, 6, 3, 23, 8, 24, 12, 21],
            [21, 20, 12, 8, 22, 25, 5, 6, 3, 16, 9, 23, 15, 13, 18, 7, 4, 2, 24, 17, 19, 11, 14, 1, 10],
            [1, 5, 10, 6, 23, 12, 14, 24, 2, 17, 11, 7, 20, 8, 4, 19, 21, 16, 9, 15, 3, 22, 13, 25, 18]]
      }


var seconds = 0, minutes = 0, hours = 0, totalTime = 0, timeLoop,
    isRevealed = false,
    isGenerated = false,
    currentObj, previousObj,
    type,
    SOLVED_SUDOKU = SOLVED[3];

if (typeof(Storage) !== "undefined") {
  var correctSolutions = localStorage.correctSolutions ? +localStorage.correctSolutions : 0,
      attempts = localStorage.attempts ? +localStorage.attempts : 0,
      givenUp = localStorage.givenUp ? +localStorage.givenUp : 0,
      shortestTime = localStorage.shortestTime ? +localStorage.shortestTime : null;
}


function createHiddenBoard(final, difficulty, difficultyLimit){
  var revealedCount = 0;
  var hidden = [];

  for (var i = 0; i < BOARD_SIZE; i++){
    var temp = [];
    for (var j = 0; j < BOARD_SIZE; j++){
      if (Math.random() <= difficulty && revealedCount <= difficultyLimit){
        revealedCount++;
        temp.push(final[i][j]);
      }
      else {
        temp.push(0);
      }
    }
    hidden.push(temp);
  }
  return hidden;
}

function validSolution(board){
  const isDuplicate = board => {
    return board.every(x => new Set(x).size == BOARD_SIZE);
  };

  const validateColumns = board => {
    var column = [];
    for (var i = 0; i < BOARD_SIZE; i++){
      var temp = [];
      for (var j = 0; j < BOARD_SIZE; j++){
        let cur = board[j][i];
        if (cur === 0) return false;
        temp.push(cur);
      }
      column.push(temp);
    }
    return isDuplicate(column);
  };

  const validateBoxes = board => {
    var sudoku = [];
    for (var i = 0; i < BOARD_SIZE; i += BOX_SIZE){
      for (var j = 0; j < BOARD_SIZE; j += BOX_SIZE){
        var nums = [];
        for (var _ = 0; _ < BOX_SIZE; _++){
          nums.push(...board[i+_].slice(j, j+BOX_SIZE));
        }
        sudoku.push(nums);
      }
    }
    return isDuplicate(sudoku);
  };

  return isDuplicate(board) && validateColumns(board) && validateBoxes(board);
}

function getSolution(sudoku) {
  const checkRow = (sudoku, row, value) => {
    for (var i = 0; i < BOARD_SIZE; i++){
      if (sudoku[row][i] == value)
        return false;
    }
    return true;
  }

  const checkColumn = (sudoku, col, value) => {
    for (var j = 0; j < BOARD_SIZE; j++){
      if (sudoku[j][col] == value)
        return false;
    }
    return true;
  }

  const checkBox = (sudoku, row, col, value) => {
    const colDifference = (col - col % BOX_SIZE),
          rowDifference = (row - row % BOX_SIZE);

    for (var i = 0; i < BOX_SIZE; i++){
      for (var j = 0; j < BOX_SIZE; j++){
        if (sudoku[rowDifference+i][colDifference+j] == value)
          return false;
      }
    }
    return true;
  }

  const sudokuSolver = (sudoku, row=0, column=0) => {
    if (row == BOARD_SIZE) {
      row = 0;
      if (++column == BOARD_SIZE)
        return true;
    }

    if (sudoku[row][column] > 0)
      return sudokuSolver(sudoku, row+1, column);

    for (var n = 1; n <= BOARD_SIZE; n++) {
      const isCorrect = checkRow(sudoku, row, n)
                     && checkColumn(sudoku, column, n)
                     && checkBox(sudoku, row, column, n);

      if (isCorrect) {
        sudoku[row][column] = n;
        if (sudokuSolver(sudoku, row+1, column))
          return true;
      }
    }
    sudoku[row][column] = 0;
    return false;
  }


  return sudokuSolver(sudoku) ? sudoku : null;
}

function generateSudoku(matrix
){
	for (var i = 0; i < BOARD_SIZE; i += BOX_SIZE){
		for (let _ = 0; _ < BOX_SIZE; _++){
			let row1 = Math.floor(Math.random()*BOX_SIZE),
			    row2 = Math.floor(Math.random()*BOX_SIZE),
          col1 = Math.floor(Math.random()*BOX_SIZE),
			    col2 = Math.floor(Math.random()*BOX_SIZE);

			while (row1 == row2)
				row2 = Math.floor(Math.random()*BOX_SIZE);

      while (col1 == col2)
				col2 = Math.floor(Math.random()*BOX_SIZE);

			row1 += i;
			row2 += i;
      col1 += i;
			col2 += i;

      let temp = matrix[row1];
			matrix[row1] = matrix[row2];
			matrix[row2] = temp;

			temp = [];
			for (let x = 0; x < BOARD_SIZE; x++){
				let tempValue = matrix[x][col1];
				matrix[x][col1] = matrix[x][col2];
				matrix[x][col2] = tempValue;
			}
		}
	}
  return matrix;
}
