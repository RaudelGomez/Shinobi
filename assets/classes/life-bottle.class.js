/**
 * That create an instance of LifeBottle
 */
class LifeBottle extends Treasure{
  /**
   * Value of the Treasures taked
   */
  valueTreasure = 5; 

  /**
   * Constructs a new LifeBottle instance.
   * Load the imgs and set them in the game in a random way
   */
  constructor(){
    super();
    this.loadInitialPositionImage('assets/img/weapons/3.png')
    this.x = 200 + Math.random() * 500 * this.countStage;
    this.y = 290;
  }
};