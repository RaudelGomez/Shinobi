/**
 * That create an instance of Screen when the game is over
 */
class Screen extends MovableObject{
  width = 720;
  height = 480;
  x;
  y;

  /**
   * Constructs a new Screen instance.
   * Load imgs when the character win or lose
   */
  constructor(x, y, img){
    super();
    this.x = x
    this.y = y;
    this.img = img;
    this.loadInitialPositionImage(this.img);
  }
}