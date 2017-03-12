let Character = require('../objs/character')
let GameObject = require('../objs/gameobject')
let Item = require('../objs/item')
let Platform = require('../objs/platform')
let Enemy = require('../objs/enemy')
let play = {}

play.create = function () {
  // Set up game
  GameObject.prototype.game = this.game
  this.game.collisionGroups = {}
  this.game.objectGroups = {}
  this.game.world.setBounds(0, 0, 1920, 1080)
  this.game.add.tileSprite(0, 0, 1920, 1080, 'background')
    //this.game.add.tileSprite(0, 1080, 1920, 1080)
    // this.game.world.scale.set(1.45) <--- Scale world, gotta figure out a good way.

  // Start Physics
  this.game.physics.startSystem(Phaser.Physics.P2JS)
  this.game.physics.p2.gravity.y = 1000
  this.game.physics.p2.restitution = 0
  this.game.physics.p2.world.defaultContactMaterial.friction = 1
  this.game.physics.p2.world.setGlobalStiffness(1e5)
  this.game.physics.p2.setImpactEvents(true)

  // CollisionGroups
  this.game.collisionGroups.playerGroup = this.game.physics.p2.createCollisionGroup()
  this.game.collisionGroups.enemyGroup = this.game.physics.p2.createCollisionGroup()
  this.game.collisionGroups.terrainGroup = this.game.physics.p2.createCollisionGroup()
  this.game.collisionGroups.playerBulletGroup = this.game.physics.p2.createCollisionGroup()
  this.game.collisionGroups.enemyBulletGroup = this.game.physics.p2.createCollisionGroup()

  // Update Bounds
  this.physics.p2.updateBoundsCollisionGroup()

  // Make Terrain
  this.floor = this.game.add.tileSprite(0, 0, 3840, 64, 'wood')
  this.floor.x = 0
  this.floor.y = 1048
  this.game.physics.p2.enable(this.floor)
  this.floor.body.kinematic = true
  this.floor.body.setCollisionGroup(this.game.collisionGroups.terrainGroup)
  this.floor.body.collides([
    this.game.collisionGroups.terrainGroup,
    this.game.collisionGroups.enemyGroup,
    this.game.collisionGroups.playerGroup,
    this.game.collisionGroups.playerBulletGroup,
    this.game.collisionGroups.enemyBulletGroup
  ])

  // Make the player.
  this.player = new Character(this.game.add.sprite(0, 0, 'pepe')) // note the new constructor
  this.player.sprite.body.setCollisionGroup(this.game.collisionGroups.playerGroup)
  this.player.sprite.body.collides([
    this.game.collisionGroups.terrainGroup,
    this.game.collisionGroups.enemyGroup,
    this.game.collisionGroups.enemyBulletGroup
  ])

  // Camera follow player sprite.
  this.game.camera.follow(this.player.sprite, Phaser.Camera.FOLLOW_PLATFORMER)

  // Debug
  console.dir(this.player)

  // Platforms
  this.platform = new Platform(this.game.add.sprite(200, 1080 - this.player.sprite.height - 10, 'platform'),
    this.player.sprite.height + 10, 0, 1080 - this.player.sprite.height - 10, 0)
  this.platform.sprite.body.setCollisionGroup(this.game.collisionGroups.terrainGroup)
  this.platform.sprite.body.collides([
    this.game.collisionGroups.playerGroup
  ])
  this.platform.sprite.body.velocity.y = 100

  // Enemies
  this.enemy = new Enemy(this.game.add.sprite(1920, 0, 'enemy'), 'testLogic')
  this.enemy.sprite.body.setCollisionGroup(this.game.collisionGroups.enemyGroup)
  this.enemy.sprite.body.collides([
    this.game.collisionGroups.terrainGroup,
    this.game.collisionGroups.playerGroup,
    this.game.collisionGroups.playerBulletGroup
  ])

  // Collision, null is callback on collision.
  /*
  this.player.sprite.body.collides(null, function (body1, body2) {
    for (let item of this.items) {
      if (item.sprite.body === body2) {
        item.onPickup(this.player)
        this.items.splice(this.items.indexOf(item), 1)
      }
    }
  }, {player: this.player, items: this.items})
  */
}

// Think of this function as an endless loop.
play.update = function () {
  // Handle Input
  this.player.handleControllerInput()
  this.enemy.handleAction(this.player)
  this.platform.handleBounds()
}

// Render is mostly used for debugging, also an endless loop. THIS IS HTML!
play.render = function () {
  // Debug text
  this.game.debug.text(`left.isDown: ${this.player.controller.left.isDown} - ${this.player.sprite.body.velocity.x}`, 100, 16)
  this.game.debug.text(`right.isDown: ${this.player.controller.right.isDown}`, 100, 32)
  this.game.debug.text(`up.isDown: ${this.player.controller.up.isDown} - ${this.player.sprite.body.velocity.y}`, 100, 48)
  this.game.debug.text(`HEALTH: ${this.player.statistics.health.value.currentValue}`, 100, 80)
  this.game.debug.text(`ENEMY HEALTH: ${this.enemy.statistics.health.value.currentValue}`, 100, 96)
  this.game.debug.body(this.player.sprite.body)
}

module.exports = play
