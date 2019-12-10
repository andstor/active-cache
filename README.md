# ActiveCache [![Build Status](https://travis-ci.org/andstor/active-cache.svg?branch=master)](https://travis-ci.org/andstor/active-cache)
> A simple caching object with TTL

## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [Options](#options)
  * [Methods](#methods)
  * [Build instrictions](#build-instructions)

## Installation

```html
<script src="/path/to/active-cache.js"></script>
```

Download the [latest standalone JavaScript files (ES5)](https://github.com/andstor/active-cache/releases/latest)


## Usage

### Syntax
```
new ActiveCache(options?)
```
* options (optional)
  * Type: Object
  * The options for the caching. Check out the available [options](#options).


### Example
```js
const activeCache = new ActiveCache({prefix: 'c', stTTL: null});
activeCache.set("myKey", "A value", 60);

// After 40 minutes:
activeCache.get("myKey")
//=> {value: "myKey", ttl: 1575952773409}

// After 1 hour:
activeCache.get("myKey")
//=> null
```

## Options
The ActiveCache class also support multiple optional configurations. These should be passed as an object to the ActiveCache class object. If no manual configurations are set, default options are used.

### stTTL
- Type: `Boolean`
- Default: `null`

Standard time to live. `null` = unlimited time.

### prefix
- Type: `String`
- Default: `c`

The prefix is used for all keys in the stored in SessionStorage, on the form `prefix:key`.

## Methods

### set(key, value, ttl?)
- **key**:
  - Type: `String`
  - Key for storing the value.

- **value**:
  - Type: ` `
  - Any value that can be converted to JSON.

- **ttl**:
  - Type: `Number` or `null`
  - "Time to live", the time a cache object is valid. `null` = unlimited time.

- (return value):
  - Type: `Boolean`
  - Returns true if the entry was successfully stored. False otherwise.

Sets a `key` `value` pair.

### get(key)
- **key**:
  - Type: `String`
  - Key for storing the value.

- (return value):
  - Type: `Object`
  - Returns the item stored by the provided key. 

Gets an item on the form `{value: "value", ttl: 1575952773409}`, stored by a given `key`.

### del(key)
- **key**:
  - Type: `String`
  - Key for the entry to be deleted.

- (return value):
  - Type: `Object`
  - Returns the item stored by the provided key. 

Deletes an entry with the given `key`.

### clear()
Deletes all entries stored by the ActiveCache with the currently used `prefix`.


## Build instructions

Clone a copy of the main active-cache git repo by running:

```bash
git clone git://github.com/andstor/active-cache.git
```

Enter the active-cache directory and run the build script:
```bash
npm run build
```
