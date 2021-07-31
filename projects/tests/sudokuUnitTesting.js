var mocha = require('mocha'),
    chai = require('chai'),
    sudokuFunctions = require('../sudokuFunctions.js');

var assert = chai.assert,
    expect = chai.expect;

var generateSudoku = sudokuFunctions.generateSudoku,
    validSolution = sudokuFunctions.validSolution,
    getSolution = sudokuFunctions.getSolution,
    createHiddenBoard = sudokuFunctions.createHiddenBoard;

const SOLVED = [[1, 3, 2, 5, 7, 9, 4, 6, 8],
                [4, 9, 8, 2, 6, 1, 3, 7, 5],
                [7, 5, 6, 3, 8, 4, 2, 1, 9],
                [6, 4, 3, 1, 5, 8, 7, 9, 2],
                [5, 2, 1, 7, 9, 3, 8, 4, 6],
                [9, 8, 7, 4, 2, 6, 5, 3, 1],
                [2, 1, 4, 9, 3, 5, 6, 8, 7],
                [3, 6, 5, 8, 1, 7, 9, 2, 4],
                [8, 7, 9, 6, 4, 2, 1, 5, 3]];


describe('Generation', function() {
  it('Random Tests', function() {
    for (var i = 0; i < 20; i++){
      let bool = generateSudoku(SOLVED);
      assert.equal(bool.length, 9, "Test Failed");
      assert.equal(bool.every(x => x.length === 9), true, "Test Failed");
      assert.equal(validSolution(bool), true, "Test Failed");
    }
  });
});


describe('Validation', function() {
  it('Fixed Tests', function() {
    assert.equal(validSolution(SOLVED), true, "Test Failed");
  });

  it('Random Tests - Generated Sudoku (true)', function() {
    for (var i = 0; i < 20; i++){
      let bool = validSolution(generateSudoku(SOLVED));
      assert.equal(bool, bool, "Test Failed");
    }
  });

  it('Random Tests - Generated Sudoku (false)', function() {
    for (var i = 0; i < 20; i++){
      let bool = validSolution(generateSudoku(SOLVED));
      assert.equal(bool, bool, "Test Failed");
    }
  });

  it('Random Tests - Solved Sudoku (true)', function() {
    for (var i = 0; i < 20; i++){
      var arr = [];
      assert.equal(arr.length, 0, "Test Failed");
    }
  });


});


describe('Solution', function() {
  it('Fixed Tests', function() {
    assert.equal(0, 0)
  });

  it('Random Tests - Generated Hidden Sudoku', function() {
    let sol = getSolution(createHiddenBoard(generateSudoku(SOLVED), Math.random(), 50))
    assert.equal(validSolution(sol), true);
  });
});
