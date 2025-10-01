const { Chess } = require('chess.js')

const newgame = {};
exports.Newgame = (player1, player2) => {
    newgame.Player1 = player1;
    newgame.Player2 = player2;
    newgame.Board = new Chess();
    newgame.Startdate = new Date();
    return newgame;
}

exports.Makemove = (game, position,socket) => {
    //correct move 
    try {
        const res = game.Board.move(position);


        console.log(res)



        if (game.Board.isGameOver()) {
            game.Player1.emit(JSON.stringify({
                type: "move",
                payload: res
            }))
        }
        else {

            game.Player1.send(JSON.stringify({
                type: "move",
                payload: res
            }))


            game.Player2.send(JSON.stringify({
                type: "move",
                payload: res
            }))
        }
    }
    catch (err) {
        socket.send(JSON.stringify(err))
    }



}

