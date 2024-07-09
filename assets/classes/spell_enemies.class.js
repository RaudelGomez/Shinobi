class SpellEnemy extends MovableObject{
  width = 500;
  height = 500;
  otherDirection = true;
  img;
  offset = {
    top:170,
    right:310,
    bottom: 270,
    left: 80
  } 
 
  damage = 5;
  intervalSpellBoss;
  throwingSomethingImgs = [
    'assets/img/enemies/dragon/Fire_Attack1.png',
    'assets/img/enemies/dragon/Fire_Attack2.png',
    'assets/img/enemies/dragon/Fire_Attack3.png',
    'assets/img/enemies/dragon/Fire_Attack4.png',
    'assets/img/enemies/dragon/Fire_Attack5.png',
    'assets/img/enemies/dragon/Fire_Attack6.png'
  ];
  constructor(x, y){
    super();
    this.x = x;
    this.y = y;
    this.loadInitialPositionImage(this.throwingSomethingImgs[0]);
  }

  moveLeftSpell(){
    this.intervalSpellBoss = setInterval(() => {
      this.x -= 5;
      this.y += 5;
    }, 1000 / 60);
  }
};