var Statistic = function (name, max, min, val) {
  this.name = name
  this.maxValue = max
  this.minValue = min
  this.currentValue = val
}
Statistic.prototype = {
  _minValue: 0,
  _maxValue: 100,
  _currentValue: 10,
  get minValue () {
    return this._minValue
  },
  set minValue (value) {
    if (value > this._maxValue) {
      this._minValue = this._maxValue - 1
    } else {
      this._minValue = value
    }
  },
  get maxValue () {
    return this._maxValue
  },
  set maxValue (value) {
    if (value < this._minValue) {
      this._maxValue = this._minValue + 1
    } else {
      this._maxValue = value
    }
  },
  get currentValue () {
    return this._currentValue
  },
  set currentValue (value) {
    if (value > this._maxValue) {
      this._currentValue = this._maxValue
    } else if (value < this._minValue) {
      this._currentValue = this._minValue
    } else {
      this._currentValue = value
    }
  },
  name: ''
}

module.exports = Statistic
