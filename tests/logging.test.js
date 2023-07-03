const Logger = require('../')

test('levels', () => {
  const logger = Logger.getLogger('Test001')
  const levels = logger.levels
  expect(levels).toEqual({
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    verbose: 5,
    debug: 6,
    silly: 7
  })
})

test('default level and format', () => {
  const logger = Logger.getLogger('Test002')
  const level = logger.level
  const format = logger.format
  const vals = { level, format }
  expect(vals).toEqual({ level: 'info', format: 'standard' })
})

test('custom level and format', () => {
  const logger = Logger.getLogger('Test003', { level: 'debug', format: 'json' })
  const level = logger.level
  const format = logger.format
  const vals = { level, format }
  expect(vals).toEqual({ level: 'debug', format: 'json' })
})
