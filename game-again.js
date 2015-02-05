/**
    Tic Tac Toe / Naughts and Crosses
    To run: node game.js

    Command line input expects numbered input indicating the square to play
    Two player game, X is always first

    // Player can won
    // Player cannot select a square that is taken
    // Player can only select by number
    // The game ends when won or when there are no more squares
**/



var readline = require('readline');

var game = function(){

    // Going with numbered input instead of coordinates
    var board = ["0","1","2","3","4","5","6","7","8"];

    // test boards, as there are no written tests
    //var board = ["X","X","2","O","O","5","6","7","8"];
    //var board = ["X","X","O","O","O","5","6","7","8"];
    //var board = ["X","X","O","O","O","X","X","O","8"];

    var width = 3;
    // Who starts? default to X.
    var turn = "X";

    function update(choice, value) {
        // update board
        if(!board[choice]) {
            printMessage("I'm sorry but I didn't understand that, please select a number ");
        } else if( board[choice] == 'X' || board[choice] =='O') {
            printMessage("I'm sorry but that square is taken, try another one ");
        } else {
            board[choice] = value;
            return true;
        }
        return false;
    }

    function checkSeries(dx, dy, x, y){
        // calculate score for row, if row has one return the winner
        var score = {};

        for (var i = 0; i < width; i++) {
            var v = board[x+(y*width)];

            score[v] = score[v] !== undefined ? score[v] + 1 : 0;
            x += dx;
            y += dy;
            if(score[v] >= width -1) {
                return v;
            }
        }
    }

    function hasWinner(){
        var winners = [];

        for(var i = 0; i < width; i++) {
            //check by column and step down
            winners.push(checkSeries(0,1,i,0));
            //check by rown and step
            winners.push(checkSeries(1,0,0,i));
        }
        //check diag, top left stepping down and across
        winners.push(checkSeries(1,1,0,0));
        //check diag, top right stepping down and back
        winners.push(checkSeries(-1,1,2,0));

        if(winners.indexOf("O") != -1){
            printMessage("O has Won!");
            return true;
        }
        if(winners.indexOf("X") != -1){
            printMessage("X has Won!");
            return true;
        }
        return false;
    }

    function canStillMove(){
        var freeCells = board.filter(function(square){
            if(board[square] !== "X" || board[square] !== "O") {
                return board[square];
            }
        });

        if(freeCells.length >= 1) {
            return true
        } else {
            printMessage("No one won! Please play again :)");
            return false
        }

        return true;
    }

    function play(){
        // Show board to player
        prettyPrint();

        // Collect input Node readline http://nodejs.org/api/readline.html
        var rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });

        rl.question("Your move "+ turn +", type a number: ", function(answer) {
            // Update board
            var successfulUpdate = update(answer, turn);

            if(successfulUpdate) {
                turn = turn == "X" ? "O" : "X";
            }

            rl.close();

            // Check for winners and if there are still free
            if(!hasWinner() && canStillMove()){
                // play again
                play();
            } else {
                prettyPrint();
                process.exit(1);
            }

        });


    }

    function prettyPrint() {
        // Pretty print the board to the console.
        var gameBoard = "";
        for(var i = 0; i < board.length; i++) {
            var row = "";

            var split = i%width;
            if(split == 0) {
                gameBoard += "\n";
            }
            gameBoard += " " + board[i];
        }
        gameBoard += "\n";

        console.log(gameBoard);
    }

    function printMessage(message) {
        console.log("--------------------------------------");
        console.log(message);
        console.log("--------------------------------------");
    }

    return {
        play: play
    };

}();

game.play();