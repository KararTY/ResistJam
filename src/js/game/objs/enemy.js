var Actor = require('./actor')
var Item = require('./item')
var Statistic = require('./statistic')

var Enemy = function (sprite, logic, time) {
  this.sprite = sprite || null
  this.statistics = {
    health: new Statistic('health', 100, 0, 100),
    damage: new Statistic('damage', 100, 0, 1)
  }
  this.lastDirection = 0
  this.canShoot = true
  this.shotTimer = this.game.time.create()
  this.shotTime = time || 1250
  this.shotTimer.loop(this.shotTime, function () {
    this.canShoot = true
  }, this)
  this.shotTimer.start()
  this.statistics.health.value.currentValue = 10
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

  this.handleAction = function (player, params) {
    if (this.statistics.health.value.currentValue > 0) {
      this.logic(player, params)
    } else {
      this.sprite.destroy()
      this.destroyed = true
      var sprite = this.game.add.sprite(this.sprite.x, this.sprite.y, 'health')
      var pickup = new Item(sprite, 10, 0)
      this.game.physics.p2.enable(pickup.sprite)
      pickup.sprite.body.kinematic = true
      pickup.sprite.body.setCollisionGroup(this.game.collisionGroups.enemyBulletGroup)
      pickup.sprite.body.collides([
        this.game.collisionGroups.playerGroup
      ])
      pickup.sprite.body.createGroupCallback(this.game.collisionGroups.playerGroup, function () {
        pickup.onPickup(this.player)
        console.log(`${this.player.statistics.health.value.currentValue}/${this.player.statistics.health.value.maxValue}`)
      }, this.game.state.getCurrentState())
    }
  }

  this.defaultLogic = this.creepLogic

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
Enemy.prototype.sentryLogic = function (player) {
  if (player.sprite.x + 300 >= this.sprite.x && player.sprite.x - 300 <= this.sprite.x &&
    player.sprite.y + 100 >= this.sprite.y && player.sprite.y - 100 <= this.sprite.y) {
    if (this.canShoot) {
      if (this.sprite.x > player.sprite.x) {
        this.lastDirection = 0
      } else if (this.sprite.x < player.sprite.x) {
        this.lastDirection = 1
      }
      this.shoot()
    }
  }
}
Enemy.prototype.creepLogic = function (player) {
  if (player.sprite.x + 300 >= this.sprite.x && player.sprite.x - 300 <= this.sprite.x &&
    player.sprite.y + 100 >= this.sprite.y && player.sprite.y - 100 <= this.sprite.y) {
    if (this.canShoot) {
      if (this.sprite.x > player.sprite.x) {
        this.lastDirection = 0
      } else if (this.sprite.x < player.sprite.x) {
        this.lastDirection = 1
      }
      this.shoot()
    }
  } else if (player.sprite.y + 100 >= this.sprite.y && player.sprite.y - 100 <= this.sprite.y) {
    if (this.sprite.x > player.sprite.x + 300) {
      this.sprite.body.velocity.x = -150
    } else if (this.sprite.x < player.sprite.x - 300) {
      this.sprite.body.velocity.x = 150
    }
  }
}
Enemy.prototype.sniperLogic = function (player) {
  if (player.sprite.x + 700 >= this.sprite.x && player.sprite.x - 700 <= this.sprite.x &&
    player.sprite.y + 100 >= this.sprite.y && player.sprite.y - 100 <= this.sprite.y) {
    if (this.canShoot) {
      if (this.sprite.x > player.sprite.x) {
        this.lastDirection = 0
      } else if (this.sprite.x < player.sprite.x) {
        this.lastDirection = 1
      }
      this.shoot()
    }
  }
  if (player.sprite.x + 300 >= this.sprite.x && player.sprite.x - 300 <= this.sprite.x &&
    player.sprite.y + 100 >= this.sprite.y && player.sprite.y - 100 <= this.sprite.y) {
    if (this.sprite.x < player.sprite.x + 300) {
      this.sprite.body.velocity.x = 150
    } else if (this.sprite.x > player.sprite.x - 300) {
      this.sprite.body.velocity.x = -150
    }
  }
}

module.exports = Enemy
