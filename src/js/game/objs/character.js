var Controller = require('./controller')
var Actor = require('./actor')
var Item = require('./item')

/**
 * Defines an object representing a player character in the game.
 * This object contains both the controller and input handling.
 * @param {*} sprite the Character's sprite
 * @param {*} controller the Character's controller binding
 */
var Character = function (sprite, controller) {
  this.sprite = sprite || null
  this.controller = controller || new Controller()
  this.lastDirection = 0
  if (this.sprite !== null) {
    this.game.physics.p2.enable(this.sprite)
    this.sprite.body.fixedRotation = true
    this.sprite.body.damping = 0.5
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
        } if (d > 0.5) {
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

  this.createBullet = function (direction) {
    var bullet = null
    var sprite = this.game.add.sprite(this.sprite.x + (this.sprite.width + 25) * direction, this.sprite.y, 'pill')
    bullet = new Item(sprite, 0, 10)
    bullet.sprite.autoCull = true
    bullet.sprite.outOfCameraBoundsKill = true
    this.game.physics.p2.enable(bullet.sprite)
    bullet.sprite.body.kinematic = true
    bullet.sprite.body.setCollisionGroup(this.game.collisionGroups.playerBulletGroup)
    bullet.sprite.body.collides([
      this.game.collisionGroups.terrainGroup,
      this.game.collisionGroups.enemyGroup
    ])
    bullet.sprite.body.createGroupCallback(this.game.collisionGroups.enemyGroup, function () {
      bullet.onPickup(this.enemy)
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
  }

  this.handleControllerInput = function () {
    if (this.controller.up.isDown && this.controller.up.duration === 0) {
      this.jump()
      // console.log('up')
    } else if (this.controller.left.isDown) {
      this.sprite.body.moveLeft(150)
      this.lastDirection = 0
      // console.log('left')
    } else if (this.controller.down.isDown) {
      // console.log('down')
    } else if (this.controller.right.isDown) {
      this.sprite.body.moveRight(150)
      this.lastDirection = 1
      // console.log('right')
    } else if (this.controller.jump.isDown && this.controller.jump.duration === 0) {
      this.jump()
      // console.log('jump')
    } else if (this.canJump()) {
      // this.sprite.body.setZeroVelocity()
    }
    if (this.controller.shoot.isDown && this.controller.shoot.duration === 0) {
      this.shoot()
      // console.log('shoot')
    }
  }
}
Character.prototype = new Actor()

module.exports = Character
