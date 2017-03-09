var Actor = require('./actor')

var Enemy = function (sprite, logic) {
  this.sprite = sprite || null

  if (this.sprite !== null) {
    this.game.physics.p2.enable(this.sprite)
    this.sprite.body.fixedRotation = true
    this.sprite.body.damping = 0.5
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
  }

  if (logic !== null && logic !== undefined) {
    console.log(logic)
    this.logic = logic
  } else {
    this.logic = this.defaultLogic
  }
}
Enemy.prototype = new Actor()

module.exports = Enemy
