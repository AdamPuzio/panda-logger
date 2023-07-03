const PandaLoggerInstance = require('./instance')
const EventEmitter = require('events')

/**
 * PandaLogger
 */
class PandaLogger extends EventEmitter {
  settings = {
    level: 'info',
    format: 'standard',
    debug: [],
    debugLevel: 'debug'
  }

  overrides = {}

  /**
   * PandaLogger constructor
   */
  constructor () {
    if (PandaLogger._instance) return PandaLogger._instance
    super()
    PandaLogger._instance = this

    this.getBaseValues()
  }

  /**
   * Updates default settings based on environmental variables
   */
  getBaseValues () {
    if (process.env.LOG_LEVEL) this.settings.level = this.overrides.level = process.env.LOG_LEVEL
    if (process.env.LOG_FORMAT) this.settings.format = this.overrides.format = process.env.LOG_FORMAT
    if (process.env.DEBUG) this.settings.debug = process.env.DEBUG.split(',')
    if (process.env.DEBUG_LEVEL) this.settings.debugLevel = process.env.DEBUG_LEVEL
  }

  /**
   * Creates a new logger instance
   * 
   * @param {string} name the name of the logger
   * @param {object} opts logger options
   * @returns 
   */
  createLoggerInstance (name = 'Panda', opts = {}) {
    const loggerConfig = {
      level: this.overrides.level || opts.level || this.settings.level,
      format: this.overrides.format || opts.format || this.settings.format,
      defaultMeta: {
        label: name
      }
    }
    if (this.settings.debug.includes(name)) loggerConfig.level = this.settings.debugLevel
    return new PandaLoggerInstance(name, loggerConfig)
  }

  _cache = {}

  /**
   * Creates a logger instance (or returns the logger if it already exists)
   * 
   * Options:
   *   - level: the level to set the logger to (default: info, env: LOG_LEVEL)
   *   - format: the format to use for the logger's output (default: standard, env: LOG_FORMAT)
   * 
   * @param {string} name the name of the logger
   * @param {object} opts logger options
   * @returns 
   */
  getLogger (name, opts = {}) {
    if (this._cache[name]) return this._cache[name]
    const instance = this._cache[name] = this.createLoggerInstance(name, opts)

    return instance
  }
}

const Logger = new PandaLogger()
module.exports = Logger
