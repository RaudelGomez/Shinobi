let canvas;
let world;
let keyboard = new Keyboard();
let musicVolume = document.getElementById('music-volume');
let btnPlayPause = document.getElementById('btn-play-pause');
let musicGame = new Audio('assets/audio/gameMusic.mp3');

let isMusicOn = false;
	
function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  setInterval(() => {
    musicGame.volume = turnVolumeMusic();
  }, 100);
};

function playPauseMusic() {
  isMusicOn = !isMusicOn;
  if(isMusicOn){
    musicGame.play();
    btnPlayPause.textContent = 'pause';
  }else{
    musicGame.pause();
    btnPlayPause.textContent = 'play';
  }
}

function turnVolumeMusic(){
  return musicVolume.value;
}

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
  if(e.keyCode == 68){
    keyboard.d = true;
    setTimeout(() => {
      keyboard.d = false;
    }, 10);
  }
});
