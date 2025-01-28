const { Newgame, Makemove } = require("./Newgame");

var user=[];
var pendinguser=[];
var Game=[];
exports.adduser=(socket)=>{
    
    user.push(socket);
    addhandler(socket)
}

exports.removeuser=(socket)=>{
    console.log(socket)
}

 addhandler=(socket)=>{

    socket.on('message', function message(data) {
        
        let msg=(data.toString());
       
        let msg2=msg.split(',')
        if(msg==='newjoin'){
            
            if(pendinguser.length>0&&pendinguser[0]!='empty'){
                //start a game
                const startgame=Newgame(pendinguser[0],socket);
                Game.push(startgame);
                
                socket.send('gamestarted');
                pendinguser[0].send('gamestarted');
                pendinguser[0]='empty';
                
            }
            else{

                pendinguser.push(socket)
              
                socket.send('pls wait');
            }
        }

        if(msg2[0]==='move'){
        let curr;
        for(let i=0;i<Game.length;i++){
            if(Game[i].Player1===socket){
                curr=Game[i];
            }
            else if(Game[i].Player2===socket){
                curr=Game[i];
            }
        }
            if(curr){
                Makemove(curr,msg2[1],socket);
            }
            
        }
      });

}

