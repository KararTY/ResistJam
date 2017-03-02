var preloader = {}

preloader.preload = function () {
  this.game.load.image('logo', './images/pepe.png')
  this.game.load.image('box', './images/box_250x250.png')
  this.game.load.image('character', './images/test_character.png');
}

preloader.create = function () {
  this.game.state.start('game')
}

module.exports = preloader
