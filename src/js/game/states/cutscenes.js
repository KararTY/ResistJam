var cutscenes = {}

cutscenes.create = function () {
  this.vedeo = this.game.add.video('video1')
  this.sprite = this.vedeo.addToWorld(this.game.world.centerX, this.game.world.centerY, 0.5, 0.5, 0.85, 0.85)
  this.vedeo.play()
  this.vedeo.onComplete.add(function () {
      console.log('reached here')
      this.videe = this.game.add.video('video2')
      this.sprite2 = this.videe.addToWorld(this.game.world.centerX, this.game.world.centerY, 0.5, 0.5, 0.85, 0.85)
      this.videe.play()
      this.videe.onComplete.add(function () {
        this.game.introPlayed = true
        this.game.state.start('play')
      }, this)
    }, this)
    // this.game.state.start('play3')
}

module.exports = cutscenes
