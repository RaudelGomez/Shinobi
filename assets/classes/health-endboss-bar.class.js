/**
 * That create an instance of HealthbarEndBoss
 */
class HealthBarEndBoss extends StatusBar{
  arrayImages = [
    'assets/img/endboss-health-bar/0.png',
    'assets/img/endboss-health-bar/20.png',
    'assets/img/endboss-health-bar/40.png',
    'assets/img/endboss-health-bar/60.png',
    'assets/img/endboss-health-bar/80.png',
    'assets/img/endboss-health-bar/100.png',
  ];

  /**
   * Constructs a new HealtBarEndBoss instance.
   * Load the bar and set how much health in realtime
   */
  constructor(){
    super();
    this.loadImages(this.arrayImages);
    this.setPercentage(this.percentage, this.arrayImages);
  }
}