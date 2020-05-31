let pattern = [];
let colorOptions = ["red", "yellow", "blue", "green"]
let state = "showing";

//setup an event listener for the start button that will set up a game loop
document.getElementById("reset").onclick = start;

function start(){
  pattern = [];
  pattern.push(colorOptions[Math.floor(Math.random() * colorOptions.length)]);
  state = "showing";
  document.getElementById("gameover").style.display = "none";
  document.getElementById("score").style.display = "none";
  loop();
}

function loop(){
  if (state == "showing"){
    show();
  } else if (state == "listening") {
    listen(0);
  } else if (state == "gameover") {
    gameover();
  }
}

function show(){
  let currentColor = 0;
  let timer = setInterval(function(){
    if (currentColor < pattern.length){
      flash(pattern[currentColor], function(){currentColor++;})
    } else{
      clearTimeout(timer);
      state = "listening"
      loop();
    }
  }, 2000)
}

// this makes one button brighter for a half second and then call whatever function was passed to it
function flash(color, increment){
  document.getElementById(color).classList.add("flash");
  setTimeout(function(){
    document.getElementById(color).classList.remove("flash");
    if (increment !== undefined){
      increment();
    }
  },1000);
}

function listen(currentColor){
  if (currentColor >= pattern.length){
    pattern.push(colorOptions[Math.floor(Math.random() * colorOptions.length)])
    state = "showing"
    loop();
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
        flash(color);
        if (color == pattern[currentColor]){
            listen(++currentColor);
        } else {
          state = "gameover";
          loop();
        }
      }
    })
  }
}

function gameover(){
  console.log("gameover");
  document.getElementById("gameover").style.display = "block";
  document.getElementById("score").innerHTML = pattern.length;
  document.getElementById("score").style.display = "block";
}

// Ideas:
// add more than one color in later rounds
// Shorten timer
// Have to more than primary colors
// Visual distraction
// Play a sound for each
