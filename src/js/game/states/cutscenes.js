var cutscenes = {}

cutscenes.create = function () {
  this.vedeo = this.game.add.video('video1')
  this.vedeo.play()
  this.sprite = this.vedeo.addToWorld(this.game.world.centerX, this.game.world.centerY, 0.5, 0.5, 0.85, 0.85)

  this.vedeo.onPlay.addOnce(function () {
    this.game.time.events.add(this.vedeo.duration * 1000, function () {
      this.videe = this.game.add.video('video2')
      this.sprite = this.videe.addToWorld(this.game.world.centerX, this.game.world.centerY, 0.5, 0.5, 0.85, 0.85)

      this.videe.onPlay.addOnce(function () {
        this.game.time.events.add(this.videe.duration * 1000, function () {
          this.game.state.start('play')
        }, this)
      }, this)
    }, this)
  }, this)
}

module.exports = cutscenes
