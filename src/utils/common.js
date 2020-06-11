/**
 * Date: 2019/1/8
 * Author: beicai
 * Description: common
 */
import * as R from 'ramda'

export const getLocalStore = R.always(localStorage)

const partialGuid = R.pipe(Math.random, R.add(1), R.multiply(0x10000), Math.floor, R.invoker(1, 'toString')(16), R.invoker(1, 'substring')(1))

const assembleGUIDPartials = R.o(
  R.join(''),
  R.juxt([R.call, R.o(R.join(''), R.times(R.__, 5)), R.o(R.join(''), R.times(R.__, 2))])
)

export const guid = R.thunkify(assembleGUIDPartials)(partialGuid)

export const getFormData = R.ifElse(
  R.both(R.identity, R.hasIn('querySelectorAll')),
  R.pipe(
    R.invoker(1, 'querySelectorAll')('input[name]'),
    R.reduce((acc, item) => R.mergeLeft(acc, { [item.name]: item.value }), {})
  ),
  R.always({})
)

const zeroRepeat = R.o(R.join(''), R.repeat('0'))

/**
 * (4, 10) => '0010'
 * @return {String}
 */
export const zeroize = R.curry((n, x) => {
  const process = R.pipe(String, R.concat(zeroRepeat(n)), R.slice(R.negate(n), Infinity))
  return process(x)
})

export const zeroAppend = R.curry((n, x) => {
  const stopIndex = R.pipe(R.indexOf('.'), R.ifElse(R.lt(R.__, 0), R.add(2), R.inc), R.add(n))
  const _slice = R.converge(R.slice, [R.always(0), stopIndex, R.identity])
  return R.o(_slice, R.concat(R.__, zeroRepeat(n)))(x.toString())
})

export const fixTo = n => R.ifElse(R.prop('toFixed'), R.invoker(1, 'toFixed')(n), R.identity)

export const parseToJson = R.tryCatch(R.o(R.objOf('json'), JSON.parse), R.always({}))

export const hasChineseChar = R.test(/[\u4e00-\u9fa5]/)

export const canParseFloat = R.test(/^([+-])?\d*\.?\d+\D*$/)

export const getQueryParam = R.pipe(R.concat('(^|&)'), R.concat(R.__, '=([^&]*)(&|$)'), R.constructN(1, RegExp), R.match(R.__, window.location.search.slice(1)), R.nth(2), R.when(R.identity, unescape))

export const mapIndexed = R.addIndex(R.map)

export const defaultOf = R.unapply(R.find(R.identity))

export const assert = (pred, message) => {
  if (R.isNil(pred)) {
    throw message
  }
}

/**
 * ['a', 'b', 'c'] => {0: 'a', 1: 'b', 2: 'c'}
 * @return {Object}
 */
export const arrayToObj = R.o(R.fromPairs, R.into([], R.addIndex(R.map)(R.flip(R.pair))))

/**
 * (1, 2) => x => Boolean(1 >= x >=2)
 * @return {Function}
 */
export const rangeLimit = R.useWith(R.both, [R.flip(R.gte), R.flip(R.lte)])

export const isStringValue = R.both(R.is(String), R.complement(R.isEmpty))

