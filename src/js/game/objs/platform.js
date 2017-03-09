var Actor = require('./actor')

var Platform = function (sprite, up, left, down, right) {
  this.sprite = sprite || null
  this.body = sprite.body || null
  this.up = up || 0
  this.left = left || 0
  this.down = down || 0
  this.right = right || 0

  this.handleBounds = function () {
    if (this.sprite.y <= this.up || this.sprite.y >= this.down) {
      this.sprite.body.velocity.y = this.sprite.body.velocity.y * -1
    }
    if (this.sprite.x >= this.right || this.sprite.x <= this.left) {
      this.sprite.body.velocity.x = this.sprite.body.velocity.x * -1
    }
  }
}

Platform.prototype = new Actor()

module.exports = Platform
