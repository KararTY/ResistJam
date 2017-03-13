let Character = require('../objs/character')
let GameObject = require('../objs/gameobject')
let Enemy = require('../objs/enemy')
let Floor = require('../objs/floor')
let play2 = {}

play2.create = function () {
  // Set up game
  GameObject.prototype.game = this.game
  this.game.collisionGroups = {}
  this.game.objectGroups = {}
  this.game.world.setBounds(0, 0, 1920, 1080)
  this.game.add.tileSprite(0, 0, 1920, 1080, 'background2')
  this.game.sounds = {}
  this.game.sounds.shoot = this.game.add.sound('shoot', 0.25)
  this.game.sounds.hit = this.game.add.sound('hit', 0.25)
  this.game.sounds.bgm = this.game.add.sound('level2bgm', 0.25)
  this.game.healthbar = this.game.add.sprite(5, 5, 'healthbar')
  this.game.healthbar.fixedToCamera = true
  this.game.healthbar.scale.setTo(2, 2)
    // this.game.add.tileSprite(0, 1080, 1920, 1080)
    // this.game.world.scale.set(1.45) <--- Scale world, gotta figure out a good way.

  // Start Physics
  this.game.physics.startSystem(Phaser.Physics.P2JS)
  this.game.physics.p2.gravity.y = 1000
  this.game.physics.p2.restitution = 0
  this.game.physics.p2.world.defaultContactMaterial.friction = 1
  this.game.physics.p2.world.setGlobalStiffness(1e5)
  this.game.physics.p2.setImpactEvents(true)

  // Collision Groups
  this.game.collisionGroups.playerGroup = this.game.physics.p2.createCollisionGroup()
  this.game.collisionGroups.enemyGroup = this.game.physics.p2.createCollisionGroup()
  this.game.collisionGroups.terrainGroup = this.game.physics.p2.createCollisionGroup()
  this.game.collisionGroups.playerBulletGroup = this.game.physics.p2.createCollisionGroup()
  this.game.collisionGroups.enemyBulletGroup = this.game.physics.p2.createCollisionGroup()

  // Update Bounds
  this.physics.p2.updateBoundsCollisionGroup()

  // Make Terrain
  this.floor0 = new Floor(this.game.world.centerX, 1080, 1920, 64, 'wood')

  // Make the player.
  this.player = new Character(this.game.add.sprite(0, 1080 - 64, 'pepe')) // note the new constructor
  this.player.sprite.body.setCollisionGroup(this.game.collisionGroups.playerGroup)
  this.player.sprite.body.collides([
    this.game.collisionGroups.terrainGroup,
    this.game.collisionGroups.enemyGroup,
    this.game.collisionGroups.enemyBulletGroup
  ])

  // Camera follow player sprite.
  this.game.camera.follow(this.player.sprite, Phaser.Camera.FOLLOW_PLATFORMER)

  // Debug
  // console.dir(this.player)


  // Enemies
  this.enemies = []
  for (let i = 0; i < 8; ++i) {
    this.enemies[i] = new Enemy(this.game.add.sprite(700 + ((i + 1) * 150), 1080 - 64, 'normie'))
    this.enemies[i].sprite.frame = i % 4
    if (i % 3 === 0) {
      this.enemies[i].logic = Enemy.prototype.creepLogic
    } else if (i % 3 === 1) {
      this.enemies[i].logic = Enemy.prototype.sentryLogic
    } else {
      this.enemies[i].logic = Enemy.prototype.sniperLogic
    }
    this.enemies[i].sprite.body.setCollisionGroup(this.game.collisionGroups.enemyGroup)
    this.enemies[i].sprite.body.collides([
      this.game.collisionGroups.terrainGroup,
      this.game.collisionGroups.playerGroup,
      this.game.collisionGroups.playerBulletGroup,
      this.game.collisionGroups.enemyGroup
    ])
  }

  // console.log(this.game.world.height - 100, this.game.world.width - 100)
  this.game.sounds.bgm.loopFull()
}

// Think of this function as an endless loop.
play2.update = function () {
  // Handle Input
  this.player.handleControllerInput()
  for (let i = 0; i < this.enemies.length; ++i) {
    if (!this.enemies[i].destroyed) {
      this.enemies[i].handleAction(this.player)
    } else {
      this.enemies.splice(i, 1)
    }
  }
  this.game.healthbar.frame = 6 - this.player.statistics.health.value.currentValue / 10
  this.game.healthbar.bringToTop()
  if (this.player.sprite.body.y >= 1080 - 100 && this.player.sprite.body.x >= 1920 - 50) {
    this.game.sounds.bgm.destroy()
    this.game.state.start('play3')
  }
  if (this.player.statistics.health.value.currentValue === 0) {
    this.game.world.setBounds(0, 0, this.game.width, this.game.height)
    this.game.sounds.bgm.destroy()
    this.game.state.start('gameover')
  }
}

// Render is mostly used for debugging, also an endless loop. THIS IS HTML!
play2.render = function () {
  /*
    this.game.debug.text(`left.isDown: ${this.player.controller.left.isDown} - ${this.player.sprite.body.velocity.x}`, 100, 16)
    this.game.debug.text(`right.isDown: ${this.player.controller.right.isDown}`, 100, 32)
    this.game.debug.text(`up.isDown: ${this.player.controller.up.isDown} - ${this.player.sprite.body.velocity.y}`, 100, 48)
    this.game.debug.text(`HEALTH: ${this.player.statistics.health.value.currentValue}`, 100, 80)
    this.game.debug.text(`ENEMY HEALTH: ${this.enemy.statistics.health.value.currentValue}`, 100, 96)
    this.game.debug.body(this.player.sprite.body)
  */
}

module.exports = play2
