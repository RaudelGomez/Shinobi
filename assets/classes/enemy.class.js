class Enemy extends MovableObject{
  otherDirection = true;
  intervalMove;
  intervalAnimation;
  enemyLifeTaked = 50;
  bigSize = true; 

  // //Audio
  // enemyKilledAudio = new Audio('assets/audio/enemy_killed.mp3');

  animate(imgs){
    if(this.life > 0){
      this.movementEnemy();
      this.animationEnemy(imgs);
    }
  }

  movementEnemy(){
    this.intervalMove = setInterval(() => {
      this.moveLeft(this.speed);
    }, 1000 / 60);
  }

  animationEnemy(imgs){
    this.intervalAnimation = setInterval(() => {
      this.playAnimation(imgs);
    }, 200);
  }

  dead(imgs){
    this.soundEnemyKilled();
    this.intervalAnimation = setInterval(() => {
      this.playAnimation(imgs);
    }, 200);
  }

  soundEnemyKilled(){
    if(soundOn){
      enemyKilledAudio.play();
      enemyKilledAudio.volume = 0.1; 
    }
  }
}