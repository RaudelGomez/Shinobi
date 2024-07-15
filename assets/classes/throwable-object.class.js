/**
 * That create an instance of throwableObject
 */
class ThrowableObject extends Treasure {
  offset = {
    top: 0,
    right: -15,
    bottom: 0,
    left: -15
  } // Offset values to adjust the position of the throwable object
  intervalInTheAir; // Interval ID for managing the throwable object's movement in the air
  imgWeaponThrowed; // Image used for the throwable weapon

  /**
   * Constructor for the ThrowableObject class.
   * @param {number} x - The initial x-coordinate position of the throwable object.
   * @param {number} y - The initial y-coordinate position of the throwable object.
   * @param {string} img - The image path for the throwable weapon.
   */
  constructor(x, y, img) {
    super(); // Call the constructor of the Treasure superclass
    this.x = x; // Set the initial x-coordinate position
    this.y = y; // Set the initial y-coordinate position
    this.imgWeaponThrowed = img; // Set the image for the throwable weapon
    this.width = 25; // Set the width of the throwable object
    this.height = 60; // Set the height of the throwable object
    this.loadInitialPositionImage(this.imgWeaponThrowed); // Load the initial image for the throwable object
  }

  /**
   * Throws the object to the right.
   * Applies gravity and moves the object to the right at regular intervals.
   */
  throwRight() {
    this.speedY = 30; // Initial vertical speed for the throwable object
    this.applyGravity(); // Apply gravity to the throwable object
    this.intervalInTheAir = setInterval(() => {
      this.x += 10; // Move the object to the right by 10 units at each interval
    }, 50); // Interval of 50 milliseconds
  }

  /**
   * Throws the object to the left.
   * Applies gravity and moves the object to the left at regular intervals.
   */
  throwLeft() {
    this.speedY = 30; // Initial vertical speed for the throwable object
    this.applyGravity(); // Apply gravity to the throwable object
    this.intervalInTheAir = setInterval(() => {
      this.x -= 10; // Move the object to the left by 10 units at each interval
    }, 50); // Interval of 50 milliseconds
  }
};
