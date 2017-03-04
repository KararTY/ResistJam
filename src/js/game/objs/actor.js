var GameObject = require('./gameobject')
var Statistic = require('./statistic')

/**
 * Defines an abstract Actor object. Game characters can
 * inherit this as a base
 */
var Actor = function () {
  this.sprite = null
  this.name = ''
  this.statistics = {
    health: new Statistic('health', 100, 0, 100),
    damage: new Statistic('damage', 100, 0, 1)
  }
}
Actor.prototype = new GameObject()

module.exports = Actor
