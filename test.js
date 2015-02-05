
// Player can win
// Player cannot select a square that is taken
// Player can only select by number
// The game ends when won or when there are no more squares

var assert = require('assert');

var print = require('./print');
//var newGame = require('./game');
var newBoard = require('./board');

describe('square', function(){
    it('can be updated', function(){
        var board = newBoard();
        assert.equal(board.update(8,'X'), true);
        assert.deepEqual(board.board(), [ '0', '1', '2', '3', '4', '5', '6', '7', 'X' ]);
    });
    it('will not be updated if user puts in a silly answer', function(){
        var board = newBoard();
        assert.equal(board.update(10,'X'), false);
        assert.deepEqual(board.board(), [ '0', '1', '2', '3', '4', '5', '6', '7', '8' ]);
    });
    it('cannot be updated more than once', function(){
        var board = newBoard();
        assert.equal(board.update(8,'X'), true);
        assert.equal(board.update(8,'O'), false);
        assert.deepEqual(board.board(), [ '0', '1', '2', '3', '4', '5', '6', '7', 'X' ]);
    });
});

describe('board', function(){
    it('can have a winning state across', function(){
        var board = newBoard();
        board.setBoard(["X","X","X","O","O","5","6","7","8"]);
        assert.equal(board.hasWinner(), true);
    });
    it('can have a winning state down', function(){
        var board = newBoard();
        board.setBoard(["X","1","2","X","O","5","X","7","8"]);
        print.board(board.board(), board.wdth());
        assert.equal(board.hasWinner(), true);
    });
    it('can have a winning state diagonally', function(){
        var board = newBoard();
        board.setBoard(["X","1","2","O","X","O","6","7","X"]);
        print.board(board.board(), board.wdth());
        assert.equal(board.hasWinner(), true);
    });
    it('can be full', function(){
        var board = newBoard();
        assert.equal(board.canStillMove(), true);
        board.setBoard(["X","O","X","O","X","O","X","O","X"]);
        assert.equal(board.canStillMove(), false);
    });
});
