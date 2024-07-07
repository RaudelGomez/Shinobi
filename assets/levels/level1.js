let drawObject = new DrawableObject();
let object_x = 200 + Math.random() * 500 * drawObject.countStage;
let object_y = 100 + Math.random() * 80 * drawObject.countStage;
const level1 = new Level(
  [new Cloud(), new Cloud(), new Cloud()],
  [],
  [],
  [new LifeBottle(), new LifeBottle(), new LifeBottle(), new LifeBottle(), new LifeBottle(), new LifeBottle(), new LifeBottle(), new LifeBottle() ],
  [new ThrowableObject(object_x, object_y) ],
  [new SpellObject(), new SpellObject(), new SpellObject(), new SpellObject(), ],
);


//new Lizard(), new Lizard(), new Lizard(), new Lizard(), new Lizard(), new Endboss()