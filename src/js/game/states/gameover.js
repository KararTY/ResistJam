let gameover = {}

gameover.create = function () {
  let kek = this.game
  this.game.sounds = {}
  this.game.sounds.bgm = this.game.add.sound('lose', 0.25)

  let gmText = kek.add.text(kek.world.centerX, kek.world.centerY, '', {font: '4rem Bangers-Regular', fill: '#fff'})
  gmText.text = 'Game over.'
  gmText.anchor.setTo(0.5, 0.5)
  gmText.padding.set(10, 16)

  let textReturn = kek.add.text(50, kek.world.height - 20, '', {font: '1.5rem Bangers-Regular', fill: '#fff'})
  textReturn.text = 'Return'
  textReturn.anchor.setTo(0.5, 0.5)
  textReturn.padding.set(10, 16)
  textReturn.inputEnabled = true
  textReturn.events.onInputDown.add(function () {
    this.game.sounds.bgm.destroy()
    kek.state.start('game')
  }, this)

  this.game.sounds.bgm.loopFull()
}

module.exports = gameover
