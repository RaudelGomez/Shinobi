let level1;
let drawObject = new DrawableObject();
let object_x = 200 + Math.random() * 500 * drawObject.countStage;
let object_y = 100 + Math.random() * 80 * drawObject.countStage;
walkingImgs = [
  'assets/img/enemies/dragon/Walk1.png',
  'assets/img/enemies/dragon/Walk1.png',
  'assets/img/enemies/dragon/Walk1.png',
  'assets/img/enemies/dragon/Walk1.png',
  'assets/img/enemies/dragon/Walk1.png',
  'assets/img/enemies/dragon/Walk1.png',
  'assets/img/enemies/dragon/Walk2.png',
  'assets/img/enemies/dragon/Walk3.png',
  'assets/img/enemies/dragon/Walk4.png',
  'assets/img/enemies/dragon/Walk5.png',
];
attackImgs = [
  'assets/img/enemies/dragon/Attack1.png',
  'assets/img/enemies/dragon/Attack2.png',
  'assets/img/enemies/dragon/Attack3.png',
  'assets/img/enemies/dragon/Attack4.png',
];
deadImgs = [
  'assets/img/enemies/dragon/Death1.png',
  'assets/img/enemies/dragon/Death2.png',
  'assets/img/enemies/dragon/Death3.png',
  'assets/img/enemies/dragon/Death4.png',
  'assets/img/enemies/dragon/Death5.png',
];

/**
 * Initializes the level by setting enemies, clouds, life bottles, throwable objects, and spell objects.
 */
function initLevel() {
  level1 = new Level(
    [],
    [],
    [],
    [],
    [],
    []
  );

  /**
   * Sets the enemies for the level.
   */
  function setEnemies() {
    level1.enemies = [
      new Lizard(), 
      new Lizard(), 
      new Demon(), 
      new Demon(), 
      new Lizard(), 
      new Lizard(), 
      new Demon(), 
      new Demon(), 
      new Lizard(), 
      new Lizard(), 
      new Demon(), 
      new Demon(), 
      new Lizard(), 
      new Lizard(), 
      new Demon(), 
      new Demon(), 
      new Endboss(walkingImgs, attackImgs, deadImgs, 800, 800, -250)
    ];
  }

  /**
   * Sets the clouds for the level.
   */
  function setClouds() {
    level1.clouds = [new Cloud(), new Cloud(), new Cloud()];
  }

  /**
   * Sets the life bottles for the level.
   */
  function setLifeBottles() {
    level1.lifeBottles = [new LifeBottle(), new LifeBottle(), new LifeBottle(), new LifeBottle(), new LifeBottle(), new LifeBottle(), new LifeBottle(), new LifeBottle()];
  }

  /**
   * Pushes throwable objects into the level.
   */
  function pushThrowableObjects() {
    level1.throwableObjects = [];
    for (let i = 0; i < 5; i++) {
      let drawObject = new DrawableObject();
      let object_x = 200 + Math.random() * 500 * drawObject.countStage;
      let object_y = 200 + Math.random() * 80;
      let objImage = 'assets/img/weapons/5.png';
      level1.throwableObjects.push(new ThrowableObject(object_x, object_y, objImage));
    }
  }

  /**
   * Pushes spell objects into the level.
   */
  function pushSpellObject() {
    level1.spellObjects = [];
    for (let i = 0; i < 5; i++) {
      let drawObject = new DrawableObject();
      let object_x = 200 + Math.random() * 500 * drawObject.countStage;
      let object_y = 100 + Math.random() * 20;
      let spellImage = 'assets/img/weapons/14.png';
      level1.spellObjects.push(new SpellObject(object_x, object_y, spellImage));
    }
  }

  pushThrowableObjects();
  pushSpellObject();
  setClouds();
  setEnemies();
  setLifeBottles();
}

