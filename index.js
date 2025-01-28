
const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({ port: 1002 });
const GameManager = require('./Src/GameManager')





wss.on('connection', function connection(ws) {

    GameManager.adduser(ws);
    //   ws.on('message', function message(data) {
    //     console.log('received: %s', data);
    //   });

    // ws.on('disconnect', GameManager.removeuser(ws));

    
});