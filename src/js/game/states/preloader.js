var preloader = {}

preloader.preload = function () {
  // this.game.load.image('logo', './images/pepe.png')
  this.game.load.image('box', './images/box_250x250.png')
  this.game.load.image('pill', './images/redpill.png')
  this.game.load.image('platform', './images/platform_unit_8.png')
  this.game.load.image('character', './images/test_character.png')
  this.game.load.image('enemy', './images/test_enemy.png')
  this.game.load.image('bluepill', './images/bluepill.png')
  this.game.load.spritesheet('humanpepe', './images/H_walkingSheet.png', 90, 90)
  this.game.load.spritesheet('pepe', './images/P_Sheet.png', 58, 86, 10)
  this.game.load.image('background', './images/background1.png')
  this.game.load.image('background2', './images/background2.png')
  this.game.load.image('background3', './images/background3.png')
  this.game.load.image('wood', './images/wood.jpg')
  this.game.load.spritesheet('healthbar', './images/healthbar.png', 96, 6)
  this.game.load.image('health', './images/healthpickup.png')
  this.game.load.spritesheet('normie', './images/normie.png', 59, 114)
  this.game.load.spritesheet('boss', './images/Meliss.png', 64, 67, 11)
  this.game.load.audio('shoot', './audio/shoot.mp3')
  this.game.load.audio('hit', './audio/hit.mp3')
  this.game.load.audio('level1bgm', './audio/level1.ogg')
  this.game.load.audio('level2bgm', './audio/level2.mp3')
  this.game.load.audio('level3bgm', './audio/level3.mp3')
  this.game.load.audio('victory', './audio/victory.mp3')
  this.game.load.audio('main', './audio/main.mp3')
  this.game.load.video('video1', './images/POC-1.mp4')
  this.game.load.video('video2', './images/redpilling.mp4')
}

preloader.create = function () {
  this.game.introPlayed = false
  this.game.state.start('game')
}

module.exports = preloader
