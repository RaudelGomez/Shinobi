class StatusBar extends DrawableObject {
  /**
   * Initial percentage value for the status bar
   */
  percentage = 100; 
  x = 30; 
  y = 0; 
  width = 200; 
  height = 60; 
  arrayImages = []; 

  /**
   * Sets the percentage of the status bar and updates the displayed image.
   * @param {number} percentage - The new percentage value for the status bar.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.arrayImages[this.resolvePercentageImgs()];
    this.img = this.imageCache[path]; 
  }

  /**
   * Determines the appropriate image index based on the current percentage.
   * @returns {number} - The index of the image to be used for the current percentage.
   */
  resolvePercentageImgs() {
    if (this.percentage == 100) {
      return 5; 
    } else if (this.percentage >= 80) {
      return 4; 
    } else if (this.percentage >= 60) {
      return 3; 
    } else if (this.percentage >= 40) {
      return 2; 
    } else if (this.percentage < 39 && this.percentage > 0) {
      return 1; 
    } else {
      return 0; 
    }
  }
}
