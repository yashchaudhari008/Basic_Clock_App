//-----------CLOCK LOGIC------------------------------------------
//getting HTML element reference
const clkH = document.getElementById('clkH');
const clkM = document.getElementById('clkM');
const clkS = document.getElementById('clkS'); 
function startClock(){
    //Create Date Object 
    let date = new Date();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();

    //Add prefix '0' if number is less than 10 
    //  Example:- 8 becomes 08.
    hrs = hrs < 10 ? `0${hrs}` : hrs;
    mins = mins < 10 ? `0${mins}` : mins;
    secs = secs < 10 ? `0${secs}` : secs;

    //Update Time in HTML
    clkH.innerHTML = hrs;
    clkM.innerHTML = mins;
    clkS.innerHTML = secs;
    setTimeout(startClock, 100);
}
startClock();
//----------------------------------------------------------------



//-------STOPWATCH LOGIC------------------------------------------
//getting HTML element reference
const swH = document.getElementById('swH');
const swM = document.getElementById('swM');
const swS = document.getElementById('swS');
const startSWBTN = document.getElementById('startSW');
const stopSWBTN = document.getElementById('stopSW');
const resetSWBTN = document.getElementById('resetSW');

let sw = null; //Reference to stopwatch's setTimeout
let h = m = s = 0;

//recursive function called after every 1 sec.
function stopwatch(){
    //Add 1 to secs.
    s = s + 1;
    if (s == 60){
        s = 0;
        m = m + 1;//Add 1 to mins.
    }
    if (m == 60){
        m = 0;
        h = h + 1;//Add 1 to hrs.
    }
    updateStopwatch(h,m,s);
    sw = setTimeout(stopwatch, 1000);
}
function updateStopwatch(h,m,s){
    //Add prefix '0' if number is less than 10 
    //  Example:- 8 becomes 08.
    h = h < 10 ? `0${h}`:h;
    m = m < 10 ? `0${m}`:m;
    s = s < 10 ? `0${s}`:s;
    //Update stopwatch in HTML
    swH.innerHTML = h;
    swM.innerHTML = m;
    swS.innerHTML = s;
}

startSWBTN.onclick = () => {
    stopwatch();
    startSWBTN.classList.toggle('hide');
    stopSWBTN.classList.toggle('hide');
}
stopSWBTN.onclick = () => {
    clearTimeout(sw);
    stopSWBTN.classList.toggle('hide');
    resetSWBTN.classList.toggle('hide');
}
resetSWBTN.onclick = () => {
    updateStopwatch(0,0,0);
    h=0;m=0,s=0;
    resetSWBTN.classList.toggle('hide');
    startSWBTN.classList.toggle('hide');
}
//----------------------------------------------------------------



//-----------ALARM LOGIC------------------------------------------
const alarmTime = document.getElementById('alarmTime');
const setABTN = document.getElementById('setA');
const cancelABTN = document.getElementById('cancelA');
const stopABTN = document.getElementById('stopA')
let alarm = null;//Reference to alarm's setInterval
let alarmSound = new Audio('alarm.mp3');

function isTimeToRing(){
    let atime = alarmTime.value.split(':'); //convert alarmTime into [HH:MM]
    //check if current time and alarm time is equal
    if (clkH.innerHTML == atime[0] && clkM.innerHTML == atime[1]){
        console.log("RINGING");
        clearInterval(alarm); //stop checking thereafter
        
        cancelABTN.click();
        stopABTN.classList.toggle('hide');
        alarmSound.play(); 
        
    }
}
stopABTN.onclick = () => {
    alarmSound.pause();
    stopABTN.classList.toggle('hide')
}

setABTN.onclick = () => {
    if (alarmTime.value == ''){
        return alert('Set Valid Time!');
    }
    alarmTime.readOnly = true;
    
    //recursive call every sec to check weather we alarm should ring.
    alarm = setInterval(isTimeToRing, 1000);
    setABTN.classList.toggle('hide');
    cancelABTN.classList.toggle('hide');
}
cancelABTN.onclick = () => {
    //reset alarm
    alarmTime.readOnly = false;
    alarmTime.value = '';
    cancelABTN.classList.toggle('hide');
    setABTN.classList.toggle('hide');
    
}
//----------------------------------------------------------------



//FUNCTIONS FOR UI TRANSITION
let currentElement = 'clock';
function unhide(elename){
    document.getElementById(elename).classList.toggle('hide');
    document.getElementById(currentElement).classList.toggle('hide');
    currentElement = elename;
}