/**
 * That create an instance of Lizard
 */
class Lizard extends Enemy{
  y = 90; 
  height = 400; 
  width = 400; 
  /**
   * Amount of life the lizard takes from the player
   */
  enemyLifeTaked = 50;
  /**
   * Indicates if the enemy is of a big size
   *  
   */ 
  bigSize = false; 
  walkingImgs = [
    'assets/img/enemies/lizard/Walk1.png',
    'assets/img/enemies/lizard/Walk2.png',
    'assets/img/enemies/lizard/Walk3.png',
    'assets/img/enemies/lizard/Walk4.png',
    'assets/img/enemies/lizard/Walk5.png',
    'assets/img/enemies/lizard/Walk6.png',
  ];
  attackImgs = [
    'assets/img/enemies/lizard/Attack1.png',
    'assets/img/enemies/lizard/Attack2.png',
    'assets/img/enemies/lizard/Attack3.png',
    'assets/img/enemies/lizard/Attack4.png',
    'assets/img/enemies/lizard/Attack5.png',
  ];
  deadImgs = [
    'assets/img/enemies/lizard/Death6.png',
  ];
  /**
    * That is for makes a frame in the Photo to know when the objects are colliding with another
    */
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