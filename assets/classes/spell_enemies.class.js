/**
 * That create an instance of SpellEnemy.
 */
class SpellEnemy extends MovableObject{
  /**
   * That is the height, width and position x and y of the screen showed
   */
  width = 100;
  height = 100;
  otherDirection = true;
  img;
  // Offset values for collision detection
  offset = {
    top: 20,
    right:20,
    bottom: 20,
    left: 20
  }
  /**
   * damage tha provoke that spell in the character
   */
  damage = 0.8;
  intervalSpellBoss;
  /**
   * array images attack
   */
  throwingSomethingImgs = [
    'assets/img/enemies/dragon/Fire_Attack1.png',
    'assets/img/enemies/dragon/Fire_Attack2.png',
    'assets/img/enemies/dragon/Fire_Attack3.png',
    'assets/img/enemies/dragon/Fire_Attack4.png',
    'assets/img/enemies/dragon/Fire_Attack5.png',
    'assets/img/enemies/dragon/Fire_Attack6.png',
    'assets/img/enemies/dragon/attack4Boss.png'
  ];

  /**
   * /**
   * Constructs a new SpellEnemy instance.
   * @param {Number} x - position x in the screen
   * @param {Number} y - position y in the screen
   */
  constructor(x, y){
    super();
    this.x = x;
    this.y = y;
    this.loadInitialPositionImage(this.throwingSomethingImgs[6]);
  }

  /**
   * That function move left and down ath the same time that spell throwed
   */
  moveLeftSpell(){
    this.intervalSpellBoss = setInterval(() => {
      this.x -= 5;
      this.y += 2;
    }, 1000 / 60);
  }
};