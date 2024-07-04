class BackgroundObject extends MovableObject{
  width = 720;
  otherDirection;

  constructor(img, x, y, height, otherDirection){
    super().loadInitialPositionImage(img);
    this.x = x;
    this.y = y;
    this.height = height;
    this.otherDirection = otherDirection;
  }
}