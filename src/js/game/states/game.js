let game = {}

game.create = function () {
  // Shorthand for this.game
  let kek = this.game
  // Shorter variables for centering visual objects.
  let centerScreenX = kek.world.centerX
  let centerScreenY = kek.world.centerY

  // Pepe in the corner.
  let logo = kek.add.sprite(0, centerScreenY - 100, 'logo')
  logo.anchor.setTo(0, 0)

  // Create a basic css for text.
  let gameTitleStyle = { font: 'Bangers-Regular', fill: '#fff' }
  // Make the game title.
  let gameTitle = kek.add.text(centerScreenX, 50, '#RESISTJAM', gameTitleStyle)
  gameTitle.fontSize = '4rem'
  gameTitle.anchor.setTo(0.5, 0.5) // Anchor in the middle of the text.
  gameTitle.padding.set(10, 16) // Padding to prevent text being cut off.

  // Create menu array with objects.
  let menu = [
    {title: 'Play', function: 'play'},
    {title: 'Credits', function: 'credits'}
  ]
  let itemMargin = {starting: 125, margin: 50}
  // Create a group for menu items that can later be manipulated
  let menuGroup = kek.add.group()

  // This triggers on input down when selecting a menu item.
  let selectMenuItem = {
    down: (child) => {
      let item = child.details
      kek.state.start(item.function)
    }
  }
  // Create menu text by looping through the menu array objects.
  for (let i = 0; i < menu.length; i++) {
    let element = menu[i]
    var theMenuItem = kek.add.text(centerScreenX, itemMargin.starting, '', {font: '3rem Bangers-Regular', fill: '#fff'})
    theMenuItem.text = element.title
    theMenuItem.anchor.setTo(0.5, 0.5)
    theMenuItem.padding.set(10, 16)
    theMenuItem.details = {function: element.function} // Attach an object containing objects to text.
    theMenuItem.inputEnabled = true // Enable input for the text.
    itemMargin.starting += itemMargin.margin

    theMenuItem.events.onInputDown.add(selectMenuItem.down, this)
    // Add a child (whatever menu array object were looping through right now) to group.
    menuGroup.addChild(theMenuItem)
  }

  // Create copyright text.
  let copyText = kek.add.text(centerScreenX, window.innerHeight, '', {font: '2rem Bangers-Regular', fill: '#fff'})
  copyText.anchor.setTo(0.5, 1)
  copyText.text = '2017 Team Kekistan'
  copyText.padding.set(10, 0)
}

module.exports = game
