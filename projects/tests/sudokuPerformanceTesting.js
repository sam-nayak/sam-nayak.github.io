
const checkRow = (sudoku, row, value) => {
  return !sudoku[row].includes(value);
}

const checkRow2 = (sudoku, row, value) => {
  for (var i = 0; i < 9; i++){
    if (sudoku[row][i] == value)
      return false;
  }
  return true;
}


const SOLVED_SUDOKU = [[1, 3, 2, 5, 7, 9, 4, 6, 8],
                 [4, 9, 8, 2, 6, 1, 3, 7, 5],
                 [7, 5, 6, 3, 8, 4, 2, 1, 9],
                 [6, 4, 3, 1, 5, 8, 7, 9, 2],
                 [5, 2, 1, 7, 9, 3, 8, 4, 6],
                 [9, 8, 7, 4, 2, 6, 5, 3, 1],
                 [2, 1, 4, 9, 3, 5, 6, 8, 7],
                 [3, 6, 5, 8, 1, 7, 9, 2, 4],
                 [8, 7, 9, 6, 4, 2, 1, 5, 3]];


const iterations = 1000000;
var functionCount = 0;

console.time(`Function ${++functionCount}`);
for(var i = 0; i < iterations; i++ ){
    checkRow(SOLVED_SUDOKU, 0, 5);
};
console.timeEnd(`Function ${functionCount}`)


console.time(`Function ${++functionCount}`)
for(var i = 0; i < iterations; i++ ){
    checkRow2(SOLVED_SUDOKU, 0, 5);
};
console.timeEnd(`Function ${functionCount}`)
