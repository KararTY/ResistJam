let play = {}
let Phaser = Phaser || {}

// Global scope the variables.
let player
let testBox
let cursors
let facing = 'left'
let jumpButton
let jumpTimer = 0

play.create = function () {
  let kek = this.game
  let centerScreenX = kek.world.centerX
  /* Not used
   let centerScreenY = kek.world.centerY */

  // Start up the physics system
  // (Should switch to P2 before we do anything complex)
  kek.physics.startSystem(Phaser.Physics.ARCADE)
  kek.physics.arcade.gravity.y = 300

  // Make an immovable box.
  testBox = kek.add.sprite(centerScreenX, window.innerHeight - 250, 'box')
  testBox.anchor.setTo(0.5, 0)
  kek.physics.enable(testBox, Phaser.Physics.ARCADE)
  testBox.body.collideWorldBounds = true
  testBox.body.static = true
  testBox.body.immovable = true

  // Make the player.
  player = kek.add.sprite(250, 250, 'box')
  kek.physics.enable(player, Phaser.Physics.ARCADE)
  player.body.collideWorldBounds = true
  player.body.gravity.y = 1000
  player.body.maxVelocity.y = 900

  // Enable cursor keys.
  cursors = kek.input.keyboard.createCursorKeys()
  jumpButton = kek.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
}

// Think of this function as an endless loop.
play.update = function () {
  let kek = this.game

  // Check for collision between player and testbox.
  kek.physics.arcade.collide(testBox, player)

  // Unless something is changing player's X velocity, have it be '0'
  player.body.velocity.x = 0

  // On cursor keys left <-
  if (cursors.left.isDown) {
    player.body.velocity.x = -150

    if (facing !== 'left') {
      player.animations.play('left')
      facing = 'left'
    }
  // On cursor keys right ->
  // There's sample code for animations here.
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 150

    if (facing !== 'right') {
      player.animations.play('right')
      facing = 'right'
    }
  // Otherwise idle character
  // There's sample code for animations here.
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
  // Bouncyness fixed by gnomesort
  if (jumpButton.isDown && player.body.velocity.y === 0 && kek.time.now > jumpTimer) {
    player.body.velocity.y = -900
    jumpTimer = kek.time.now + 750
  }
}

// Render is mostly used for debugging.
play.render = function () {
  let kek = this.game
  kek.debug.bodyInfo(testBox, 16, 24)
}

module.exports = play
