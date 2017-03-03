var Controller = require('./controller')

var Character = function (game, controller, sprite) {
    this.game = game
    this.controller = controller || new Controller(game)
    this.sprite = sprite || null
}
Character.prototype = {
    game: null,
    controller: null,
    sprite: null,
}

module.exports = Character;