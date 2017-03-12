let credits = {}

credits.create = function () {
  let kek = this.game
  this.game.sounds = {}
  this.game.sounds.bgm = this.game.add.sound('victory', 0.25)

  let creditsText = [
    {name: 'Credits', twitter: 'in no particular order'},
    {name: 'Artist(s)', twitter: ''},
    {name: '"George the Goy"', twitter: ''},
    {name: '"FinnishHim"', twitter: ''},
    {name: '"Xenoerates"', twitter: '@Xenoerates'},
    {name: 'Coder(s)', twitter: ''},
    {name: '"Gnomesort"', twitter: ''},
    {name: 'Karar Al-Remahy "KararTY"', twitter: '@karar_alr'},
    {name: 'Composer(s)', twitter: ''},
    {name: '"SCP173"', twitter: '@SCP173Music'},
    {name: 'Level designer(s)', twitter: ''},
    {name: 'R.C "intrepidsoul123"', twitter: '@intrepidsoul123'},
    {name: 'Voice actor(s)', twitter: ''},
    {name: 'AK B. "Shitlord Stalin"', twitter: '@ShitlordStalin'},
    {name: 'Jacob Y. "Dr. Jacob"', twitter: '@warman016'},
    {name: 'Writer(s)', twitter: ''},
    {name: '"missingtexture"', twitter: ''},
    {name: '"The1stImmortal"', twitter: ''},
    {name: '', twitter: ''},
    {name: '', twitter: ''},
    {name: '', twitter: ''},
    {name: '', twitter: ''},
    {name: '', twitter: ''},
    {name: 'Thanks for playing and,', twitter: 'PRAISE KEK!'}
  ]

  let creditTextMargin = 40
  for (let i = 0; i < creditsText.length; i++) {
    let element = creditsText[i]

    let groupItem = kek.add.text(kek.world.centerX, kek.world.height + creditTextMargin, '', {font: '2rem Bangers-Regular', fill: '#fff'})
    groupItem.text = `${element.name} ${element.twitter}`
    groupItem.anchor.setTo(0.5, 0.5)
    groupItem.padding.set(10, 16)

    kek.add.tween(groupItem).to({y: (-kek.world.height + creditTextMargin) - 500}, 30000, 'Linear', true)
    creditTextMargin += 40
  }

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

module.exports = credits
