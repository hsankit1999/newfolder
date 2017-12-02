var socket=io();

var msg = new SpeechSynthesisUtterance('Welcome');
window.speechSynthesis.speak(msg);


socket.on('disconnect',function(){
    console.log("Disconnect");
});


socket.on('msgAudio',function(msg){
    var msg2 = new SpeechSynthesisUtterance(`${msg.from} messaged you`);
    window.speechSynthesis.speak(msg2);
    var msg1 = new SpeechSynthesisUtterance(msg.text);
    window.speechSynthesis.speak(msg1);
    



});

socket.on('location',function(msg){

    var template=$('#location-template').html();
    var html=Mustache.render(template,{
            from:msg.from,
            url:msg.text,
            createdAt:msg.createdAt
    });
    /*
    var li=$('<li></li>');
    var a =$('<a target="_blank">My current Location</a>');
    a.attr('href',msg.text);
    li.text(`${msg.from} : `);
    li.append(a);
    */
    $('#page').append(html);
    //$('.chat').scroll(100);



});


    socket.on('newMessage',function(msg){

    var template=$('#message-template').html();
    var html=Mustache.render(template,{
        from:msg.from,
        text:msg.text,
        createdAt:msg.createdAt
    });
    $('#page').append(html);
    /*var li=$('<li></li>');
    li.text(`${msg.from} , ${msg.createdAt}   : ${msg.text}`);
    $('#page').append(li);
    $('li').css('color','black');
    $('li:last-child').css('color','red');
    */
    $('ol').scrollTop($('ol').scrollTop()+160);

});

function Typing(){

     $('#typing').text('typing...');


}









//socket.emit('newMessage',);
$(document).ready(function(){
    $('#message-form').on('submit',function(e){
        e.preventDefault();

        socket.emit('newMessage',{
            from:'ankit',
            text:$('[name=chat]').val()
        },
        ()=>{
            console.log('done');
        });
    });

    $('#loc').on('click',function(){
        if(!navigator.geolocation){
            return alert("Location not found");
        }
        navigator.geolocation.getCurrentPosition((pos)=>{
            console.log(pos);
            socket.emit('location',{
                 lat:pos.coords.latitude,
                 lgn:pos.coords.longitude
            });

        });
    });



    setInterval(function(){

        $('#typing').text('.');
        },800);

});

