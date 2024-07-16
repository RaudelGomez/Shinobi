/**
 * That create an instance of SpellObject
 */
class SpellObject extends Treasure{
  valueTreasure = 20; // Value of the Treasures taked
  spellImage; //Image

  /**
   * Load the imgs and set them in the game in a random way
   * @param {Number} x - position x of the image in the screen
   * @param {Number} y - position y of the image in the screen
   * @param {string} spellImage - path of the img
   */
  constructor(x, y, spellImage){
    super();
    this.spellImage = spellImage;
    this.x = x;
    this.y = y;
    this.loadInitialPositionImage(this.spellImage);
  }
};