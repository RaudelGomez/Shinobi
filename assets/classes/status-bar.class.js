class StatusBar extends DrawableObject {
  percentage = 100; // Initial percentage value for the status bar
  x = 30; // X-coordinate position of the status bar
  y = 0; // Y-coordinate position of the status bar
  width = 200; // Width of the status bar
  height = 60; // Height of the status bar
  arrayImages = []; // Array to store image paths for different status bar states

  /**
   * Sets the percentage of the status bar and updates the displayed image.
   * @param {number} percentage - The new percentage value for the status bar.
   */
  setPercentage(percentage) {
    this.percentage = percentage; // Update the percentage value
    let path = this.arrayImages[this.resolvePercentageImgs()]; // Get the appropriate image path based on percentage
    this.img = this.imageCache[path]; // Update the status bar image
  }

  /**
   * Determines the appropriate image index based on the current percentage.
   * @returns {number} - The index of the image to be used for the current percentage.
   */
  resolvePercentageImgs() {
    if (this.percentage == 100) {
      return 5; // Return index for 100% image
    } else if (this.percentage >= 80) {
      return 4; // Return index for 80% to 99% image
    } else if (this.percentage >= 60) {
      return 3; // Return index for 60% to 79% image
    } else if (this.percentage >= 40) {
      return 2; // Return index for 40% to 59% image
    } else if (this.percentage < 39 && this.percentage > 0) {
      return 1; // Return index for 1% to 39% image
    } else {
      return 0; // Return index for 0% image
    }
  }
}
