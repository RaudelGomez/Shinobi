/**
 * That create an instance of Demon
 */
class Demon extends Enemy {
  y = -100; // Initial vertical position of the demon
  height = 600; // Height of the demon
  width = 600; // Width of the demon
  enemyLifeTaked = 5; // Amount of life the demon takes from the player

  // Array of images for the demon's walking animation
  walkingImgs = [
    'assets/img/enemies/demon/Walk1.png',
    'assets/img/enemies/demon/Walk2.png',
    'assets/img/enemies/demon/Walk3.png',
    'assets/img/enemies/demon/Walk4.png',
    'assets/img/enemies/demon/Walk5.png',
    'assets/img/enemies/demon/Walk6.png',
  ];

  // Array of images for the demon's attack animation
  attackImgs = [
    'assets/img/enemies/demon/Attack1.png',
    'assets/img/enemies/demon/Attack2.png',
    'assets/img/enemies/demon/Attack3.png',
    'assets/img/enemies/demon/Attack4.png',
  ];

  // Array of images for the demon's death animation
  deadImgs = [
    'assets/img/enemies/demon/Death6.png',
  ];

  // Offset values for collision detection
  offset = {
    top: 230,
    right: 280,
    bottom: 150,
    left: 150
  };

  /**
   * Constructs a new Demon instance.
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
