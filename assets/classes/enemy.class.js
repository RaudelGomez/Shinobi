class Enemy extends MovableObject{
  otherDirection = true;
  intervalMove;
  intervalAnimation;
  enemyLifeTaked = 0.5;

  //Audio
  enemyKilledAudio = new Audio('assets/audio/enemy_killed.mp3');

  animate(imgs){
    this.intervalMove = setInterval(() => {
      this.moveLeft(this.speed);
    }, 1000 / 60);

    this.intervalAnimation = setInterval(() => {
      this.playAnimation(imgs);
    }, 200);
  }

  dead(imgs){
    this.enemyKilledAudio.play();
    this.enemyKilledAudio.volume = 0.1; 
    this.intervalAnimation = setInterval(() => {
      this.playAnimation(imgs);
    }, 200);
  }
}