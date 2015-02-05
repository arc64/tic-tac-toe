var print = function(){
    function printBoard(board, width) {
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
        board:printBoard,
        message:printMessage
    }
}();

module.exports = print;