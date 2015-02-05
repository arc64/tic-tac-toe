
// Player can win
// Player cannot select a square that is taken
// Player can only select by number
// The game ends when won or when there are no more squares

var assert = require('assert');

var game = require('./game');
var print = require('./print');
var board = require('./board');

console.log(board.board)

describe('square', function(){
    it('can be updated', function(){

    });
    it('cannot be updated more than once', function(){

    });
});

describe('board', function(){
    it('can have a winning state across', function(){

    });
    it('can have a winning state down', function(){

    });
    it('can have a winning state diagonally', function(){

    });
    it('can be full', function(){

    });
});
