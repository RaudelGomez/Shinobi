/**
 * That create an instance of Lizard
 */
class Lizard extends Enemy{
  y = 90; // Initial vertical position of the lizard
  height = 400; // Height of the lizard
  width = 400; // Width of the lizard
  enemyLifeTaked = 50; // Amount of life the lizard takes from the player
  bigSize = false; // Indicates if the enemy is of a big size

  // Array of images for the lizard's walking animation
  walkingImgs = [
    'assets/img/enemies/lizard/Walk1.png',
    'assets/img/enemies/lizard/Walk2.png',
    'assets/img/enemies/lizard/Walk3.png',
    'assets/img/enemies/lizard/Walk4.png',
    'assets/img/enemies/lizard/Walk5.png',
    'assets/img/enemies/lizard/Walk6.png',
  ];

  // Array of images for the lizard's attack animation
  attackImgs = [
    'assets/img/enemies/lizard/Attack1.png',
    'assets/img/enemies/lizard/Attack2.png',
    'assets/img/enemies/lizard/Attack3.png',
    'assets/img/enemies/lizard/Attack4.png',
    'assets/img/enemies/lizard/Attack5.png',
  ];

  // Array of images for the lizard's death animation
  deadImgs = [
    // 'assets/img/enemies/lizard/Death1.png',
    // 'assets/img/enemies/lizard/Death2.png',
    // 'assets/img/enemies/lizard/Death3.png',
    // 'assets/img/enemies/lizard/Death4.png',
    // 'assets/img/enemies/lizard/Death5.png',
    'assets/img/enemies/lizard/Death6.png',
  ];

  // Offset values for collision detection
  offset = {
    top:160,
    right:140,
    bottom: 150,
    left: 135
  } 

  /**
   * Constructs a new Lizard instance.
   */
  constructor(){
    super().loadInitialPositionImage(this.walkingImgs[0]);
    this.x = 500 + Math.random() * 500 * this.countStage;
    this.loadImages(this.walkingImgs);
    this.loadImages(this.attackImgs);
    this.loadImages(this.deadImgs);
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate(this.walkingImgs);
  } 
}