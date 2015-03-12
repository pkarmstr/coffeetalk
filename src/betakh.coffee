Promise = require 'bluebird'
fs = require 'fs'

sayMeow = (s) ->
  new Promise (resolve, reject) ->
    console.log 'before resolving'
    resolve 'I meowed' if s is 'meow'
    console.log 'is this dead code?'

readBigFile = (fname) ->
  console.log 'reading fname...\n'
  new Promise (resolve, reject) ->
    f = null
    fs.readFile fname, (error, data) ->
                          resolve data.toString()


console.log 'way down here'

readBigFile '/home/keelan/resources/giant.txt'
  .then (data) ->
    console.log 'got dat data'
    console.log data.substring 0, 100

console.log 'before the meowmeow'

sayMeow 'meow'
  .then (s) ->
    console.log 'twas sick\n' + s

