/**
 * That create an instance of LifeBottle
 */
class LifeBottle extends Treasure{
  valueTreasure = 5; // Value of the Treasures taked

  /**
   * Constructs a new LifeBottle instance.
   */
  constructor(){
    super();
    this.loadInitialPositionImage('assets/img/weapons/3.png')
    this.x = 200 + Math.random() * 500 * this.countStage;
    this.y = 290;
  }
};