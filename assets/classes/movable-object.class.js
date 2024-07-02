class MovableObject {
  x = 100;
  y = 150;
  img;
  height = 200;
  width = 100;

  loadImage(path){
    this.img = new Image(); //this.img = document.getElementById('image') <img id="image" src="">
    this.img.src = path;
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