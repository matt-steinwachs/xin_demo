let pattern = [];
let colorOptions = ["red", "yellow", "blue", "green"]
let tones = {
  red: 400,
  yellow: 440,
  blue: 480,
  green: 520
}

let state = "showing";

//setup an event listener for the start button that will set up a game loop
document.getElementById("reset").onclick = start;

function start(){
  pattern = [];
  pattern.push(colorOptions[Math.floor(Math.random() * colorOptions.length)]);
  state = "showing";
  document.getElementById("gameover").style.display = "none";
  loop();
}

function loop(){
  document.querySelectorAll(".button").forEach(function(b){
    b.onclick = null;
  });

  if (state == "showing"){
    show(0);
  } else if (state == "listening") {
    listeningBeep();
    listen(0);
  } else if (state == "gameover") {
    gameoverBeep(0)
    gameover();
  }
}

function show(currentColor){
  if (currentColor < pattern.length){
    flash(
      pattern[currentColor],
      500,
      function(){
        show(++currentColor);
      }
    )
  } else{
    state = "listening"
    loop();
  }

}

// this makes one button brighter for a half second and then call whatever function was passed to it
function flash(color, time, increment){
  document.getElementById(color).classList.add("flash");

  var ctxClass = window.audioContext ||window.AudioContext || window.AudioContext || window.webkitAudioContext
  var ctx = new ctxClass();
  var osc = ctx.createOscillator();
  osc.type = "sine"
  osc.frequency.setValueAtTime(tones[color], ctx.currentTime);

  osc.connect(ctx.destination);
  if (osc.noteOn) osc.noteOn(0); // old browsers
  if (osc.start) osc.start(); // new browsers

  setTimeout(function(){
    document.getElementById(color).classList.remove("flash");
    if (osc.noteOff) osc.noteOff(0); // old browsers
    if (osc.stop) osc.stop(); // new browsers
    if (increment !== undefined){
      setTimeout(increment, time);
    }
  },time);
}

function listen(currentColor){
  console.log("listen",currentColor, pattern[currentColor]);
  if (currentColor >= pattern.length){
    successBeep(0);
    pattern.push(colorOptions[Math.floor(Math.random() * colorOptions.length)])
    state = "showing"
    setTimeout(loop, 1000);
  } else {
    // start a listen timer for the first button
    var timeout = setTimeout(function(){
      // if timer expires game over
      state = "gameover";
      loop();
    },2000);

    document.querySelectorAll(".button").forEach(function(b){
      b.onclick = function(e){
        clearTimeout(timeout);
        var color = e.target.id;
        flash(color, 200, function(){
          if (color == pattern[currentColor]){
              listen(++currentColor);
          } else {
            state = "gameover";
            loop();
          }
        });
      }
    })
  }
}

function gameover(){
  console.log("gameover");
  document.getElementById("gameover").style.display = "block";
  document.getElementById("score").innerHTML = pattern.length-1;
}


function listeningBeep(){
  var ctxClass = window.audioContext ||window.AudioContext || window.AudioContext || window.webkitAudioContext
  var ctx = new ctxClass();
  var osc = ctx.createOscillator();
  osc.type = "sine"
  osc.frequency.setValueAtTime(600, ctx.currentTime);

  osc.connect(ctx.destination);
  if (osc.noteOn) osc.noteOn(0); // old browsers
  if (osc.start) osc.start(); // new browsers

  setTimeout(function(){
    if (osc.noteOff) osc.noteOff(0); // old browsers
    if (osc.stop) osc.stop(); // new browsers
  },100);
}

function successBeep(time){
  var ctxClass = window.audioContext ||window.AudioContext || window.AudioContext || window.webkitAudioContext
  var ctx = new ctxClass();
  var osc = ctx.createOscillator();
  osc.type = "sine"
  osc.frequency.setValueAtTime(700+time*40, ctx.currentTime);

  osc.connect(ctx.destination);
  if (osc.noteOn) osc.noteOn(0); // old browsers
  if (osc.start) osc.start(); // new browsers

  setTimeout(function(){
    if (osc.noteOff) osc.noteOff(0); // old browsers
    if (osc.stop) osc.stop(); // new browsers
    if (time < 4){
      successBeep(++time);
    }
  },100);

}

function gameoverBeep(time){
  var ctxClass = window.audioContext ||window.AudioContext || window.AudioContext || window.webkitAudioContext
  var ctx = new ctxClass();
  var osc = ctx.createOscillator();
  osc.type = "sine"
  osc.frequency.setValueAtTime(700-time*40, ctx.currentTime);

  osc.connect(ctx.destination);
  if (osc.noteOn) osc.noteOn(0); // old browsers
  if (osc.start) osc.start(); // new browsers

  setTimeout(function(){
    if (osc.noteOff) osc.noteOff(0); // old browsers
    if (osc.stop) osc.stop(); // new browsers
    if (time < 4){
      gameoverBeep(++time);
    }
  },100);

}

// Ideas:
// add more than one color in later rounds
// Shorten timer
// Have to more than primary colors
// Visual distraction
// Play a sound for each
