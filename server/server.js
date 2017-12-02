const express=require('express');
const path=require('path');
const socketIO=require('socket.io');
var http=require('http');



const publicPath=path.join(__dirname,"../public");
var port=process.env.PORT || 3000;
var app=express();

var server=http.createServer(app);

var io=socketIO(server);
var {generateMsg}=require('./message');
app.use(express.static(publicPath));

app.get('/',(req,res)=>{
    console.log(window.location.search);
    res.send('chat.html');
});

io.on('connection',(socket)=>{
    console.log("User added");
    //console.log(http);


    socket.emit('newMessage',generateMsg("Admin","Welcome in chat app"));

    socket.on('newUser',(msg)=>{
        socket.broadcast.emit('newMessage',generateMsg('Admin',`"${msg.userName}" has been Connected`));
    });


    //socket.emit("newMessage",generateMsg('Ankit',"hey this is me"));



    socket.on('location',(msg)=>{
        io.emit('location',generateMsg('Admin',`https://www.google.com/maps/?q=${msg.lat},${msg.lgn}`));
    });

    socket.on("newMessage",(msg,callback)=>{
        callback();

        io.emit('newMessage',generateMsg(msg.from,`${msg.text}`));
        socket.broadcast.emit('msgAudio',generateMsg(msg.from,`${msg.text}`));

    });







});



server.listen(port,()=>{
    console.log(`Server started on ${port}`);
});