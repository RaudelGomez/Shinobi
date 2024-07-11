let level1;
let drawObject = new DrawableObject();
let object_x = 200 + Math.random() * 500 * drawObject.countStage;
let object_y = 100 + Math.random() * 80 * drawObject.countStage;

function initLevel(){
let audio = 'assets/audio/gameMusic.mp3';
level1 = new Level(
  [],
  [],
  [],
  [],
  [],
  [],
  audio
);

function setEnemies() {
  level1.enemies = [];
  //level1.enemies = [new Endboss()];
  level1.enemies = [new Lizard(), new Lizard(), new Demon(), new Demon(), new Endboss()];
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
    let object_y = 100 + Math.random() * 80 * drawObject.countStage;
    let objImage = 'assets/img/weapons/5.png';
    level1.throwableObjects.push(new ThrowableObject(object_x, object_y, objImage));
  }
}

function pushSpellObject() {
  level1.spellObjects = [];
  for (let i = 0; i < 5; i++) {
    let drawObject = new DrawableObject();
    let object_x = 200 + Math.random() * 500 * drawObject.countStage;
    let object_y = 100 + Math.random() * 20 * drawObject.countStage;
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