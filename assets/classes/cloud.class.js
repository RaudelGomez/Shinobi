/**
 * This class is to create instance of clouds
 */
class Cloud extends MovableObject{
  /**
   * The variables, that dont have comment, its because it was explained in he super class (Drawable-objects)
   */
  y = 0;
  width = 500;
  height = 180;
  /**
   * All intervals of the clouds
   */
  intervalClouds;

  /**
	 * That is the function tha run every function when the instance is created.
	 */
  constructor(){
    super().loadInitialPositionImage('assets/img/objects/otherObjects/cloudsGeneral.png');
    this.x = 100 + Math.random() * this.countStage * 720;
    this.animate();
  }

  /**
   * That function moves the clouds in the left postion
   */
  animate(){
    this.intervalClouds = setInterval(() => {
      this.moveLeft(this.speed);
    }, 1);
  }
}