let game = {}

game.create = function () {
  let kek = this.game
  let centerScreenX = kek.world.centerX
  let centerScreenY = kek.world.centerY
  let logo = kek.add.sprite(0, centerScreenY - 100, 'logo')
  logo.anchor.setTo(0, 0)

  let gameTitleStyle = { font: 'Bangers-Regular', fill: '#fff' }
  let gameTitle = kek.add.text(centerScreenX, 50, '#RESISTJAM', gameTitleStyle)
  gameTitle.fontSize = '4rem'
  gameTitle.anchor.setTo(0.5, 0.5)
  gameTitle.padding.set(10, 16)

  // Create menu.
  let menu = [
    {title: 'Play', function: 'play'},
    {title: 'Credits', function: 'credits'}
  ]
  let itemMargin = {starting: 125, margin: 50}
  let menuGroup = kek.add.group()

  let selectMenuItem = {
    down: (child) => {
      let item = child.details
      kek.state.start(item.function)
    }
  }

  for (let i = 0; i < menu.length; i++) {
    let element = menu[i]
    var theMenuItem = kek.add.text(centerScreenX, itemMargin.starting, '', {font: '3rem Bangers-Regular', fill: '#fff'})
    theMenuItem.text = element.title
    theMenuItem.anchor.setTo(0.5, 0.5)
    theMenuItem.padding.set(10, 16)
    theMenuItem.details = {function: element.function}
    theMenuItem.inputEnabled = true
    itemMargin.starting += itemMargin.margin

    theMenuItem.events.onInputDown.add(selectMenuItem.down, this)
    menuGroup.addChild(theMenuItem)
  }

  let copyText = kek.add.text(centerScreenX, window.innerHeight, '', {font: '2rem Bangers-Regular', fill: '#fff'})
  copyText.anchor.setTo(0.5, 1)
  copyText.text = 'Copyrighted 2017 Team Kekistan'
  copyText.padding.set(10, 0)
}

module.exports = game
