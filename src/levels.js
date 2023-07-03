const levelInfo = {
  fatal: { lvl: 0, color: 'red', symbol: 'cross' },
  error: { lvl: 1, color: 'red', symbol: 'cross' },
  warn: { lvl: 2, color: 'yellow', symbol: 'warning' },
  info: { lvl: 3, color: 'green', symbol: 'info' },
  http: { lvl: 4, color: 'green', symbol: 'info' },
  verbose: { lvl: 5, color: 'cyan', symbol: 'pointerSmall' },
  debug: { lvl: 6, color: 'blue', symbol: 'dot' },
  silly: { lvl: 7, symbol: 'dot', color: 'dim' },
  success: { level: 'info', color: 'green', symbol: 'tick' },
  fail: { level: 'info', color: 'red', symbol: 'cross' }
}
const levels = Object.fromEntries(Object.entries(levelInfo).filter(([k, v]) => { return Number.isInteger(v.lvl) }).map(([k, v]) => { return [k, v.lvl] }))
const levelColors = Object.fromEntries(Object.entries(levelInfo).map(([k, v]) => { return [k, (v.color || '')] }))

module.exports = {
  levelInfo,
  levels,
  levelColors
}
