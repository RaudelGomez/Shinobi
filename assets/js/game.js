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
let elem = document.fullscreenElement;

/**
 * Initializes the game by clearing intervals, deleting the world, initializing the level,
 * setting up the canvas and world, and starting the game.
 */
function initGame() {
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

/**
 * Starts the game by hiding the presentation screen and showing the canvas,
 * then displaying the guide button.
 */
function startingGame() {
  document.getElementById('presentation').classList.add('d-none');
  document.getElementById('canvas').classList.remove('d-none');
  document.getElementById('privacy-legal-data').classList.add('privacy-mobile');
  showBtnGuide();
}

/**
 * Toggles the visibility of the control guide.
 */
function showingControlGuide() {
  document.getElementById('presentation').classList.toggle('d-none');
  document.getElementById('canvas').classList.toggle('d-none');
}

/**
 * Displays the guide button.
 */
function showBtnGuide() {
  document.getElementById('guide-control').classList.remove('hidden-btn-guide');
  document.getElementById('guide-control').classList.add('show-btn-guide');
}

/**
 * Sets the text of the start game button to "restart" and adds the "restart" class.
 */
function settingTextRestart() {
  btnStartGame.textContent = 'restart';
  btnStartGame.classList.add('restart');
}

/**
 * Clears all active intervals.
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) {
    window.clearInterval(i);
  }
}

/**
 * Displays the music panel button.
 */
function showimgMusicPanelBtn() {
  document.getElementById('music-figure').classList.remove('hidden');
  document.getElementById('music-figure').classList.add('show');
}

/**
 * Toggles music playback.
 */
function playPauseMusic() {
  if (btnStartGame.classList.contains('restart')) {
    if (!musicEndBoss.paused) {
      musicEndBoss.pause();
    }
    musicTurnOn();
  } else {
    changeStateMusic();
  }
}

/**
 * Changes the state of the music (on/off) and updates the button accordingly.
 */
function changeStateMusic() {
  isMusicOn = !isMusicOn;
  musicTurnOn();
}

/**
 * Turns the music on or off based on the current state.
 */
function musicTurnOn() {
  if (isMusicOn) {
    musicGame.play();
    btnPlayPauseMusic.innerHTML = '<svg class="img-button cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>';
  } else {
    musicGame.pause();
    btnPlayPauseMusic.innerHTML = '<svg class="img-button cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>';
  }
}

/**
 * Changes the state of the sound (on/off) and updates the button accordingly.
 */
function changeStateSound() {
  soundOn = !soundOn;
  soundTurnOn();
}

/**
 * Turns the sound on or off based on the current state.
 */
function soundTurnOn() {
  if (soundOn) {
    btnPlayPauseSound.innerHTML = '<svg class="img-button cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>';
  } else {
    btnPlayPauseSound.innerHTML = '<svg class="img-button cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>';
  }
}

/**
 * Plays the sound for characters based on the current state.
 */
function playSoundCharacters() {
  if (btnStartGame.classList.contains('restart')) {
    soundTurnOn();
  } else {
    changeStateSound();
  }
}

/**
 * Sets the screen game element to fullscreen mode.
 */
function viewFullScreen() {
  openFullscreen(screenGame);
}

/**
 * Opens an element in fullscreen mode.
 * @param {HTMLElement} elem - The element to display in fullscreen.
 */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/**
 * Closes fullscreen mode.
 */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

/**
 * Activates the music panel.
 */
function activePanelMusic() {
  let panelMusic = document.getElementById('music-panel');
  panelMusic.classList.remove('d-none');
  panelMusic.classList.add('d-flex');
}

/**
 * Disables the music panel.
 */
function disablePanelMusic() {
  let panelMusic = document.getElementById('music-panel');
  panelMusic.classList.add('d-none');
  panelMusic.classList.remove('d-flex');
}

/**
 * Stops the propagation of the given event.
 * @param {Event} event - The event to stop propagation.
 */
function stopPropagation(event) {
  event.stopPropagation();
}

/**
 * Shows the icon for closing fullscreen mode.
 */
function showCloseFullScrenIcon() {
  figureCloseFullScreen.classList.remove('d-none');
  figureFullScreen.classList.add('d-none');
}

/**
 * Shows the icon for entering fullscreen mode.
 */
function showFullScreenIcon() {
  figureFullScreen.classList.remove('d-none');
  figureCloseFullScreen.classList.add('d-none');
}

/**
 * Listens for changes in fullscreen state and updates the fullscreen icon accordingly.
 */
document.addEventListener("fullscreenchange", function() {
  let elem = document.fullscreenElement;
  if (!elem) {
    showFullScreenIcon();
  }
});





