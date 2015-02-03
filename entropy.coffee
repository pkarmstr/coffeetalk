natural = require 'natural'
fs = require 'fs'

log2 = (num) ->
  Math.log(num) / Math.LN2

class FrequencyDistribution
  constructor: (@tokenList) ->

  calculateProbabilities: ->
    counts = {}
    probs = {}
    for token in @tokenList
      counts[token] = counts[token] + 1 || 1 # better style than explicit ternary?

    total = @tokenList.length # is it any faster to save this in a local variable?
    for token of counts
      probs[token] = counts[token]/total
    probs

calculateEntropy = (labels) ->
  freqDist = new FrequencyDistribution labels
  probabilities = freqDist.calculateProbabilities()
  entropy = (probabilities[t] * log2 probabilities[t] for t of probabilities)
  -entropy.reduce (prev, curr, index, array) ->
    prev + curr

console.log calculateEntropy ['m', 'm', 'm', 'm']
console.log calculateEntropy ['m', 'f', 'f', 'f']
console.log calculateEntropy ['m', 'f', 'm', 'm']
console.log calculateEntropy ['m', 'f', 'm', 'f']

exports.calculateEntropy = calculateEntropy
