let Character = require('../objs/character')
let GameObject = require('../objs/gameobject')
let Enemy = require('../objs/enemy')
let Floor = require('../objs/floor')
let play3 = {}

play3.create = function () {
  // Set up game
  GameObject.prototype.game = this.game
  this.game.collisionGroups = {}
  this.game.objectGroups = {}
  this.game.world.setBounds(0, 0, 1920, 1080)
  this.game.add.tileSprite(0, 0, 1920, 1080, 'background3')
  this.game.sounds = {}
  this.game.sounds.shoot = this.game.add.sound('shoot', 0.25)
  this.game.sounds.hit = this.game.add.sound('hit', 0.25)
  this.game.sounds.bgm = this.game.add.sound('level3bgm', 0.25)
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
  console.dir(this.player)

  /*
  let randomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  */

  this.enemies = []
    // Enemies
  this.boss = new Enemy(this.game.add.sprite(this.player.x + 300, 1080 - 64, 'boss'), null, 1750)
  this.boss.sprite.body.setCollisionGroup(this.game.collisionGroups.enemyGroup)
  this.boss.sprite.body.collides([
    this.game.collisionGroups.terrainGroup,
    this.game.collisionGroups.playerGroup,
    this.game.collisionGroups.playerBulletGroup
  ])
  this.boss.sprite.animations.add(this.boss.sprite.animations.add('teleport', [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ], 12, false))
  this.boss.statistics.health.value.maxValue = 1000
  this.boss.statistics.health.value.currentValue = 1000
  this.boss.canTeleport = true
  this.boss.teleportTimer = this.game.time.create()
  this.boss.teleportTimer.loop(2000, function () {
    this.canTeleport = true
  }, this.boss)
  this.boss.teleportTimer.start()
  this.enemies.push(this.boss)
  this.boss.logic = function (player, enemies) {
    if (this.sprite.x > player.sprite.x) {
      this.lastDirection = 0
    } else if (this.sprite.x < player.sprite.x) {
      this.lastDirection = 1
    }
    if (player.sprite.x > this.sprite.x - 300 && this.sprite.x < this.game.world.width - 100 &&
      this.canTeleport) {
      this.sprite.animations.play('teleport')
      if (this.sprite.animations.currentAnim.frame === 10) {
        this.sprite.animations.stop()
        this.sprite.animations.currentAnim.frame = 0
        this.sprite.body.reset(this.game.camera.x + this.game.camera.width - 50, this.sprite.body.y)
        this.sprite.scale.x = -1
        this.canTeleport = false
      }
    } else if (player.sprite.x < this.sprite.x + 300 && this.sprite.x > 100 &&
      this.canTeleport) {
      this.sprite.animations.play('teleport')
      if (this.sprite.animations.currentAnim.frame === 10) {
        this.sprite.animations.stop()
        this.sprite.animations.currentAnim.frame = 0
        this.sprite.body.reset(this.game.camera.x + 50, this.sprite.body.y)
        this.sprite.scale.x = 1
        this.canTeleport = false
      }
    } else if (player.statistics.health.value.currentValue <= 500 && enemies.length === 1) {
      for (let i = 0; i < 3; ++i) {
        enemies.push(new Enemy(this.game.add.sprite(this.sprite.x * (i + 1), 100 * (i % 10), 'normie'), null, 3000))
        enemies[enemies.length - 1].canShoot = 0
        enemies[enemies.length - 1].sprite.frame = i % 4
        enemies[enemies.length - 1].logic = Enemy.prototype.sentryLogic
        enemies[enemies.length - 1].sprite.body.setCollisionGroup(this.game.collisionGroups.enemyGroup)
        enemies[enemies.length - 1].sprite.body.collides([
          this.game.collisionGroups.terrainGroup,
          this.game.collisionGroups.playerGroup,
          this.game.collisionGroups.playerBulletGroup,
          this.game.collisionGroups.enemyGroup
        ])
      }
    } else {
      this.sprite.animations.currentAnim.frame = 0
      this.sprite.animations.stop()
      if (this.canShoot) {
        this.shoot()
      }
    }
  }
  this.game.sounds.bgm.loopFull()

  console.log(this.game.world.height, this.game.world.width)
}

// Think of this function as an endless loop.
play3.update = function () {
  // Handle Input
  this.player.handleControllerInput()
  for (let i = 0; i < this.enemies.length; ++i) {
    if (!this.enemies[i].destroyed) {
      this.enemies[i].handleAction(this.player, this.enemies)
    } else {
      this.enemies.splice(i, 1)
    }
  }
  this.game.healthbar.frame = 6 - this.player.statistics.health.value.currentValue / 10
  this.game.healthbar.bringToTop()
  if (this.boss.statistics.health.value.currentValue === 0) {
    this.game.world.setBounds(0, 0, this.game.width, this.game.height)
    this.game.sounds.bgm.destroy()
    this.game.state.start('credits')
  }
  if (this.player.statistics.health.value.currentValue === 0) {
    this.game.world.setBounds(0, 0, this.game.width, this.game.height)
    this.game.sounds.bgm.destroy()
    this.game.state.start('gameover')
  }
}

// Render is mostly used for debugging, also an endless loop. THIS IS HTML!
play3.render = function () {
  /*
    this.game.debug.text(`left.isDown: ${this.player.controller.left.isDown} - ${this.player.sprite.body.velocity.x}`, 100, 16)
    this.game.debug.text(`right.isDown: ${this.player.controller.right.isDown}`, 100, 32)
    this.game.debug.text(`up.isDown: ${this.player.controller.up.isDown} - ${this.player.sprite.body.velocity.y}`, 100, 48)
    this.game.debug.text(`HEALTH: ${this.player.statistics.health.value.currentValue}`, 100, 80)
    this.game.debug.text(`ENEMY HEALTH: ${this.enemy.statistics.health.value.currentValue}`, 100, 96)
    this.game.debug.body(this.player.sprite.body)
  */
}

module.exports = play3
