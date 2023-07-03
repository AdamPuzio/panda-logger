const { createLogger, transports } = require('winston')
const { levels, levelInfo } = require('./src/levels')
const formats = require('./src/formats')

/**
 * PandaLoggerInstance
 */
class PandaLoggerInstance {
  settings = {}

  /**
   * PandaLoggerInstance constructor
   *
   * @param {string} name the name of the logger
   * @param {object} opts options object
   */
  constructor (name, opts = {}) {
    this.settings = { ...opts }
    if (!opts.transports) opts.transports = [new transports.Console()]
    if (!opts.levels) opts.levels = levels
    if (typeof opts.format === 'string') opts.format = formats[opts.format]
    this.name = name
    this.opts = opts
    const logger = createLogger(opts)
    this._logger = logger
    this._generateLoggerFns()
  }

  /**
   * Creates methods that match the logger functions
   */
  _generateLoggerFns () {
    Object.entries(levelInfo).forEach(([k, v]) => {
      this[k] = function (msg) {
        this._logger.log({
          level: v.level || k,
          message: msg,
          subtype: k
        })
      }
    })
  }

  get levels () {
    return this._logger.levels
  }

  get level () {
    return this._logger.level
  }

  get format () {
    return this.settings.format
  }

  test (level, levelAt) {
    if (level === true) return true
    if (!levelAt) levelAt = this._logger.level
    const levelsArray = Object.keys(levels)
    return levelsArray.indexOf(level) <= levelsArray.indexOf(levelAt)
  }

  testLevels () {
    Object.entries(this._logger.levels).forEach(([k, v]) => {
      this._logger[k](k)
    })
  }
}

module.exports = PandaLoggerInstance
