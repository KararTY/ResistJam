var Controller = require('./controller')
var Actor = require('./actor')

/**
 * Defines an object representing a player character in the game.
 * This object contains both the controller and input handling.
 * @param {*} sprite the Character's sprite
 * @param {*} controller the Character's controller binding
 */
var Character = function (sprite, controller) {
  this.sprite = sprite || null
  this.controller = controller || new Controller()

  this.canJump = function () {
    return this.sprite.deltaY <= 0.1 && this.sprite.deltaY >= -0.1
  }

  this.jump = function () {
    if (this.canJump()) {
      this.sprite.body.moveUp(1200)
    }
  }

  this.handleControllerInput = function () {
    if (this.controller.up.isDown && this.controller.up.duration === 0) {
      this.jump()
      // console.log('up')
    } else if (this.controller.left.isDown) {
      this.sprite.body.moveLeft(150)
      // console.log('left')
    } else if (this.controller.down.isDown) {
      // console.log('down')
    } else if (this.controller.right.isDown) {
      this.sprite.body.moveRight(150)
      // console.log('right')
    } else if (this.controller.jump.isDown && this.controller.duration === 0) {
      this.jump()
      // console.log('jump')
    } else if (this.controller.shoot.isDown) {
      // console.log('shoot')
    } else if (this.canJump()) {
      // this.sprite.body.setZeroVelocity()
    }
  }
}
Character.prototype = new Actor()

module.exports = Character
