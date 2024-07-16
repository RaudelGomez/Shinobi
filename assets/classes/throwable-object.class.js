/**
 * That create an instance of throwableObject
 */
class ThrowableObject extends Treasure {
  /**
    * That is for makes a frame in the Photo to know when the objects are colliding with another
    */
  offset = {
    top: 0,
    right: -15,
    bottom: 0,
    left: -15
  } 
  intervalInTheAir; 
  imgWeaponThrowed; 

  /**
   * Constructor for the ThrowableObject class.
   * Load the imgs and set them in the game in a random way
   * @param {number} x - The initial x-coordinate position of the throwable object.
   * @param {number} y - The initial y-coordinate position of the throwable object.
   * @param {string} img - The image path for the throwable weapon.
   */
  constructor(x, y, img) {
    super(); 
    this.x = x; 
    this.y = y; 
    this.imgWeaponThrowed = img; 
    this.width = 25; 
    this.height = 60; 
    this.loadInitialPositionImage(this.imgWeaponThrowed); 
  }

  /**
   * Throws the object to the right.
   * Applies gravity and moves the object to the right at regular intervals.
   */
  throwRight() {
    this.speedY = 30; 
    this.applyGravity(); 
    this.intervalInTheAir = setInterval(() => {
      this.x += 10; 
    }, 50); 
  }

  /**
   * Throws the object to the left.
   * Applies gravity and moves the object to the left at regular intervals.
   */
  throwLeft() {
    this.speedY = 30; 
    this.applyGravity(); 
    this.intervalInTheAir = setInterval(() => {
      this.x -= 10; 
    }, 50); 
  }
};
