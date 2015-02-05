var readline = require('readline');

var print = require('./print');
var newBoard = require('./board');


var game = function(){

    // Who starts? default to X.
    var turn = "X";
    var board = newBoard();

    function play(){

        // Show board to player
        print.board(board.board(), board.wdth());

        // Collect input Node readline http://nodejs.org/api/readline.html
        var rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });

        rl.question("Your move "+ turn +", type a number: ", function(answer) {
            // Update board
            var successfulUpdate = board.update(answer, turn);

            if(successfulUpdate) {
                turn = turn == "X" ? "O" : "X";
            }

            rl.close();

            // Check for winners and if there are still free
            if(!board.hasWinner() && board.canStillMove()){
                // play again
                play();
            } else {
                print.board(board.board(), board.wdth());
                process.exit(1);
            }

        });


    }

    return {
        play: play
    };

}();

game.play();

module.exports = game;