/**
 * Movement constants can be combined using bitwise OR
 * for example UP (0001) | LEFT (0100) will result in the value UPLEFT (0101)
 * Movement constants can be checked using bitwise and
 * for example if(direction & (UP | LEFT)) is true if direction has the up and left values set
 * if(directions & LEFT) is true if the left value is set regardless of other values
 */
const DIRECTIONS = Object.freeze({
  /**
  * Constant representing no movement
  */
  'NONE': 0,

  /**
  * Constant representing upward movement
  */
  'UP': 1,

  /**
  * Constant representing leftward movement
  */
  'LEFT': 4,

  /**
  * Constant representing downward movement
  */
  'DOWN': 2,

  /**
  * Constant representing rightward movement
  */
  'RIGHT': 8
});

let play = {};

play.create = function () {
  let kek = this.game;
  this.testBox;
  this.player = new Character(kek);
  let centerScreenX = kek.world.centerX
  /* Not used
   let centerScreenY = kek.world.centerY */

  // Start up the physics system
  // (Should switch to P2 before we do anything complex)
  kek.physics.startSystem(Phaser.Physics.ARCADE)
  kek.physics.arcade.gravity.y = 300

  // Make an immovable box.
  testBox = kek.add.sprite(centerScreenX, window.innerHeight - 250, 'box')
  testBox.anchor.setTo(0.5, 0)
  kek.physics.enable(testBox, Phaser.Physics.ARCADE)
  testBox.body.collideWorldBounds = true
  testBox.body.static = true
  testBox.body.immovable = true

  // Make the player.
  this.player.sprite = kek.add.sprite(255, 255, 'character');
  kek.physics.enable(this.player.sprite, Phaser.Physics.ARCADE);
  this.player.sprite.body.collideWorldBounds = true;
  this.player.sprite.body.gravity.y = 1000;
  this.player.sprite.body.maxVelocity.y = 900;
  console.log(this.player);
}

// Think of this function as an endless loop.
play.update = function () {
  let kek = this.game;

  // Check for collision between player and testbox.
  kek.physics.arcade.collide(testBox, this.player.sprite);

  // Otherwise idle character
  // There's sample code for animations here.
  if(this.player.facing !== DIRECTIONS.NONE) {
      this.player.sprite.animations.stop();
      if (this.player.facing === DIRECTIONS.LEFT) { this.player.frame = 0; }
      else { this.player.sprite.frame = 5; }
      this.player.facing = DIRECTIONS.NONE;
  }
}

// Render is mostly used for debugging.
play.render = function () {
  let kek = this.game;
  kek.debug.bodyInfo(testBox, 16, 24);
}

//TODO
//Move this to it's own file
var Character = function(game) {
  this.game = game;
  this.facing = DIRECTIONS.LEFT;
  this.controls = this.bindKeys();
  console.log(this.controls);
  this.sprite = null;
};
Character.prototype.sprite;
Character.prototype.game;
Character.prototype.facing;
Character.prototype.controls;
/**
 * Bind keys and set up keyboard movement events.
 * Binds both WASD and Arrow Key controls
 * Binds jump to SPACEBAR
 */
Character.prototype.bindKeys = function() {
  //Create key bindings
  let controls = this.game.input.keyboard.addKeys({ 'up': Phaser.KeyCode.W, 'left': Phaser.KeyCode.A, 'down': Phaser.KeyCode.S, 'right': Phaser.KeyCode.D, 
  'altup': Phaser.KeyCode.UP, 'altleft': Phaser.KeyCode.LEFT, 'altdown': Phaser.KeyCode.DOWN, 'altright': Phaser.KeyCode.RIGHT, 
  'jump': Phaser.KeyCode.SPACEBAR });

  //Add movement events
  //Jumping
  controls.up.onDown.add(function(data) { if(this.sprite.body.velocity.y === 0) { this.sprite.body.velocity.y = - 900; } }, this);
  //Moving Left
  controls.left.onDown.add(function(data) {
    this.sprite.body.velocity.x = -150;
    if(this.facing !== DIRECTIONS.LEFT){
      this.animations.play('left');
      this.facing = DIRECTIONS.LEFT;
    }
  }, this);
  //Clearing movement
  controls.left.onUp.add(function(data) {
    this.sprite.body.velocity.x = 0;
  }, this);
  //Moving Right
  controls.right.onDown.add(function(data) {
    this.sprite.body.velocity.x = 150;
    if (this.facing !== DIRECTIONS.RIGHT) {
      this.sprite.animations.play('right');
      this.facing = DIRECTIONS.RIGHT;
    }
  }, this);
  controls.right.onUp = controls.left.onUp;

  //Bind Alternates
  controls.altup.onDown = controls.up.onDown;
  controls.altleft.onDown = controls.left.onDown;
  controls.altleft.onUp = controls.left.onUp;
  controls.altright.onDown = controls.right.onDown;
  controls.altright.onUp = controls.left.onUp;

  //Bind action keys
  controls.jump.onDown = controls.up.onDown;

  return controls;
}

module.exports = play;