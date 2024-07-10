class ThrowableObject extends Treasure{
  offset = {
    top:0,
    right:-15,
    bottom: 0,
    left: -15
  } 
  intervalInTheAir;
  //imgWeapon = ['assets/img/weapons/5.png', 'assets/img/weapons/44.png'];
  imgWeaponThrowed;


  constructor(x, y, img){
    super();
    this.x = x;
    this.y = y;
    this.imgWeaponThrowed = img;
    this.width = 25;
    this.height = 60;
    this.loadInitialPositionImage(this.imgWeaponThrowed);
  }

  throwRight(){
    this.speedY = 30;
    this.applyGravity();
    this.intervalInTheAir = setInterval(() => {
      this.x += 10;   
    }, 50);
  }

  throwLeft(){
    this.speedY = 30;
    this.applyGravity();
    this.intervalInTheAir = setInterval(() => {
      this.x -= 10;   
    }, 50);
  };
};