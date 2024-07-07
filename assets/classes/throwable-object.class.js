class ThrowableObject extends Treasure{
  offset = {
    top:0,
    right:-15,
    bottom: 0,
    left: -15
  } 
  constructor(x, y){
    super();
    this.loadInitialPositionImage('assets/img/weapons/5.png')
    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 60;
  }

  throwRight(){
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;   
    }, 50);
  }

  throwLeft(){
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x -= 10;   
    }, 50);
  }
};