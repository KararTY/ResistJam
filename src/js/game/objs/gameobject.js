/**
 * Define a GameObject. By setting GameObject.prototype.game we can
 * Have the game state be available to any object that inherits from
 * Game object
 *
 * In general this should be set before any game objects are invoked
 */
var GameObject = function () {}
GameObject.prototype.game = null
GameObject.prototype.destroyed = false

module.exports = GameObject
