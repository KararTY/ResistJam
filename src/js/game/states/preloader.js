var preloader = {}

preloader.preload = function () {
  this.game.load.image('logo', './images/pepe.png')
  this.game.load.image('box', './images/box_250x250.png')
  this.game.load.image('pill', './images/redpill_test_sprite.png')
  this.game.load.image('platform', './images/platform_unit_8.png')
}

preloader.create = function () {
  this.game.state.start('game')
}

module.exports = preloader
