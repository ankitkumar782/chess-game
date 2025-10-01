const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 1002 });

const GameManager = require('./Src/GameManager')
const app=require('./app')

app.listen(3000,()=>{
    console.log("server started")
})


wss.on('connection', function connection(ws) {


    // setInterval(() => {
    //      ws.send("hello")
    // }, 2000);
   
    GameManager.adduser(ws);
    //   ws.on('message', function message(data) {
    //     console.log('received: %s', data);
    //   });

    // ws.on('disconnect', GameManager.removeuser(ws));

    
});

