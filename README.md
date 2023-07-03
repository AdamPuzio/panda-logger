# Panda Logger

Panda Logger is a simplified instance of [Winston Logger](https://github.com/winstonjs/winston) that is primarily used for the [Panda](https://github.com/AdamPuzio/panda) framework, but that can be implemented in virtually any project. 

## Installation

```bash
npm i @panda/logger
```

## Setup

### Code

```js
const PandaLogger = require('@panda/logger')

// get the base logger
const logger = PandaLogger.getLogger()

// initialize a new logger
const logger = PandaLogger.getLogger('Foo')

// initialize a new logger with custom level and format
const logger = Logger.getLogger('Bar', { level: 'debug', format: 'json' })
```

### Command Line Overrides

```bash
LOG_LEVEL=debug LOG_FORMAT=json node index
```

## Usage

```js
const PandaLogger = require('@panda/logger')
const logger = PandaLogger.getLogger('Foo')

logger.fatal(msg)
logger.error(msg)
logger.warn(msg)
logger.info(msg)
logger.http(msg)
logger.verbose(msg)
logger.debug(msg)
logger.silly(msg)

logger.success(msg)
logger.fail(msg)
```

### Levels

* fatal
* error
* warn
* info
* http
* verbose
* debug
* silly

### Formats

* simple - generic output
* json - JSON formatted output
* basic - `timestamp label level message` output
* standard - colorized development output
* cli - pretty-print viewable output

### Functions & Variables

* `logger.success(msg)` (level: `info`)
* `logger.fail(msg)` (level: `info`)
* `logger.testLevels()` - tests output of all levels against current level
* `logger.levels` - returns a list of all levels
* `logger.level` - returns the current level for that logger
* `logger.format` - returns the current format for that logger

## Testing & Linting

### Run Tests

```bash
npm test
```

### Run Linter

```bash
# run linter
npm run lint

# run linter and fix any fixable issues
npm run lint:fix
```

## ToDo

* Allow formats to be dynamically added