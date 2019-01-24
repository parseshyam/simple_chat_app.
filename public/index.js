var socket = io();

const output = document.getElementById('output');
const handle = document.getElementById('handle');
const message = document.getElementById('message');
const btn = document.getElementById('send');
const feedback = document.getElementById('feedback');
const users = document.getElementById('users');
const time = document.getElementById('time');
const toastBody = document.getElementById('toastBody');



btn.addEventListener('click', ()=> {
let bool = check();
if(bool){
        socket.emit('chat',{
        message : message.value,
        handle : handle.value,
        createdAt : new Date().getSeconds()
    });
 }    
});

socket.on('added' ,(data)=>{
    feedback.innerHTML = ' ';
    users.innerHTML = ' CHAT BOX ';
    users.innerText += ' CONNECTED USER : ' + data + ' ';
    if(data.length == 1 ){
        myFunction(' Welcome !');
    } else {
        myFunction(' New user added !');
    }
   
});

socket.on('chat' ,(data)=>{
    feedback.innerHTML = ' ';
    output.innerHTML += '<p><strong>'+data.handle +'</strong> '+data.message +'</p>';
});

message.addEventListener('keypress', ()=> {
    let bool = check();
    if(bool){
    socket.emit('typing',{handle :handle.value});
    }
});

socket.on('typing',(data)=>{
    feedback.innerHTML = ' <p><em>'+' '+data.handle +' is Typing...</em></p>';
});


message.addEventListener('keyup', ()=> {
    socket.emit('nottyping');
});

socket.on('nottyping',()=>{
    setTimeout(()=>{
        feedback.innerHTML = ' ';
    },3000);
   
});

socket.on('disconnected',(data) => {
    feedback.innerHTML = ' ';
    users.innerHTML = ' CHAT BOX ';
    users.innerText += ' CONNECTED USER : ' + data + ' ';
    //myFunction(' Welcome to chat_bot !');
});

function myFunction(data) {
    var x = document.getElementById("snackbar");
    snackbar.innerHTML = data;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", "");
    }, 1000);
  }


 var check = function(){
     if(handle.value.trim() == ''){
         myFunction('Enter your name.');
         return false ;
     }
     if(message.value.trim() == ''){
         myFunction('Enter your message.');
         return false ;
     }
     return true;
 } 