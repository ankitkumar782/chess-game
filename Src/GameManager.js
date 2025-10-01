const { Newgame, Makemove } = require("./Newgame");

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tictactoe', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define pending user schema
const pendingUserSchema = new mongoose.Schema({
    socketId: String,
    joinedAt: { type: Date, default: Date.now }
});

// Create model
const PendingUser = mongoose.model('PendingUser', pendingUserSchema);

// Function to add pending user to DB
async function addPendingUserToDB(socket) {
    try {
        const pendingUser = new PendingUser({
            socketId: socket.id
        });
        await pendingUser.save();
    } catch (err) {
        console.error('Error saving pending user:', err);
    }
}

// Function to remove pending user from DB
async function removePendingUserFromDB(socket) {
    try {
        await PendingUser.deleteOne({ socketId: socket.id });
    } catch (err) {
        console.error('Error removing pending user:', err);
    }
}

// Function to get first pending user
async function getFirstPendingUser() {
    try {
        return await PendingUser.findOne().sort({ joinedAt: 1 });
    } catch (err) {
        console.error('Error getting pending user:', err);
        return null;
    }
}


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
                console.log(pendinguser.length)
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

