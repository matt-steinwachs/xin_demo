let pattern = [];
let colorOptions = ["red", "yellow", "blue", "green"];
let tones = {};
colorOptions.forEach(function(c,i){
  tones[c] = 400+i*40;
});
let osc_type = "square";

//setup an event listener for the start button that will set up a game loop
document.getElementById("reset").onclick = start;

function start(){
  pattern = [];
  pattern.push(colorOptions[Math.floor(Math.random() * colorOptions.length)]);
  document.getElementById("gameover").style.display = "none";
  loop("showing");
}

function loop(state){
  document.querySelectorAll(".button").forEach(function(b){
    b.onclick = null;
  });

  if (state == "showing"){
    show(0);
  } else if (state == "listening") {
    listeningBeep();
    listen(0);
  } else if (state == "gameover") {
    gameoverBeep(0);
    gameover();
  }
}

function show(currentColor){
  if (currentColor < pattern.length){
    flash(pattern[currentColor],500,function(){ show(++currentColor) })
  } else{
    loop("listening");
  }
}

function flash(color, time, increment){
  document.getElementById(color).classList.add("flash");
  var b = beepStart(tones[color]);

  setTimeout(function(){
    document.getElementById(color).classList.remove("flash");
    beepEnd(b);
    if (increment !== undefined){
      setTimeout(increment, time);
    }
  },time);
}

function listen(currentColor){
  if (currentColor >= pattern.length){
    successBeep(0);
    pattern.push(colorOptions[Math.floor(Math.random() * colorOptions.length)]);
    setTimeout(function(){loop("showing")}, 1000);
  } else {
    var timeout = setTimeout(function(){
      // if timer expires game over
      loop("gameover");
    },2000);

    document.querySelectorAll(".button").forEach(function(b){
      b.onclick = function(e){
        clearTimeout(timeout);
        var color = e.target.id;
        flash(color,200,
          function(){
            if (color == pattern[currentColor]){
              listen(++currentColor);
            } else {
              loop("gameover");
            }
          }
        );
      }
    })
  }
}

function beepStart(freq){
  var ctxClass = window.audioContext || window.AudioContext || window.AudioContext || window.webkitAudioContext;
  var ctx = new ctxClass();
  var osc = ctx.createOscillator();
  osc.type = osc_type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);

  osc.connect(ctx.destination);
  if (osc.noteOn) osc.noteOn(0); // old browsers
  if (osc.start) osc.start(); // new browsers

  return osc;
}

function beepEnd(osc){
  if (osc.noteOff) osc.noteOff(0); // old browsers
  if (osc.stop) osc.stop(); // new browsers
}

function gameover(){
  document.getElementById("gameover").style.display = "block";
  document.getElementById("score").innerHTML = pattern.length-1;
}

function listeningBeep(){
  var b = beepStart(600);
  setTimeout(function(){
    beepEnd(b);
  },100);
}

function successBeep(time){
  var b = beepStart(700+time*40);

  setTimeout(function(){
    beepEnd(b);
    if (time < 4){
      successBeep(++time);
    }
  },100);
}

function gameoverBeep(time){
  var b = beepStart(700-time*40);

  setTimeout(function(){
    beepEnd(b);
    if (time < 4){
      gameoverBeep(++time);
    }
  },100);
}

// Ideas:
// add more than one color in later rounds
// Shorten timer
// Have more than four colors
// Visual distraction
// game settings menu
