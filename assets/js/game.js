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
let soundOn = false;

	
function initGame(){
  clearAllIntervals();
  delete world;
  initLevel();
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  startingGame();
  showimgMusicPanelBtn();
  playPauseMusic();
  playSoundCharacters();
  settingTextRestart();
}

function startingGame() {
  document.getElementById('presentation').classList.add('d-none');
  document.getElementById('canvas').classList.remove('d-none');
  showBtnGuide();
}

function showingControlGuide(){
  document.getElementById('presentation').classList.toggle('d-none');
  document.getElementById('canvas').classList.toggle('d-none');
}

function showBtnGuide() {
  document.getElementById('guide-control').classList.remove('hidden-btn-guide');
  document.getElementById('guide-control').classList.add('show-btn-guide');
}

function settingTextRestart() {
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
    if(!musicEndBoss.paused){
      musicEndBoss.pause();
    }
    musicTurnOn();
  }else{
    changeStateMusic();
  }
}

function changeStateMusic() {
  isMusicOn = !isMusicOn;
  musicTurnOn();
}

function musicTurnOn(){
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
  soundTurnOn();
}

function soundTurnOn() {
  if(soundOn){
    btnPlayPauseSound.innerHTML = '<svg class="img-button cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>';
  }else{
    btnPlayPauseSound.innerHTML = '<svg class="img-button cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>';
  }
}

function playSoundCharacters() {
  if(btnStartGame.classList.contains('restart')){
    soundTurnOn();
  }else{
    changeStateSound();
  }
}

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

