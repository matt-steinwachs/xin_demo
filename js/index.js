let pattern = [];
let colorOptions = ["red", "yellow", "blue", "green"]
let state = "showing";

//Add random first color
pattern.push(colorOptions[Math.floor(Math.random() * colorOptions.length)])

//setup an event listener for the start button that will set up a game loop
document.getElementById("reset").onclick = loop;

function loop(){
  //steps in the loop:
  // adds a color to the patter
  // show the pattern
  // listen for the user to click each color in the pattern within a time limit
  // if any mistakes are made, end the game and show a score
  // else repeat

  if (state == "showing"){
    //flash the squares in order
  } else if (state == "listening") {
    //listen for the next button press
  }
}

function show(){
  let currentColor = 0;
  let timer = setInterval(function(){
    flash(pattern[currentColor], function(){currentColor++;})
  }, 2000)
}

function flash(color, increment){

}

function listen(){
  // start a listen timer for the first button

  // if timer expires game over

  // on each button click check if correct color in patter

  // if not game over

  // if it is then restart listen timer
    // or if we're at the end of the pattern add a new color
}

// Ideas:
// add more than one color in later rounds
// Shorten timer
// Have to more than primary colors
// Visual distraction
// Play a sound for each
