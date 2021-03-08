var secExercice = 0;
var secWait = 0;
var sec = 0;
var nbRep = 1;
var prepTime = 10;
var totalTimeSec = 0;
var totalTimeMin = 0;
var lock=false;

function increaseExe(){
	document.getElementById('setExerciceSec').value = parseInt(document.getElementById('setExerciceSec').value)+1;
	updateTimer();
}

function decreaseExe(){
	if(parseInt(document.getElementById('setExerciceSec').value) > 0) document.getElementById('setExerciceSec').value = parseInt(document.getElementById('setExerciceSec').value)-1;
	updateTimer();
}

function increaseRest(){
	document.getElementById('setWaitSec').value = parseInt(document.getElementById('setWaitSec').value)+1;
	updateTimer();
}

function decreaseRest(){
	if(parseInt(document.getElementById('setWaitSec').value) > 0) document.getElementById('setWaitSec').value = parseInt(document.getElementById('setWaitSec').value)-1;
	updateTimer();
}

function increaseRep(){
	document.getElementById('setNbRep').value = parseInt(document.getElementById('setNbRep').value)+1;
	updateTimer();
}

function decreaseRep(){
	if(parseInt(document.getElementById('setNbRep').value) > 1) document.getElementById('setNbRep').value = parseInt(document.getElementById('setNbRep').value)-1;
	updateTimer();
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

}

function setTimer(){
	if(!lock){
		lock=true;
		document.getElementById('btnGo').disabled = true;
	document.getElementById('btnGo').classList.remove("btn-success");
	document.getElementById('btnGo').classList.add("btn-secondary");
		secExercice = parseInt(document.getElementById('setExerciceSec').value);
		secWait = parseInt(document.getElementById('setWaitSec').value);
		nbRep = parseInt(document.getElementById('setNbRep').value);
		prepTime = 10;

		document.getElementById('timerTitle').innerHTML = 'PREPARATION';
		document.body.style.backgroundColor = "#f1ae89";
		var countdownPreparation = setInterval(prepareTimer, 1000);

		function prepareTimer(){
			document.getElementById('timerText').innerHTML = '00:' + (prepTime.toString().length < 2 ? ('0'+prepTime) : prepTime);
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
	var countdown1 = setInterval(timer, 1000);

	function timer(){
		document.getElementById('timerText').innerHTML = '00:' + (sec.toString().length < 2 ? ('0'+sec) : sec);
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
}