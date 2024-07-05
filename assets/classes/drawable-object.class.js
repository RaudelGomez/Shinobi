class DrawableObject {
  countStage = 2;
  x = 100;
  y = 150;
  height = 200;
  width = 100;
  img;
  currentImage = 0;
  imageCache = {};
   //Frame Objects
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
    this.img = new Image(); //this.img = document.getElementById('image') <img id="image" src="">
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
    context.drawImage(this.img, this.x, this.y, this.width, this.height);
  };

  /**
   * This function draw the frame of every images
   * @param {*} context - context of Canvas
   */
  drawFrame(context){
    //Drawing only instance of Character or Enemy
    if(this instanceof Character || this instanceof Enemy || this instanceof Treasure ){
      // context.beginPath();
      // context.lineWidth = "4";
      // context.strokeStyle = "blue";
      // context.rect(this.x, this.y, this.width, this.height);
      // context.stroke();

      context.beginPath();
      context.lineWidth = "1";
      context.strokeStyle = "red";
      context.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right- this.offset.left, this.height - this.offset.bottom - this.offset.top);
      context.stroke();
    }
  }

}