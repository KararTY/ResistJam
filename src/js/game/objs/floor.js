var GameObject = require('./gameobject')

var Floor = function (x, y, width, height, key) {
  this.sprite = this.game.add.tileSprite(0, 0, width, height, key)
  this.sprite.x = x
  this.sprite.y = y
  this.game.physics.p2.enable(this.sprite)
  this.sprite.body.static = true
  this.sprite.body.setCollisionGroup(this.game.collisionGroups.terrainGroup)
  this.sprite.body.collides([
    this.game.collisionGroups.terrainGroup,
    this.game.collisionGroups.enemyGroup,
    this.game.collisionGroups.playerGroup,
    this.game.collisionGroups.playerBulletGroup,
    this.game.collisionGroups.enemyBulletGroup
  ])
}
Floor.prototype = new GameObject()

module.exports = Floor
