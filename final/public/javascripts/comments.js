function elemCreate( type, obj, child){
	var newElement = document.createElement(type);
	if(obj.id){
		newElement.id =obj.id;
	}
	if(obj.class){
		newElement.setAttribute('class', obj.class);
	}
	if(obj.style){
		newElement.setAttribute('style', obj.style);
	}
	if(child){
		newElement.appendChild(child);
	}

	return newElement;

};
function addSubmit(){
	var submit = document.createElement('input');
	submit.type = 'submit';
	submit.value = 'Add Comment';
	submit.name = 'Add Comment';
	return submit;
};
function addLine(){
	var commentLine = elemCreate('input',{});
	commentLine.name = 'newComment';
	return commentLine;
};
function addForm(){
	var commentForm = elemCreate('form', {}, addLine());
	commentForm.name = 'input';
	commentForm.action = '/listings/comment';
	commentForm.method = 'post';
	commentForm.appendChild(addSubmit());
	return commentForm;
};
function addComment(){
	var commentBlock = elemCreate('div',{});
};
function main(){
	document.getElementById('commentSection').appendChild(addForm());
};
document.getElementById('commentButton').addEventListener('click', main);





