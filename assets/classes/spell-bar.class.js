/**
 * That create an instance of Spellbar
 */
class SpellBar extends StatusBar{
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
  y = 90;
  height = 50;

  /**
   * Constructs a new Spellbar instance.
   * Load the bar and set the actual number of Spell
   */
  constructor(){
    super();
    this.loadImages(this.arrayImages);
    this.setPercentage(this.percentage, this.arrayImages);
  }
}