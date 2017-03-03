var Character = require('../objs/character')

let play = {}

play.create = function () {
  let kek = this.game
  this.testBox

  let centerScreenX = kek.world.centerX
  /* Not used
   let centerScreenY = kek.world.centerY */

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
  this.player = new Character(kek, undefined, kek.add.sprite(256, 256, 'character'))
  // Controller to action binding
  // As the game progresses we may want to move this binding into character.js
  // Until we know what the characters actions are this will do
  this.player.controller.up.onDown.add(function (data) { if (this.sprite.body.velocity.y === 0) { this.sprite.body.velocity.y = -900 } }, this.player)
  this.player.controller.left.onDown.add(function (data) {
    this.sprite.body.velocity.x = -150
    if (this.sprite.previousPosition.x > this.sprite.position.x) {
      this.animations.play('left')
    }
  }, this.player)
  this.player.controller.left.onUp.add(function (data) {
    if (!this.controller.right.isDown) { this.sprite.body.velocity.x = 0 }
  }, this.player)
  this.player.controller.right.onDown.add(function (data) {
    this.sprite.body.velocity.x = 150
    if (this.sprite.previousPosition.x < this.sprite.position.x) {
      this.sprite.animations.play('right')
    }
  }, this.player)
  this.player.controller.right.onUp.add(function (data) {
    if (!this.controller.left.isDown) { this.sprite.body.velocity.x = 0 }
  }, this.player)
  this.player.controller.jump.onDown = this.player.controller.up.onDown
  this.player.sprite.anchor.setTo(0.5)
  kek.physics.enable(this.player.sprite, Phaser.Physics.ARCADE)
  this.player.sprite.body.setSize(256, 256)
  this.player.sprite.body.collideWorldBounds = true
  this.player.sprite.body.gravity.y = 1000
  this.player.sprite.body.maxVelocity.y = 900
  console.log(this.player)
}

// Think of this function as an endless loop.
play.update = function () {
  let kek = this.game

  // Check for collision between player and testbox.
  kek.physics.arcade.collide(this.testBox, this.player.sprite)

  // Otherwise idle character
  // There's sample code for animations here.
  if (this.player.previousPosition === this.player.position) {
    this.player.sprite.animations.stop()
  }
}

// Render is mostly used for debugging.
play.render = function () {
  let kek = this.game
  kek.debug.bodyInfo(this.testBox, 16, 24)
  kek.debug.body(this.player.sprite)
}

module.exports = play
