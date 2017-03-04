let Character = require('../objs/character')
let GameObject = require('../objs/gameobject')
let play = {}

play.create = function () {
  // Set game value for GameObjects
  GameObject.prototype.game = this.game

  let kek = this.game
  this.testBox
  let centerScreenX = kek.world.centerX
  /* Not used
   let centerScreenY = kek.world.centerY */

  kek.world.setBounds(0, 0, 1920, 1080)

  // Start up the physics system
  // (Should switch to P2 before we do anything complex)
  kek.physics.startSystem(Phaser.Physics.P2JS)
  kek.physics.p2.gravity.y = 350
  kek.physics.p2.world.defaultContactMaterial.friction = 0.3
  kek.physics.p2.world.setGlobalStiffness(1e5)

  // Material is what the P2JS physics uses.
  let worldMaterial = kek.physics.p2.createMaterial('worldMaterial')
  let boxMaterial = kek.physics.p2.createMaterial('worldMaterial')
  // Create world borders with the worldMaterial.
  kek.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true)
  // Make immovable boxes.
  this.boxesGroup = this.add.group()
  let box
  for (var i = 1; i < 4; i++) {
    box = kek.add.sprite(300, 645 - (300 * i), 'box')
    kek.physics.p2.enable(box)
    box.body.mass = 6
    // box.body.static = true
    box.body.setMaterial(boxMaterial)
    this.boxesGroup.addChild(box)
  }

  // Make the player.
  this.player = new Character(kek.add.sprite(0, 0, 'box')) // note the new constructor
  this.player.sprite.anchor.setTo(0.5)
  kek.physics.p2.enable(this.player.sprite)
  this.player.sprite.body.fixedRotation = true
  this.player.sprite.body.damping = 0.5
  this.spriteMaterial = kek.physics.p2.createMaterial('spriteMaterial', this.player.body)

  // Camera follow player sprite.
  kek.camera.follow(this.player.sprite)
  // Debug
  console.dir(this.player)

  // Collision
  let groundPlayerCM = kek.physics.p2.createContactMaterial(this.spriteMaterial, worldMaterial, { friction: 0.0 })
  let groundBoxesCM = kek.physics.p2.createContactMaterial(worldMaterial, boxMaterial, { friction: 0.6 })
}

// Think of this function as an endless loop.
play.update = function () {
  // Handle Input
  this.player.handleControllerInput()
  // Otherwise idle character
  // There's sample code for animations here.
  if (this.player.previousPosition === this.player.position) {
    this.player.sprite.animations.stop()
  }
}

// Render is mostly used for debugging, also an endless loop. THIS IS HTML!
play.render = function () {
  let kek = this.game
  kek.debug.text(`left.isDown: ${this.player.controller.left.isDown} - ${this.player.sprite.body.velocity.x}`, 100, 16)
  kek.debug.text(`right.isDown: ${this.player.controller.right.isDown}`, 100, 32)
  kek.debug.text(`up.isDown: ${this.player.controller.up.isDown} - ${this.player.sprite.body.velocity.y}`, 100, 48)
  kek.debug.body(this.player.sprite)
}

module.exports = play
