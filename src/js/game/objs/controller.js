var GameObject = require('./gameobject')

var Controller = function (binding) {
  this.up = null
  this.left = null
  this.down = null
  this.right = null
  this.jump = null
  this.shoot = null

  this.game.input.mouse.capture = true

  this.binding = function (binding) {
    if (binding) {
      this.up = binding.up
      this.left = binding.left
      this.down = binding.down
      this.right = binding.right
      this.jump = binding.jump
      this.shoot = binding.shoot
    }
    return {
      up: this.up,
      left: this.left,
      down: this.down,
      right: this.right,
      jump: this.jump,
      shoot: this.shoot
    }
  }

  this.getDefaultBinding = function () {
    let keys = this.game.input.keyboard.addKeys({
      up: Phaser.KeyCode.W,
      left: Phaser.KeyCode.A,
      down: Phaser.KeyCode.S,
      right: Phaser.KeyCode.D,
      jump: Phaser.KeyCode.SPACEBAR,
      shoot: Phaser.KeyCode.F
    })
    // keys.shoot = this.game.input.activePointer.leftButton
    return keys
  }

  this.binding(binding || this.getDefaultBinding())
}
Controller.prototype = new GameObject()

module.exports = Controller
