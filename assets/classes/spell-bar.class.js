/**
 * That create an instance of Spellbar
 */
class SpellBar extends StatusBar{
  /**
   * Images of the Spellbar bar
   */
  arrayImages = [
    'assets/img/spell-bar/0.png',
    'assets/img/spell-bar/20.png',
    'assets/img/spell-bar/40.png',
    'assets/img/spell-bar/60.png',
    'assets/img/spell-bar/80.png',
    'assets/img/spell-bar/100.png',
  ];
  /**
   * Initial value of the bar
   */
  percentage = 0;
  /**
   * position y in the screen
   */
  y = 90;
  /**
   * height of the bar
   */
  height = 50;

    /**
   * Constructs a new Spellbar instance.
   */
  constructor(){
    super();
    this.loadImages(this.arrayImages);
    this.setPercentage(this.percentage, this.arrayImages);
  }
}