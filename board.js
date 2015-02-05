var print = require('./print');

var board = function(){

    // Going with numbered input instead of coordinates
    var board = ["0","1","2","3","4","5","6","7","8"];

    var width = 3;

    function update(choice, value) {
        // update board
        if(!board[choice]) {
            print.message("I'm sorry but I didn't understand that, please select a number ");
        } else if( board[choice] == 'X' || board[choice] =='O') {
            print.message("I'm sorry but that square is taken, try another one ");
        } else {
            board[choice] = value;
            return true;
        }
        return false;
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
            print.message("O has Won!");
            return true;
        }
        if(winners.indexOf("X") != -1){
            print.message("X has Won!");
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
            print.message("No one won! Please play again :)");
            return false
        }

        return true;
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

    function getBoard() {
        return board;
    }

    function getWidth() {
        return width;
    }

    function testBoard(newBoard){
        board = newBoard;
    }

    return {
        update:update,
        canStillMove:canStillMove,
        hasWinner:hasWinner,
        checkSeries:checkSeries,
        setBoard: testBoard,
        board: getBoard,
        wdth: getWidth,
    }

};

module.exports = board;