/**
 * That create an instance of Objectbar
 */
class ObjectBar extends StatusBar{
  /**
   * Imgaes of the object bar
   */
  arrayImages = [
    'assets/img/object-bar/0.png',
    'assets/img/object-bar/20.png',
    'assets/img/object-bar/40.png',
    'assets/img/object-bar/60.png',
    'assets/img/object-bar/80.png',
    'assets/img/object-bar/100.png',
  ];
  /**
   * Initial value of the bar
   */
  percentage = 0;
  /**
   * position y in the screen
   */
  y = 50;
  /**
   * height of the bar
   */
  height = 50;
  
   /**
   * Constructs a new Objectbar instance.
   */
  constructor(){
    super();
    this.loadImages(this.arrayImages);
    this.setPercentage(this.percentage, this.arrayImages);
  }
}