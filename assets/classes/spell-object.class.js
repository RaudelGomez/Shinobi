class SpellObject extends Treasure{
  valueTreasure = 20;
  spellImage
  constructor(x, y, spellImage){
    super();
    this.spellImage = spellImage;
    this.x = x;
    this.y = y;
    this.loadInitialPositionImage(this.spellImage);
  }

};