var Controller = function (game, binding) {
    this.game = game
    this.binding = binding || this.getDefaultBinding(game)
}
Controller.prototype = {
    game: null,
    get binding() {
        return {
            up: this.up,
            left: this.left,
            down: this.down,
            right: this.right,
            jump: this.jump,
            shoot: this.shoot
        }
    },
    set binding(value) {
        this.up = value.up || null
        this.left = value.left || null
        this.down = value.down || null
        this.right = value.right || null
        this.jump = value.jump || null
        this.shoot = value.shoot || null
    },
    up: null,
    left: null,
    down: null,
    right: null,
    jump: null,
    shoot: null,
    getDefaultBinding: function (game) {
        console.log(`game is ${game.input}\nthis.game is ${this.game.input}`)
        let gameObj = game || this.game
        console.log(`gameObj is ${gameObj.input}`)
        let keys = gameObj.input.keyboard.addKeys({
            up: Phaser.KeyCode.W,
            left: Phaser.KeyCode.A,
            down: Phaser.KeyCode.S,
            right: Phaser.KeyCode.D,
            jump: Phaser.KeyCode.SPACEBAR
        })
        keys.shoot = gameObj.input.pointer1.leftButton
        return keys
    }
}

module.exports = Controller