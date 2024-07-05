class Treasure extends DrawableObject{
  constructor(){
    super();
    this.loadInitialPositionImage('assets/img/objects/objects-1/shadow/3.png')
    this.x = 200 + Math.random() * 500 * this.countStage;
    this.y = 290;
    this.width = 60;
    this.height = 60;
  }
}