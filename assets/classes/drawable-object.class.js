/**
 * That is the super class of all object in the game
 */
class DrawableObject {
  /**
   * That Variable set how many screen the character has to move to get the end
   */
  countStage = 10;
  x = 100;
  y = 150;
  height = 200;
  width = 100;
  img;
  currentImage = 0;
  /**
   * That is Variable, where every subclass save the Photos, that they need to be showed in the screen
   */
  imageCache = {};
   /**
    * That is for makes a frame in the Photo to know when the objects are colliding with another
    */
   offset = {
    top:0,
    right:0,
    bottom: 0,
    left: 0
  } 

  /**
   * This function load one images
   * @param {string} path - path of the image to load 
   */
  loadInitialPositionImage(path){
    this.img = new Image(); 
    this.img.src = path;
  }

  /**
   * This function load every Photos of the array.
   * @param {Array} imgArray - that is the Array of Photos to animate
   */
  loadImages(imgArray){
    imgArray.forEach(path => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * This function draw every image
   * @param {ctx} context - context of Canvas
   */
  draw(context){
    try {
      context.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (error) {
      console.warn(error);
    }
  };

  /**
   * This function draw the frame of every images
   * @param {context} context - context of Canvas
   */
  drawFrame(context){
    if(this instanceof Character || this instanceof Enemy || this instanceof Treasure || this instanceof SpellEnemy ){
      context.beginPath();
      context.lineWidth = "4";
      context.strokeStyle = "transparent";
      context.rect(this.x, this.y, this.width, this.height);
      context.stroke();

      context.beginPath();
      context.lineWidth = "1";
      context.strokeStyle = "transparent";
      context.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right- this.offset.left, this.height - this.offset.bottom - this.offset.top);
      context.stroke();
    }
  }
}