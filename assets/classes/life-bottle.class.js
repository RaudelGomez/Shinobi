class LifeBottle extends Treasure{
  valueTreasure = 30;
  constructor(){
    super();
    this.loadInitialPositionImage('assets/img/weapons/3.png')
    this.x = 200 + Math.random() * 500 * this.countStage;
    this.y = 290;
  }
};