/**
 * That class instance an enemy
 */
class Enemy extends MovableObject {
  /**
   * Indicates the enemy's initial direction (facing left)
   */
  otherDirection = true; 
  intervalMove; 
  intervalAnimation; 
  /**
   * Amount of life the enemy takes from the player
   */
  enemyLifeTaked = 50; 
  bigSize = true; // Indicates if the enemy is of a big size

  /**
   * Animates the enemy if it is alive.
   * @param {Array} imgs - Array of images for animation
   */
  animate(imgs) {
    if (this.life > 0) {
      this.movementEnemy();
      this.animationEnemy(imgs);
    }
  }

  /**
   * Initiates the enemy's movement to the left.
   */
  movementEnemy() {
    this.intervalMove = setInterval(() => {
      this.moveLeft(this.speed);
    }, 1000 / 60);
  }

  /**
   * Initiates the enemy's animation sequence.
   * @param {Array} imgs - Array of images for animation
   */
  animationEnemy(imgs) {
    this.intervalAnimation = setInterval(() => {
      this.playAnimation(imgs);
    }, 200);
  }

  /**
   * Plays the enemy's death animation and sound.
   * @param {Array} imgs - Array of images for death animation
   */
  dead(imgs) {
    this.soundEnemyKilled();
    this.intervalAnimationDeath = setInterval(() => {
      this.playAnimation(imgs);
    }, 1000 / 60);
  }

  /**
   * Plays the sound effect when the enemy is killed.
   */
  soundEnemyKilled() {
    if (soundOn) {
      enemyKilledAudio.play();
      enemyKilledAudio.volume = 0.1; 
    }
  }

  /**
   * Enemy sound when attack
   */
  soundEnemyAttack() {
    if (soundOn) {
      monsterAttack.play();
      monsterAttack.volume = 0.1; 
    }
  }


}
