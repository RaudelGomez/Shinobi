/**
 * This class is the model of the background of the level
 */
class BackgroundObject extends MovableObject{
  width = 720;
  otherDirection;

  /**
   * 
   * @param {String} img - That is the path of the photo of the background
   * @param {Number} x - That is the position of the Photo in the screen in the coordinate -x
   * @param {Number} y -That is the position of the Photo in the screen in the coordinate -y
   * @param {Number} height - That is the height of the screen
   * @param {Boolean} otherDirection -That is variable to show a Photo (normal or mirrow effect) 
   */
  constructor(img, x, y, height, otherDirection){
    super().loadInitialPositionImage(img);
    this.x = x;
    this.y = y;
    this.height = height;
    this.otherDirection = otherDirection;
  }
}