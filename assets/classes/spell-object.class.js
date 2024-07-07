class SpellObject extends Treasure{
  valueTreasure = 20;
  constructor(){
    super();
    this.loadInitialPositionImage('assets/img/weapons/14.png')
    this.x = 200 + Math.random() * 500 * this.countStage;
    this.y = 100 + Math.random() * 20 * this.countStage;
  }
};