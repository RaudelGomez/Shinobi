class SpellEnemy extends MovableObject{
  width = 100;
  height = 100;
  // width = 500;
  // height = 500;
  otherDirection = true;
  img;
  offset = {
    top: 20,
    right:20,
    bottom: 20,
    left: 20
  } 
  // offset = {
  //   top:170,
  //   right:310,
  //   bottom: 270,
  //   left: 80
  // } 
  
 
  damage = 0.8;
  intervalSpellBoss;
  throwingSomethingImgs = [
    'assets/img/enemies/dragon/Fire_Attack1.png',
    'assets/img/enemies/dragon/Fire_Attack2.png',
    'assets/img/enemies/dragon/Fire_Attack3.png',
    'assets/img/enemies/dragon/Fire_Attack4.png',
    'assets/img/enemies/dragon/Fire_Attack5.png',
    'assets/img/enemies/dragon/Fire_Attack6.png',
    'assets/img/enemies/dragon/attack4Boss.png'
  ];
  constructor(x, y){
    super();
    this.x = x;
    this.y = y;
    this.loadInitialPositionImage(this.throwingSomethingImgs[6]);
  }

  moveLeftSpell(){
    this.intervalSpellBoss = setInterval(() => {
      this.x -= 5;
      this.y += 2;
    }, 1000 / 60);
  }
};