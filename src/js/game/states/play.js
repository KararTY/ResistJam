let Character = require('../objs/character')
let GameObject = require('../objs/gameobject')
let Item = require('../objs/item')
let Platform = require('../objs/platform')
let play = {}

play.create = function () {
  // Set game value for GameObjects
  GameObject.prototype.game = this.game

  let kek = this.game
  /* Not used.
  let centerScreenX = kek.world.centerX
  let centerScreenY = kek.world.centerY
  */

  // Set bounds for world.
  kek.world.setBounds(0, 0, 1920, 1080)

  // Start up the physics system
  kek.physics.startSystem(Phaser.Physics.P2JS)
  kek.physics.p2.gravity.y = 1000
  kek.physics.p2.world.defaultContactMaterial.friction = 1
  kek.physics.p2.world.setGlobalStiffness(1e5)
  kek.physics.p2.setImpactEvents(true)

  // CollisionGroups
  this.playerCollisionGroup = kek.physics.p2.createCollisionGroup()
  this.boxCollisionGroup = kek.physics.p2.createCollisionGroup()
  this.itemCollisionGroup = kek.physics.p2.createCollisionGroup()

  kek.physics.p2.updateBoundsCollisionGroup()


  // Make immovable boxes.
  this.boxesGroup = this.add.group()
  this.boxesGroup.enableBody = true
  this.boxesGroup.physicsBodyType = Phaser.Physics.P2JS
  for (let i = 0; i < 3; i++) {
    let box = this.boxesGroup.create(kek.world.randomX, kek.world.randomY, 'box')
    box.body.setRectangle(250, 250)
    // box.body.static = true
    box.body.setCollisionGroup(this.boxCollisionGroup)
    box.body.collides([this.boxCollisionGroup, this.playerCollisionGroup, this.itemCollisionGroup])
  }

  // Make items
  this.itemsGroup = this.add.group()
  this.itemsGroup.enableBody = true
  this.itemsGroup.physicsBodyType = Phaser.Physics.P2JS
  this.items = []
  for (let i = 0; i < 5; ++i) {
    let pillSprite = this.itemsGroup.create(kek.world.randomX, kek.world.randomY, 'pill')
    let pill = new Item(pillSprite, 0, 10)
    pill.sprite.body.setCollisionGroup(this.itemCollisionGroup)
    pill.sprite.body.collides([this.boxCollisionGroup, this.playerCollisionGroup])
    this.items.push(pill)
  }
  console.log(this.items[0].statistics.damage.value.currentValue)
  console.log(this.items[0].statistics.health.value.currentValue)

  this.platform = new Platform(kek.add.sprite(200, kek.world.centerY, 'platform'), 0, 128, 0, kek.world.centerX)
  kek.physics.p2.enable(this.platform.sprite)
  this.platform.sprite.body.velocity.x = 100
  this.platform.sprite.body.kinematic = true
  this.platform.sprite.body.setCollisionGroup(this.boxCollisionGroup)
  this.platform.sprite.body.collides([this.boxCollisionGroup, this.itemCollisionGroup, this.playerCollisionGroup])

  // Make the player.
  this.player = new Character(kek.add.sprite(0, 0, 'box')) // note the new constructor
  kek.physics.p2.enable(this.player.sprite, false)
  this.player.sprite.body.setRectangle(250, 250)
  this.player.sprite.anchor.setTo(0.5)
  this.player.sprite.body.fixedRotation = true
  this.player.sprite.body.damping = 0.5
  this.player.sprite.body.setCollisionGroup(this.playerCollisionGroup)
  this.player.sprite.body.createGroupCallback(this.itemCollisionGroup, function () { })

  // Create player contact materials
  this.platformMaterial = kek.physics.p2.createMaterial('platformMaterial', this.platform.sprite.body)
  this.playerMaterial = kek.physics.p2.createMaterial('spriteMaterial', this.player.sprite.body)

  this.CM = kek.physics.p2.createContactMaterial(this.playerMaterial, this.platformMaterial, {
  })
  console.log(this.CM)
  console.log(this.playerMaterial)
  console.log(this.platformMaterial)

  // Camera follow player sprite.
  kek.camera.follow(this.player.sprite)
  // Debug
  console.dir(this.player)

  // Collision, null is callback on collision.
  this.player.sprite.body.collides(this.boxCollisionGroup, null, this)
  this.player.sprite.body.collides(this.itemCollisionGroup, function (body1, body2) {
    for (let item of this.items) {
      if (item.sprite.body === body2) {
        item.onPickup(this.player)
        this.items.splice(this.items.indexOf(item), 1)
      }
    }
  }, {player: this.player, items: this.items})
}

// Think of this function as an endless loop.
play.update = function () {
  // Handle Input
  this.player.handleControllerInput()
  this.platform.handleBounds()
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
  kek.debug.text(`HEALTH: ${this.player.statistics.health.value.currentValue}`, 100, 64)
  kek.debug.body(this.player.sprite.body)
}

module.exports = play
