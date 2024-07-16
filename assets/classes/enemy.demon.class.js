/**
 * That create an instance of Demon
 */
class Demon extends Enemy {
  y = -100; 
  height = 600; 
  width = 600; 
  enemyLifeTaked = 5; 
  walkingImgs = [
    'assets/img/enemies/demon/Walk1.png',
    'assets/img/enemies/demon/Walk2.png',
    'assets/img/enemies/demon/Walk3.png',
    'assets/img/enemies/demon/Walk4.png',
    'assets/img/enemies/demon/Walk5.png',
    'assets/img/enemies/demon/Walk6.png',
  ];
  attackImgs = [
    'assets/img/enemies/demon/Attack1.png',
    'assets/img/enemies/demon/Attack2.png',
    'assets/img/enemies/demon/Attack3.png',
    'assets/img/enemies/demon/Attack4.png',
  ];
  deadImgs = [
    'assets/img/enemies/demon/Death6.png',
  ];
   /**
    * That is for making a frame in the Photo to know when the objects are colliding with another
    */
  offset = {
    top: 230,
    right: 280,
    bottom: 150,
    left: 150
  };

  /**
   * Constructs a new Demon instance.
   * This function load all imgs and set the speed, how fast move the enemy.
   * Also animate the enemy
   */
  constructor() {
    super().loadInitialPositionImage(this.walkingImgs[0]);
    this.x = 600 + Math.random() * 500 * this.countStage; // Sets initial horizontal position randomly
    this.loadImages(this.walkingImgs); // Loads walking images
    this.loadImages(this.attackImgs); // Loads attack images
    this.loadImages(this.deadImgs); // Loads death images
    this.speed = 0.20 + Math.random() * 0.5; // Sets speed randomly
    this.animate(this.walkingImgs); // Starts animation with walking images
  }
}
