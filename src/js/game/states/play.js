let play = {}

let player
let testBox
let cursors
let facing = 'left'
let jumpButton
let jumpTimer = 0

play.create = function () {
  let kek = this.game
  kek.physics.startSystem(Phaser.Physics.ARCADE)
  kek.physics.arcade.gravity.y = 300
  let centerScreenX = kek.world.centerX
  let centerScreenY = kek.world.centerY

  testBox = kek.add.sprite(centerScreenX, window.innerHeight - 250, 'box')
  testBox.anchor.setTo(0.5, 0)
  kek.physics.enable(testBox, Phaser.Physics.ARCADE)
  testBox.body.collideWorldBounds = true
  testBox.body.static = true
  testBox.body.immovable = true

  player = kek.add.sprite(250, 250, 'box')
  kek.physics.enable(player, Phaser.Physics.ARCADE)
  player.body.collideWorldBounds = true
  player.body.gravity.y = 1000
  player.body.maxVelocity.y = 900

  cursors = kek.input.keyboard.createCursorKeys()
  jumpButton = kek.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
}

play.update = function () {
  let kek = this.game

  kek.physics.arcade.collide(testBox, player)

  player.body.velocity.x = 0

  if (cursors.left.isDown) {
    player.body.velocity.x = -150

    if (facing !== 'left') {
      player.animations.play('left')
      facing = 'left'
    }
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 150

    if (facing !== 'right') {
      player.animations.play('right')
      facing = 'right'
    }
  } else {
    if (facing !== 'idle') {
      player.animations.stop()

      if (facing === 'left') {
        player.frame = 0
      } else {
        player.frame = 5
      }
      facing = 'idle'
    }
  }
  if (jumpButton.isDown && player.body.touching.down || player.body.onFloor() && kek.time.now > jumpTimer) {
    player.body.velocity.y = -900
    jumpTimer = kek.time.now + 750
  }
}

play.render = function () {
  let kek = this.game
  kek.debug.bodyInfo(testBox, 16, 24)
}

module.exports = play
