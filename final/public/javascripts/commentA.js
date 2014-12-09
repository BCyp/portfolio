

var lastRetrievalDate, 
    timer, 
    delay = 1000;

document.addEventListener("DOMContentLoaded", getMessages);
document.querySelector('input[type=button]').addEventListener("click", sendMessage);

function sendMessage() {
	var message = document.getElementById('newComment').value;
	var listing = document.getElementById('listing').value;
	var req= new XMLHttpRequest();
	req.open('POST', 'http://localhost:3000/listings/comment', true);
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	req.send('message=' + message + '&'+ 'listing=' + listing );
	req.addEventListener('load', function(eve) {
    clearTimeout(timer);
		getMessage();
	});
}
function getMessages() {
	var req = new XMLHttpRequest(),

  url = 'http://localhost:3000/listings/comment';
  	var listing = document.getElementById('listing').value;
  console.log(lastRetrievalDate);
	req.open('GET', url, true);

	req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400){
      data = JSON.parse(req.responseText);
      messageList = document.getElementById('commentSection');
      data.forEach(function(msg) {
      	if(msg.listing === listing){
        var div = messageList.appendChild(document.createElement('div'));
        div.setAttribute('class', 'container');
        div.textContent = (new Date(msg.date)).toLocaleString() + ' - ' + msg.comment;
    	}
      });
      console.log(data);
      
    } else {
      console.log(req.status);
    }
  });	

	req.send();
}
function getMessage() {
	var req = new XMLHttpRequest(),

  url = 'http://localhost:3000/listings/comment';

  console.log(lastRetrievalDate);
	req.open('GET', url, true);

	req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400){
      data = JSON.parse(req.responseText);
      messageList = document.getElementById('commentSection');
        var div = messageList.appendChild(document.createElement('div'));
        div.textContent = (new Date(data[data.length-1].date)).toLocaleString() + ' - ' + data[data.length-1].comment;
      console.log(data);
      
    } else {
      console.log(req.status);
    }
  });	

	req.send();
}