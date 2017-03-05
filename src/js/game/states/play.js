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

  // Set bounds for world.
  kek.world.setBounds(0, 0, 1920, 1080)

  // Start up the physics system
  kek.physics.startSystem(Phaser.Physics.P2JS)
  kek.physics.p2.gravity.y = 1000
  kek.physics.p2.world.defaultContactMaterial.friction = 0.3
  kek.physics.p2.world.setGlobalStiffness(1e5)
  kek.physics.p2.setImpactEvents(true)
  let playerCollisionGroup = kek.physics.p2.createCollisionGroup()
  let boxCollisionGroup = kek.physics.p2.createCollisionGroup()

  kek.physics.p2.updateBoundsCollisionGroup()
  // Material is what the P2JS physics uses.
  let worldMaterial = kek.physics.p2.createMaterial('worldMaterial')
  let boxMaterial = kek.physics.p2.createMaterial('worldMaterial')
  // Create world borders with the worldMaterial.
  kek.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true)

  // Make immovable boxes.
  this.boxesGroup = this.add.group()
  this.boxesGroup.enableBody = true
  this.boxesGroup.physicsBodyType = Phaser.Physics.P2JS
  for (let i = 1; i < 4; i++) {
    let box = this.boxesGroup.create(kek.world.randomX, kek.world.randomY, 'box')
    box.body.setRectangle(250, 250)
    // box.body.static = true
    box.body.setCollisionGroup(boxCollisionGroup)
    box.body.collides([boxCollisionGroup, playerCollisionGroup])
  }

  // Make the player.
  this.player = new Character(kek.add.sprite(0, 0, 'box')) // note the new constructor
  kek.physics.p2.enable(this.player.sprite, false)
  this.player.sprite.body.setRectangle(250, 250)
  this.player.sprite.anchor.setTo(0.5)
  this.player.sprite.body.fixedRotation = true
  this.player.sprite.body.damping = 0.5
  this.player.sprite.body.setCollisionGroup(playerCollisionGroup)

  // Camera follow player sprite.
  kek.camera.follow(this.player.sprite)
  // Debug
  console.dir(this.player)

  // Collision, null is callback on collision.
  this.player.sprite.body.collides(boxCollisionGroup, null, this)
}

// Think of this function as an endless loop.
play.update = function () {
  // Handle Input
  this.player.handleControllerInput()
  // Otherwise idle character
  if (this.player.previousPosition === this.player.position) {
    this.player.sprite.animations.stop()
  }
}

// Render is mostly used for debugging, also an endless loop. THIS IS HTML!
play.render = function () {
  let kek = this.game

  // Debug text
  kek.debug.text(`left.isDown: ${this.player.controller.left.isDown} - ${this.player.sprite.body.velocity.x}`, 100, 16)
  kek.debug.text(`right.isDown: ${this.player.controller.right.isDown}`, 100, 32)
  kek.debug.text(`up.isDown: ${this.player.controller.up.isDown} - ${this.player.sprite.body.velocity.y}`, 100, 48)
  kek.debug.body(this.player.sprite.body)
}

module.exports = play
