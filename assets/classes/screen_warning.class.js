/**
 * That create an instance of Screen when the game is over
 */
class Screen extends MovableObject{
  /**
   * That is the height, width and position x and y of the screen showed
   */
  width = 720;
  height = 480;
  x;
  y;

  /**
   * Constructs a new Screen instance.
   */
  constructor(x, y, img){
    super();
    this.x = x
    this.y = y;
    this.img = img;
    this.loadInitialPositionImage(this.img);
  }
}