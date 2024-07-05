class ThrowableObject extends Treasure{
  constructor(){
    super();
    this.loadInitialPositionImage('assets/img/weapons/5.png')
    this.x = 200 + Math.random() * 500 * this.countStage;
    this.y = 100 + Math.random() * 80 * this.countStage;
    this.width = 25;
    this.height = 60;
  }
};