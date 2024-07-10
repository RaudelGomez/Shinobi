
let audio = 'assets/audio/gameMusic.mp3';
let drawObject = new DrawableObject();
let object_x = 200 + Math.random() * 500 * drawObject.countStage;
let object_y = 100 + Math.random() * 80 * drawObject.countStage;
let level1 = new Level(
  [new Cloud(), new Cloud(), new Cloud()],
  [ new Endboss()],
  //[new Lizard(), new Lizard(), new Demon(), new Demon(), new Endboss()],
  [],
  [],
  // [new LifeBottle(), new LifeBottle(), new LifeBottle(), new LifeBottle(), new LifeBottle(), new LifeBottle(), new LifeBottle(), new LifeBottle() ],
  [],
  [],
  audio
);

function pushThrowableObjects() {
  for (let i = 0; i < 5; i++) {
    let drawObject = new DrawableObject();
    let object_x = 200 + Math.random() * 500 * drawObject.countStage;
    let object_y = 100 + Math.random() * 80 * drawObject.countStage;
    level1.throwableObjects.push(new ThrowableObject(object_x, object_y));
  }
}

function pushSpellObject() {
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


//new Lizard(), new Lizard(), new Lizard(), new Lizard(), new Lizard(), new Endboss()