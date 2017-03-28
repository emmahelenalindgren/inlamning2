window.addEventListener("load", function() {
    
    
	var inputName = document.getElementById("inputname");
	var logOutBtn = document.getElementById("logoutButton");
	var logInBtn = document.getElementById("loginButton");
	var inputMessage = document.getElementById("messageSquare");
	var sendMessageBtn = document.getElementById("sendbutton");
	var logedintext = document.getElementById("loggedintext");
	var chatpart = document.getElementById("chatpart");
	var chatBox = document.getElementById("chattBox");
	var writtenMessage;
	var loggedInName;
	var allMessage = 0;
	loggedInName = localStorage.getItem("name");
	logedintext.innerHTML = "Du är inloggad som " + loggedInName;
	logOutBtn.style.display = "none";
    
    
    
	//firebase hämtar   
	firebase.database().ref('messages/').on('value', function(snapshot) {
		let allData = snapshot.val();
		chatBox.innerHTML = "";
		for (let object in allData) {
			let lastMessage = allData[object];
			allMessage = allData.length;
			console.log(allMessage);
			let li = document.createElement("li");
			li.innerHTML = `${lastMessage.name} ${lastMessage.thisMessege} ${lastMessage.time}`;
			chatBox.appendChild(li);
			chatBox.insertBefore(li, chatBox.childNodes[0]);
		}
	});
	if (loggedInName == "") {
		logedintext.innerHTML = "";
		chatpart.style.display = "none";
	} else {
		logedintext.innerHTML = "Du är inloggad som " + loggedInName;
		chatpart.style.display = "inherit";
		logInBtn.style.display = "none";
		logOutBtn.style.display = "inherit";
		inputName.style.display = "none";
	}
    
    
    
	//klickar på log in
	logInBtn.addEventListener("click", function(event) {
		loggedInName = inputName.value;
		localStorage.setItem("name", loggedInName);
		console.log(loggedInName);
		if (loggedInName == "") {
			logedintext.innerHTML = "";
		} else {
			logedintext.innerHTML = "Du är inloggad som " + loggedInName;
			inputName.style.display = "none";
			chatpart.style.display = "inherit";
			logInBtn.style.display = "none";
			logOutBtn.style.display = "inherit";
		}
	});
    
    
    
	// klickar på log out    
	logOutBtn.addEventListener("click", function(event) {
		loggedInName = localStorage.setItem("name", "");
		logOutBtn.style.display = "none";
		logInBtn.style.display = "inherit";
		logedintext.innerHTML = "Du är inte inloggad";
		inputName.style.display = "inherit";
		chatpart.style.display = "none";
		console.log(loggedInName);
	});
    
    
	// klickar på send
	sendMessageBtn.addEventListener("click", function(event) {
		writtenMessage = "skrev: <br><i>" + inputMessage.value + "</i><br>";
		console.log(writtenMessage);
		inputMessage.value = "";
		// objekt för meddelanden       
		let message = {
			name: loggedInName,
			thisMessege: writtenMessage,
			id: allMessage,
			time: currentTime()
		};
		firebase.database().ref("messages/" + message.id).set(message);
	});
    
    
    
	// hämta tid 
	function currentTime() {
		var currentDate = new Date();
		var time = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + " " + currentDate.getHours() + ":" + currentDate.getMinutes();
		return time;
	}
    
    
});