var secExercice = 0;
var secWait = 0;
var sec = 0;
var nbRep = 1;
var nbRepTot = 0;
var prepTime = 10;
var totalTimeSec = 0;
var totalTimeMin = 0;
var lock=false;
var mute = false;

var audio = new Audio('beep.mp3');

function muteFun(){
	if(mute){
		document.getElementById('mute').src="unmute.png";
		mute = false;
	} else {
		document.getElementById('mute').src="mute.png";
		mute = true;
	}
}

function increaseExe(){
	if(!lock){
		document.getElementById('setExerciceSec').value = parseInt(document.getElementById('setExerciceSec').value)+1;
		updateTimer();
	}
}

function decreaseExe(){
	if(!lock){
		if(parseInt(document.getElementById('setExerciceSec').value) > 0) document.getElementById('setExerciceSec').value = parseInt(document.getElementById('setExerciceSec').value)-1;
		updateTimer();
	}
}

function increaseRest(){
	if(!lock){
		document.getElementById('setWaitSec').value = parseInt(document.getElementById('setWaitSec').value)+1;
		updateTimer();
	}
}

function decreaseRest(){
	if(!lock){
		if(parseInt(document.getElementById('setWaitSec').value) > 0) document.getElementById('setWaitSec').value = parseInt(document.getElementById('setWaitSec').value)-1;
		updateTimer();
	}
}

function increaseRep(){
	if(!lock){
		document.getElementById('setNbRep').value = parseInt(document.getElementById('setNbRep').value)+1;
		updateTimer();
	}
}

function decreaseRep(){
	if(!lock){
		if(parseInt(document.getElementById('setNbRep').value) > 1) document.getElementById('setNbRep').value = parseInt(document.getElementById('setNbRep').value)-1;
		updateTimer();
	}
}

function reset(){
	secExercice=0;
	secWait=0;
	prepTime=0;
	sec=0;
	nbRep=0;
	if(typeof countdownPreparation !== 'undefined') clearInterval(countdownPreparation);
	if(typeof countdown1 !== 'undefined') clearInterval(countdown1);
	if(typeof countdown2 !== 'undefined') clearInterval(countdown2);
	document.getElementById('setExerciceSec').value = 0;
	document.getElementById('setWaitSec').value = 0;
	document.getElementById('setNbRep').value = 1;
	nbRepTot=0;
	updateTimer();
}

function updateTimer(){
	secExercice = parseInt(document.getElementById('setExerciceSec').value);
	secWait = parseInt(document.getElementById('setWaitSec').value);
	nbRep = parseInt(document.getElementById('setNbRep').value);

	totalTimeSec = (secExercice+secWait)*nbRep;
	totalTimeMin = Math.floor(totalTimeSec/60);
	totalTimeSec = totalTimeSec % 60;

	document.getElementById('timerText').innerHTML = (totalTimeMin.toString().length < 2 ? ('0'+totalTimeMin) : totalTimeMin) + ':' + (totalTimeSec.toString().length < 2 ? ('0'+totalTimeSec) : totalTimeSec);
	document.getElementById('repTot').innerHTML = (nbRep.toString().length < 2 ? ('0'+nbRep) : nbRep);
	document.getElementById('repNb').innerHTML = (nbRepTot.toString().length < 2 ? ('0'+nbRepTot) : nbRepTot);
}

function setTimer(){
	if(!lock){
		lock=true;
		document.getElementById('btnGo').disabled = true;
		document.getElementById('btnGo').classList.remove("btn-success");
		document.getElementById('btnGo').classList.add("btn-secondary");
		document.getElementById('setExerciceSec').readOnly = true;
		document.getElementById('setWaitSec').readOnly = true;
		document.getElementById('setNbRep').readOnly = true;

		var list = document.getElementsByClassName("onlyLilCss");
		for (index = 0; index < list.length; ++index) {
    		list[index].setAttribute("disabled", "");
		}

		secExercice = parseInt(document.getElementById('setExerciceSec').value);
		secWait = parseInt(document.getElementById('setWaitSec').value);
		nbRep = parseInt(document.getElementById('setNbRep').value);
		prepTime = 10;

		document.getElementById('timerTitle').innerHTML = 'PREPARATION';
		document.body.style.backgroundColor = "#f1ae89";
		var countdownPreparation = setInterval(prepareTimer, 1000);
		function prepareTimer(){
			document.getElementById('timerText').innerHTML = '00:' + (prepTime.toString().length < 2 ? ('0'+prepTime) : prepTime);
			if(!mute && (prepTime == 3 || prepTime == 2 || prepTime == 1)) audio.play();
			prepTime = prepTime - 1;
			if(prepTime < 0){
				clearInterval(countdownPreparation);
				exerciceInterval();
			}
		}
	}
}

function exerciceInterval(){
	sec = secExercice;
	document.getElementById('timerTitle').innerHTML = 'WORK';
	document.body.style.backgroundColor = "#9dad7f";
	nbRepTot++;
	document.getElementById('repNb').innerHTML = (nbRepTot.toString().length < 2 ? ('0'+nbRepTot) : nbRepTot);

	var countdown1 = setInterval(timer, 1000);

	function timer(){
		document.getElementById('timerText').innerHTML = '00:' + (sec.toString().length < 2 ? ('0'+sec) : sec);
		if(!mute && (sec == 3 || sec == 2 || sec == 1)) audio.play();
		sec = sec - 1;
		if(sec < 0){
			clearInterval(countdown1);
			waitInterval();
		}
	}
}

function waitInterval(){
	sec = secWait;
	document.getElementById('timerTitle').innerHTML = 'REST';
	document.body.style.backgroundColor = "#e5707e";
	var countdown2 = setInterval(timer2, 1000);

	function timer2(){
		document.getElementById('timerText').innerHTML = '00:' + (sec.toString().length < 2 ? ('0'+sec) : sec);
		if(!mute && (sec == 3 || sec == 2 || sec == 1)) audio.play();
		sec = sec - 1;
		if(sec < 0){
			nbRep--;
			clearInterval(countdown2);
			if(nbRep > 0){
				exerciceInterval();
			} else {
				finish();
			}

		}
	}
}

function finish(){
	document.getElementById('timerTitle').innerHTML = 'FINISH';
	document.body.style.backgroundColor = "#cdc9c3";
	lock=false;
	document.getElementById('btnGo').disabled = false;
	document.getElementById('btnGo').classList.remove("btn-secondary");
	document.getElementById('btnGo').classList.add("btn-success");
	document.getElementById('setExerciceSec').readOnly = false;
	document.getElementById('setWaitSec').readOnly = false;
	document.getElementById('setNbRep').readOnly = false;

	var list = document.getElementsByClassName("onlyLilCss");
	for (index = 0; index < list.length; ++index) {
    	list[index].removeAttribute("disabled", "");
	}

	nbRepTot=0;
}