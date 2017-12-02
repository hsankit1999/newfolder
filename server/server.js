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


io.on('connection',(socket)=>{
    console.log("User added");
    //console.log(http);


    socket.emit('newMessage',generateMsg("Admin","welcome in chat app"));

    socket.broadcast.emit('newMessage',generateMsg('Admin',''));

    socket.emit("newMessage",generateMsg('Ankit',"hey this is me"));



    socket.on('location',(msg)=>{
        io.emit('location',generateMsg('Admin',`https://www.google.com/maps/?q=${msg.lat},${msg.lgn}`));
    });

    socket.on("newMessage",(msg,callback)=>{
        callback();

        io.emit('newMessage',generateMsg('Ankit',`${msg.text}`));
        socket.broadcast.emit('msgAudio',generateMsg('ankit',`${msg.text}`));

    });







});



server.listen(port,()=>{
    console.log(`Server started on ${port}`);
});