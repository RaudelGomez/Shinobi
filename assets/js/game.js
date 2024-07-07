let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
};

window.addEventListener('keydown', (e)=>{
  //console.log(e);
  if(e.keyCode == 39){
    keyboard.right = true;
  }
  if(e.keyCode == 37){
    keyboard.left = true;
  }
  if(e.keyCode == 38){
    keyboard.up = true;
  }
  if(e.keyCode == 40){
    keyboard.down = true;
  }
  if(e.keyCode == 32){
    keyboard.space = true;
  }
  if(e.keyCode == 65){
    keyboard.a = true;
  }
  // if(e.keyCode == 83){
  //   keyboard.s = true;
  // }
});

window.addEventListener('keyup', (e)=>{
  if(e.keyCode == 39){
    keyboard.right = false;
  }
  if(e.keyCode == 37){
    keyboard.left = false;
  }
  if(e.keyCode == 38){
    keyboard.up = false;
  }
  if(e.keyCode == 40){
    keyboard.down = false;
  }
  if(e.keyCode == 32){
    keyboard.space = false;
  }
  if(e.keyCode == 65){
    keyboard.a = false;
  }
  if(e.keyCode == 83){
    keyboard.s = true;
    setTimeout(() => {
      keyboard.s = false;
    }, 10);
  }
});
