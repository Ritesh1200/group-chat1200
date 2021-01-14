const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const schema = require('./database.js');
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
const cors = require('cors');

const port = process.env.PORT || 4000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server)


// Body-parser middleware
app.use(bodyparser.urlencoded({extended:false})) ;
app.use(bodyparser.json()) ;

// cors
app.use(cors({
   origin : ['http://localhost:3000'],
   credentials:true
 }) ) ;

var url = 'mongodb+srv://demo:1234@cluster0.ugnnu.mongodb.net/chattingApp?retryWrites=true&w=majority' ;
mongoose.connect(
  url ,
  {'useNewUrlParser': true ,'useUnifiedTopology': true,'useCreateIndex': true , 'useFindAndModify' : false} ,
  function() {
    console.log ('connected to mongoDB') ;
  });

app.post('/create' , (req,res,next)=>{
   schema.find({room: req.body.room} , function(err , room){
      if(err) throw err ;

      if(room[0]){
         return res.send({value : 'room is already used' , error : 'yes'});
      }else{
         schema.create({room: req.body.room}, function(err , room) {
            if(err) throw err ;
   
            return res.send({roomName : room.room , name: req.body.name , error : "no"}) ;
         })
      }
   })
})

app.post('/check' , (req,res,next)=>{
   schema.find({room: req.body.room} , function(err , room){
      if(err) throw err ;

      if(room[0]){
         return res.send({roomName : room.room , name : req.body.name , error : 'no'});
      }else{
         return res.send({error : 'yes'});
      }
   })
})

io.on('connection' , (socket)=>{  //Creating Connection
   console.log("Socket connection");

   socket.on('message', (msg )=>{
      socket.join(msg.roomName);
      io.to(msg.roomName).emit('done',{
         name : msg.from ,
         message : msg.message
      });
   })

   socket.on('disconnecting', () => {
      console.log(socket.rooms); // the Set contains socket ID and room name
    });

   socket.on('disconnect', () => {
      console.log('person is disconnect');
   })
})

app.use(express.static(path.join(__dirname,'../build')));
app.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../build/index.html'));
});

server.listen(port, () => {
   console.log('express is running in 4000 port');
})