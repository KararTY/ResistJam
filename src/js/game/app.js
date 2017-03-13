var _ = require('lodash')
var properties = require('./properties')

var states = {
  boot: require('./states/boot.js'),
  preloader: require('./states/preloader.js'),
  game: require('./states/game.js'),
  play: require('./states/play.js'),
  play2: require('./states/play2.js'),
  play3: require('./states/play3.js'),
  credits: require('./states/credits.js'),
  cutscenes: require('./states/cutscenes.js'),
  gameover: require('./states/gameover.js')
}

var game = new Phaser.Game(640, 480, Phaser.AUTO, 'game')
// Automatically register each state.
_.each(states, function (state, key) {
  game.state.add(key, state)
})
game.state.start('boot')
