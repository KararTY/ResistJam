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
})

let Character = require('../objs/character.js')

let play = {}

play.create = function () {
  let kek = this.game
  this.testBox
  this.player = new Character(kek)
  this.debugText
  let centerScreenX = kek.world.centerX
  /* Not used
   let centerScreenY = kek.world.centerY */

  kek.world.setBounds(0, 0, 1920, 1080)

  // Start up the physics system
  // (Should switch to P2 before we do anything complex)
  kek.physics.startSystem(Phaser.Physics.ARCADE)
  kek.physics.arcade.gravity.y = 300

  // Make an immovable box.
  this.testBox = kek.add.sprite(centerScreenX, window.innerHeight - 250, 'box')
  this.testBox.anchor.setTo(0.5, 0)
  kek.physics.enable(this.testBox, Phaser.Physics.ARCADE)
  this.testBox.body.collideWorldBounds = true
  this.testBox.body.static = true
  this.testBox.body.immovable = true

  // Make the player.
  this.player.sprite = kek.add.sprite(255, 255, 'box')
  this.player.sprite.anchor.setTo(0.5)
  kek.physics.enable(this.player.sprite, Phaser.Physics.ARCADE)
  // this.player.sprite.body.setCircle(120)
  this.player.sprite.body.collideWorldBounds = true
  this.player.sprite.body.gravity.y = 1250
  this.player.sprite.body.maxVelocity.y = 900
  kek.camera.follow(this.player.sprite)
  console.dir(this.player)
}

// Think of this function as an endless loop.
play.update = function () {
  let kek = this.game

  // Check for collision between player and testbox.
  kek.physics.arcade.collide(this.testBox, this.player.sprite)

  if (this.player.controller.left.isDown) {
    this.player.sprite.body.velocity.x = -150
    if (this.facing !== DIRECTIONS.LEFT) {
      // this.animations.play('left')
      this.facing = DIRECTIONS.LEFT
    }
  } else if (this.player.controller.right.isDown) {
    this.player.sprite.body.velocity.x = 150
    if (this.facing !== DIRECTIONS.RIGHT) {
      // this.player.sprite.animations.play('right')
      this.facing = DIRECTIONS.RIGHT
    }
  } else this.player.sprite.body.velocity.x = 0

  if (this.player.controller.jump.isDown) {
    if (this.player.sprite.body.velocity.y === 0) this.player.sprite.body.velocity.y = -900
  }

  // Otherwise idle character
  // There's sample code for animations here.
  if (this.player.facing !== DIRECTIONS.NONE) {
    this.player.sprite.animations.stop()
    if (this.player.facing === DIRECTIONS.LEFT) this.player.frame = 0
    else this.player.sprite.frame = 5
    this.player.facing = DIRECTIONS.NONE
  }
}

// Render is mostly used for debugging, also an endless loop. THIS IS HTML!
play.render = function () {
  let kek = this.game
  kek.debug.text(`left.isDown: ${this.player.controller.left.isDown}`, 100, 16)
  kek.debug.text(`right.isDown: ${this.player.controller.right.isDown}`, 100, 32)
  kek.debug.text(`up.isDown: ${this.player.controller.up.isDown}`, 100, 48)
  kek.debug.body(this.player.sprite)
}

module.exports = play
