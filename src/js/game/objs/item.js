var Actor = require('./actor')
var Statistic = require('./statistic')

var Item = function (sprite, health, damage) {
  this.sprite = sprite || null
  this.statistics = {
    health: new Statistic('health', 100, 0, 0),
    damage: new Statistic('damage', 100, 0, 0)
  }
  this.statistics.health.value.currentValue = health || 0
  this.statistics.damage.value.currentValue = damage || 0
  this.onPickup = function (actor) {
    actor.statistics.health.value.currentValue -= this.statistics.damage.value.currentValue
    actor.statistics.health.value.currentValue += this.statistics.health.value.currentValue
    this.sprite.destroy()
    this.destroyed = true
    this.game.sounds.hit.play()
  }
}
Item.prototype = new Actor()

module.exports = Item
