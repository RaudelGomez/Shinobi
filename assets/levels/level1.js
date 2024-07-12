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
]
deadImgs = [
  'assets/img/enemies/dragon/Death1.png',
  'assets/img/enemies/dragon/Death2.png',
  'assets/img/enemies/dragon/Death3.png',
  'assets/img/enemies/dragon/Death4.png',
  'assets/img/enemies/dragon/Death5.png',
];

// walkingImgs = [
//   'assets/img/enemies/jinn_animation/Flight1.png',
//   'assets/img/enemies/jinn_animation/Flight2.png',
//   'assets/img/enemies/jinn_animation/Flight3.png',
//   'assets/img/enemies/jinn_animation/Flight4.png',
// ];

// attackImgs = [
//   'assets/img/enemies/jinn_animation/Attack1.png',
//   'assets/img/enemies/jinn_animation/Attack2.png',
//   'assets/img/enemies/jinn_animation/Attack3.png',
//   'assets/img/enemies/jinn_animation/Attack4.png',
// ];
// deadImgs = [
//   'assets/img/enemies/jinn_animation/Death1.png',
//   'assets/img/enemies/jinn_animation/Death2.png',
//   'assets/img/enemies/jinn_animation/Death3.png',
//   'assets/img/enemies/jinn_animation/Death4.png',
//   'assets/img/enemies/jinn_animation/Death5.png',
//   'assets/img/enemies/jinn_animation/Death6.png',
// ]

function initLevel(){
level1 = new Level(
  [],
  [],
  [],
  [],
  [],
  [],
);

function setEnemies() {
  //level1.enemies = [];
  //level1.enemies = [new Endboss(walkingImgs, attackImgs, deadImgs, 800, 800, -250)];
  level1.enemies = [new Lizard(), new Lizard(), new Demon(), new Demon(), new Endboss(walkingImgs, attackImgs, deadImgs, 800, 800, -250)];
}


function setClouds() {
  level1.clouds = [];
  level1.clouds = [new Cloud(), new Cloud(), new Cloud()];
}

function setLifeBottles() {
  //level1.lifeBottles = [];
  level1.lifeBottles = [new LifeBottle(), new LifeBottle(), new LifeBottle(), new LifeBottle(), new LifeBottle(), new LifeBottle(), new LifeBottle(), new LifeBottle()];
}

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




//new Lizard(), new Lizard(), new Lizard(), new Lizard(), new Lizard(), new Endboss()