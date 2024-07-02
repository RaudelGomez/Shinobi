class BackgroundObject extends MovableObject{
  width = 720;

  constructor(img, x, y, height){
    super().loadImage(img);
    this.x = x;
    this.y = y;
    this.height = height;
  }
}