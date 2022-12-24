function addItem(){
	let task = prompt("This is the prompt box", "Please enter the task name");
	if (task != null) {
		var date = new Date();
		setCookie('obj'+date.getTime(), encodeURIComponent(task));
		addListItem('obj'+date.getTime(), task);
	}
}

function setCookie(key, value){
	document.cookie = key + '=' + value + '; expires=';
	var date = new Date();
	document.cookie += date.toUTCString();
}

function deleteCookie(sName){
	document.cookie = sName + '=; expires=Fri, 31 Dec 1999 23:59:59 GMT;';
}

function loadSavedTasks(){
	let list = document.getElementById('list');
	let cookies = document.cookie.split('; ');
	cookies.sort();
	for(let i = 0; i < cookies.length; i++)
	{
		let cookieKV = cookies[i].split('=');
		if (cookieKV[0].indexOf('obj') === 0)
		{
			try{
				addListItem(cookieKV[0], decodeURI(cookieKV[1]));
			}catch(error){
				console.log(error.message);
			}
		}
	}
}

function addListItem(id,text){
	var list = document.getElementById('list');
	list.innerHTML+='<li id='+id+'>'+text+' <button onclick="deleteItem(\''+id+'\')">X</button></li>';
}

function deleteItem(id){
	if (confirm("Do you want to delete this task?"))
	{
		document.getElementById(id).remove();
		deleteCookie(id);
	}
}