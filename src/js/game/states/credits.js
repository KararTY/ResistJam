let credits = {}

credits.create = function () {
  let kek = this.game

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
    {name: 'Thanks for playing and,', twitter: 'PRAISE KEK!'}
  ]

  let creditTextMargin = 25
  let timer = 5000
  for (let i = 0; i < creditsText.length; i++) {
    let element = creditsText[i]

    let groupItem = kek.add.text(kek.world.centerX, kek.world.height + creditTextMargin, '', {font: '1.5rem Bangers-Regular', fill: '#fff'})
    groupItem.text = `${element.name} ${element.twitter}`
    groupItem.anchor.setTo(0.5, 0.5)
    groupItem.padding.set(10, 16)

    kek.add.tween(groupItem).to({y: -kek.world.height + creditTextMargin}, 30000, 'Linear', true)
    timer += 5000
    creditTextMargin += 25
  }

  // kek.add.tween(this.creditTextGroup.x).to(0, 30000, 'Linear', true)
}

module.exports = credits
