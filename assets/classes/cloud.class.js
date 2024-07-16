/**
 * This class is to create instance of clouds
 */
class Cloud extends MovableObject{
  y = 0;
  width = 500;
  height = 180;
  intervalClouds;

  /**
	 * That is the function tha run every function when the instance is created.
   * That set the imgs of the cloud and animate them.
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