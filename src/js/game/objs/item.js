var Actor = require('./actor')

var Item = function (sprite, health, damage) {
  this.sprite = sprite || null
  this.statistics.health.value.currentValue = health || 0
  this.statistics.damage.value.currentValue = damage || 0
  this.onPickup = function (actor) {
    actor.statistics.health.value.currentValue -= this.statistics.damage.value.currentValue
    actor.statistics.health.value.currentValue += this.statistics.health.value.currentValue
    this.sprite.destroy()
  }
}
Item.prototype = new Actor()

module.exports = Item
