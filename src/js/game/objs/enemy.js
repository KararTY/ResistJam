var Actor = require('./actor')
var Item = require('./item')

var Enemy = function (sprite, logic) {
  this.sprite = sprite || null
  this.lastDirection = 0
  this.canShoot = true
  this.shotTimer = this.game.time.create()
  this.shotTimer.loop(750, function () {
    this.canShoot = true
  }, this)
  this.shotTimer.start()
  if (this.sprite !== null) {
    this.game.physics.p2.enable(this.sprite)
    this.sprite.body.fixedRotation = true
    this.sprite.body.immovable = true
    this.sprite.body.damping = 0.5
  }

  this.createBullet = function (direction) {
    var bullet = null
    var sprite = this.game.add.sprite(this.sprite.x + (this.sprite.width + 25) * direction, this.sprite.y, 'bluepill')
    bullet = new Item(sprite, 0, 10)
    bullet.sprite.autoCull = true
    bullet.sprite.outOfCameraBoundsKill = true
    this.game.physics.p2.enable(bullet.sprite)
    bullet.sprite.body.kinematic = true
    bullet.sprite.body.setCollisionGroup(this.game.collisionGroups.enemyBulletGroup)
    bullet.sprite.body.collides([
      this.game.collisionGroups.terrainGroup,
      this.game.collisionGroups.playerGroup
    ])
    bullet.sprite.body.createGroupCallback(this.game.collisionGroups.playerGroup, function () {
      bullet.onPickup(this.player)
    }, this.game.state.getCurrentState())
    return bullet
  }

  this.shoot = function () {
    var bullet = null
    if (this.lastDirection === 1) {
      bullet = this.createBullet(1)
      bullet.sprite.body.velocity.x = 600
    } else if (this.lastDirection === 0) {
      bullet = this.createBullet(-1)
      bullet.sprite.body.velocity.x = -600
    }
    this.canShoot = false
    this.game.sounds.shoot.play()
  }

  this.canJump = function () {
    var yAxis = p2.vec2.fromValues(0, 1)
    var result = false
    for (var i = 0; i < this.game.physics.p2.world.narrowphase.contactEquations.length; ++i) {
      var c = this.game.physics.p2.world.narrowphase.contactEquations[i]
      if (c.bodyA === this.sprite.body.data || c.bodyB === this.sprite.body.data) {
        var d = p2.vec2.dot(c.normalA, yAxis)
        if (c.bodyA === this.sprite.body.data) {
          d *= -1
        }
        if (d > 0.5) {
          result = true
        }
      }
    }
    return result
  }

  this.jump = function () {
    if (this.canJump()) {
      this.sprite.body.moveUp(700)
    }
  }

  this.handleAction = function (player) {
    if (this.statistics.health.value.currentValue > 0) {
      this.logic(player)
    } else {
      this.sprite.destroy()
    }
  }

  this.defaultLogic = function (player) {
    if (this.sprite.x > player.sprite.x + 300) {
      this.sprite.body.velocity.x = -150
    } else if (this.sprite.x < player.sprite.x - 300) {
      this.sprite.body.velocity.x = 150
    }
    if (this.sprite.x > player.sprite.x) {
      this.lastDirection = 0
    } else if (this.sprite.x < player.sprite.x) {
      this.lastDirection = 1
    }
    if (this.sprite.y + 5 >= player.sprite.y && this.sprite.y - 5 <= player.sprite.y) {
      if (this.canShoot) {
        this.shoot()
      }
    }
  }

  this.testLogic = function (player) {
    if (this.sprite.x > player.sprite.x + 300) {
      this.sprite.body.velocity.x = -150
    } else if (this.sprite.x < player.sprite.x - 300) {
      this.sprite.body.velocity.x = 150
    }
    if (this.sprite.x > player.sprite.x) {
      this.lastDirection = 0
    } else if (this.sprite.x < player.sprite.x) {
      this.lastDirection = 1
    }
    if (this.sprite.y + 5 >= player.sprite.y && this.sprite.y - 5 <= player.sprite.y) {
      if (this.canShoot) {
        this.shoot()
      }
    }
  }

  if (logic !== null && logic !== undefined) {
    if (logic === 'testLogic') {
      this.logic = this.testLogic
    } else {
      console.log(logic)
      this.logic = logic
    }
  } else {
    this.logic = this.defaultLogic
  }
}
Enemy.prototype = new Actor()

module.exports = Enemy
