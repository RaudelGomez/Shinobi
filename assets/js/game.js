let canvas;
let world;
let keyboard = new Keyboard();
let btnPlayPauseMusic = document.getElementById('btn-play-pause-music');
let btnPlayPauseSound = document.getElementById('btn-play-pause-sound');
let screenGame = document.getElementById('screen-game');
let figureFullScreen = document.getElementById('figure-fullScreen');
let figureCloseFullScreen = document.getElementById('figure-close-fullScreen');
let btnStartGame = document.getElementById('btn-start');
let isMusicOn = false;
//let musicVolume = document.getElementById('music-volume');
let soundOn = false;
//let soundVolume;
	
// function init() {
//   setInterval(() => {
//     //musicGame.volume = turnVolumeMusic();
//     //objectTakedAudio.volume = turnVolumeSound();
//     console.log('volumen', objectTakedAudio.volume);
//   }, 100);
// };

function initGame(){
  delete world;
  clearAllIntervals();
  initLevel();
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  document.getElementById('presentation').classList.add('d-none');
  document.getElementById('canvas').classList.remove('d-none');
  // document.getElementById('btn-start').classList.add('d-none');
  showimgMusicPanelBtn();
  playPauseMusic();
  playSoundCharacters();
  btnStartGame.textContent = 'restart';
  btnStartGame.classList.add('restart');
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) {
    window.clearInterval(i);
  }
}
function showimgMusicPanelBtn() {
  document.getElementById('music-figure').classList.remove('hidden');
  document.getElementById('music-figure').classList.add('show');
}

function playPauseMusic() {
  if(btnStartGame.classList.contains('restart')){
    if(isMusicOn){
      musicGame.play();
      btnPlayPauseMusic.innerHTML = '<svg class="img-button cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>';
    }else{
      musicGame.pause();
      btnPlayPauseMusic.innerHTML = '<svg class="img-button cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>';
    }
  }else{
    changeStateMusic();
  }
}

function changeStateMusic() {
  isMusicOn = !isMusicOn;
  if(isMusicOn){
    musicGame.play();
    btnPlayPauseMusic.innerHTML = '<svg class="img-button cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>';
  }else{
    musicGame.pause();
    btnPlayPauseMusic.innerHTML = '<svg class="img-button cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>';
  }
}

function changeStateSound() {
  soundOn = !soundOn;
  if(soundOn){
    btnPlayPauseSound.innerHTML = '<svg class="img-button cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>';
  }else{
    btnPlayPauseSound.innerHTML = '<svg class="img-button cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>';
  }
}

// function turnVolumeMusic(){
//   return musicVolume.value;
// }

function playSoundCharacters() {
  if(btnStartGame.classList.contains('restart')){
    if(soundOn){
      btnPlayPauseSound.innerHTML = '<svg class="img-button cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>';
    }else{
      btnPlayPauseSound.innerHTML = '<svg class="img-button cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>';
    }
  }else{
    changeStateSound();
  }
}

// function turnVolumeSound(){
//   let volumeSound = document.getElementById('sound-volume').value;
//   //console.log(volumeSound);
//   return volumeSound;
// }

function viewFullScreen() {
  openFullscreen(screenGame);
}

/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

function activePanelMusic() {
  let panelMusic = document.getElementById('music-panel');
  panelMusic.classList.remove('d-none');
  panelMusic.classList.add('d-flex');
}

function disablePanelMusic() {
  let panelMusic = document.getElementById('music-panel');
  panelMusic.classList.add('d-none')
  panelMusic.classList.remove('d-flex')
}

function stopPropagation(event) {
  event.stopPropagation();
}

function showCloseFullScrenIcon() {
  figureCloseFullScreen.classList.remove('d-none');
  figureFullScreen.classList.add('d-none');
}

function showFullScreenIcon() {
  figureFullScreen.classList.remove('d-none');
  figureCloseFullScreen.classList.add('d-none');
}

// window.addEventListener('keyup', (e)=>{
//   //console.log(e);
//   e.preventDefault();
//   if(e.key == 'Escape'){
//     showFullScreenIcon();
//   }
// })

document.addEventListener("fullscreenchange", function() {
  let elem = document.fullscreenElement;
  console.log('outside',elem);
  if(elem){
    console.log('inside',elem);
    showFullScreenIcon();
  }
  // }else{
  //   showCloseFullScrenIcon();
  // }
});


// window.addEventListener('keydown', (e)=>{
//   //console.log(e);
//   if(e.keyCode == 39){
//     keyboard.right = true;
//   }
//   if(e.keyCode == 37){
//     keyboard.left = true;
//   }
//   if(e.keyCode == 38){
//     keyboard.up = true;
//   }
//   if(e.keyCode == 40){
//     keyboard.down = true;
//   }
//   if(e.keyCode == 32){
//     keyboard.space = true;
//   }
//   if(e.keyCode == 65){
//     keyboard.a = true;
//   }
//   // if(e.keyCode == 83){
//   //   keyboard.s = true;
//   // }
// });

// window.addEventListener('keyup', (e)=>{
//   if(e.keyCode == 39){
//     keyboard.right = false;
//   }
//   if(e.keyCode == 37){
//     keyboard.left = false;
//   }
//   if(e.keyCode == 38){
//     keyboard.up = false;
//   }
//   if(e.keyCode == 40){
//     keyboard.down = false;
//   }
//   if(e.keyCode == 32){
//     keyboard.space = false;
//   }
//   if(e.keyCode == 65){
//     keyboard.a = false;
//   }
//   if(e.keyCode == 83){
//     keyboard.s = true;
//     setTimeout(() => {
//       keyboard.s = false;
//     }, 10);
//   }
//   if(e.keyCode == 68){
//     keyboard.d = true;
//     setTimeout(() => {
//       keyboard.d = false;
//     }, 10);
//   }
// });
