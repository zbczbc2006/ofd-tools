'use strict'
const pipelinFun = async function (funcs, callback) {
  if (!Array.isArray(funcs)) {
    throw new TypeError('funcs must be an array')
  }
  if ('function' !== typeof callback) {
    throw new TypeError(callback + ' is not a function')
  }
  var index,
    value,
    length = funcs.length >>> 0
  for (index = 0; length > index; ++index) {
    value = await callback(value, funcs[index], index, funcs)
  }
  return value
}

let _pipeline = function (...funcs) {
  return pipelinFun(funcs, (a, b) => b.call(this, a))
}

export const pipeline = _pipeline
