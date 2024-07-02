class MovableObject {
  x = 100;
  y = 150;
  img;
  height = 200;
  width = 100;
  imageCache = {};

  loadImage(path){
    this.img = new Image(); //this.img = document.getElementById('image') <img id="image" src="">
    this.img.src = path;
  }

  loadImages(imgArray){
    imgArray.forEach(path => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  walkRight(){
    console.log('Move right');
  }

  walkLeft(){
    
  }

  runRight(){

  }

  runLeft(){

  }

  attackNormal(){

  }

  attackSpell(){

  }

  hurt(){

  }

  dead(){

  }

  shield(){

  }
}