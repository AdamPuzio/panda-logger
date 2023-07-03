const { format, addColors } = require('winston')
const { combine, timestamp, printf } = format
const kleur = require('kleur')
const symbols = require('figures')
const { levelColors, levelInfo } = require('./levels')

addColors(levelColors)

const formats = {}

formats.simple = format.simple()

formats.json = format.json()

formats.basic = combine(
  timestamp(),
  printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`
  })
)

formats.standard = combine(
  timestamp(),
  format.colorize(),
  format.printf((info) => {
    const lvl = info[Symbol.for('level')]
    let msg = [
      kleur.dim(info.timestamp),
      (levelColors[lvl] ? kleur[levelColors[lvl]](lvl.toUpperCase().padEnd(8)) : lvl.toUpperCase().padEnd(8)),
      kleur.blue(info.label).padEnd(20),
      info.message
    ].join(' ')
    if (info.metadata) msg += JSON.stringify(info.metadata)
    return msg
  })
)

formats.cli = format.printf((info) => {
  const lvl = info.subtype || info[Symbol.for('level')]
  const style = levelInfo[lvl]
  if (!style.symbol) return info.message
  let sym = symbols[style.symbol]
  if (style.color) sym = kleur[style.color](sym)
  return `${sym} ${info.message}`
})

module.exports = formats
