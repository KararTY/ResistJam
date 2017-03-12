/**
 * Define an in game Statistic. Statistics have a range between
 * Statistic.value.maxValue and Statistic.value.minValue. If the
 * range is exceeded on either end the value is set to the
 * closest limit
 * @param {*} name the name of the Statistic
 * @param {*} max the maximum value (must be greater than min)
 * @param {*} min the minimum value (must be less than max)
 * @param {*} val the current value (val must be less than max and greater than min)
 */
var Statistic = function (name, max, min, val) {
  this.value = {
    _minValue: 0,
    _maxValue: 100,
    _currentValue: 10,
    get minValue() {
      return this._minValue
    },
    set minValue(value) {
      if (value > this._maxValue) {
        this._minValue = this._maxValue - 1
      } else {
        this._minValue = value
      }
    },
    get maxValue() {
      return this._maxValue
    },
    set maxValue(value) {
      if (value < this._minValue) {
        this._maxValue = this._minValue + 1
      } else {
        this._maxValue = value
      }
    },
    get currentValue() {
      return this._currentValue
    },
    set currentValue(value) {
      console.log(`INPUT VALUE IS: ${value}`)
      if (value > this._maxValue) {
        this._currentValue = this._maxValue
      } else if (value < this._minValue) {
        this._currentValue = this._minValue
      } else {
        this._currentValue = value
      }
    }
  }

  this.name = name || ''
  this.value.maxValue = max || 100
  this.value.minValue = min || 0
  this.value.currentValue = val || 10
}

module.exports = Statistic
