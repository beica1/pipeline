/**
 * @module color
 * color.js of pipleline
 * Created by beica on 2019/12/10
 */
import * as R from 'ramda'
import { zeroize, arrayToObj, rangeLimit } from './common'

const from0To255 = rangeLimit(0, 255)
const from0To1 = rangeLimit(0, 1)

const rgbSchema = {
  0: from0To255,
  1: from0To255,
  2: from0To255,
  3: R.either(R.isNil, from0To1)
}

const twoDigital = zeroize(2)

const isHexColor = R.test(/^#(([0-9a-f]{3})|([0-9a-f]{6})|([0-9a-f]{8}))$/)

const isRGBASchemaMatched = R.o(R.where(rgbSchema), arrayToObj)

const isRgbaColor = R.ifElse(isRGBASchemaMatched, R.identity, R.always(false))

const formatHexNumber = R.cond([
  [R.o(R.equals(3), R.length), R.pipe(R.chain(a => [a, a]), R.append('ff'), R.join(''))],
  [R.o(R.equals(6), R.length), R.flip(R.concat)('ff')],
  [R.T, R.identity]
])

/**
 * @input {String}
 * @return {String}
 */
const parseHex = R.flip(parseInt)(16)

/**
 * @function
 * @input {Number}
 * @return {String}
 */
const toHex = R.invoker(1, 'toString')(16)

const parse = R.converge(
  R.append,
  [
    R.pipe(R.last, parseHex, R.flip(R.divide)(255), R.invoker(1, 'toFixed')(1), Number),
    R.pipe(R.init, R.map(parseHex))
  ])

const getHexNumberChars = R.pipe(String, R.invoker(0, 'toLowerCase'), R.replace(/^#/, ''))

export const hexToRGBA = R.ifElse(isHexColor, R.pipe(getHexNumberChars, formatHexNumber, R.splitEvery(2), parse), R.always(null))

export const hexToRGB = R.o(R.ifElse(R.isNil, R.identity, R.init), hexToRGBA)

const formatHex = R.converge(
  R.pipe(R.append, R.join(''), R.concat('#')),
  [
    R.pipe(R.propOr(1, 4), R.multiply(255), toHex, twoDigital),
    R.pipe(R.take(3), R.map(R.o(twoDigital, toHex)))
  ])

const getRGBANumbers = R.pipe(String, R.split(','), R.map(R.o(Number, R.replace(/[^\d]/g, ''))), R.take(4))

export const rgbaToHex = R.unapply(R.o(R.ifElse(isRgbaColor, formatHex, R.always(null)), getRGBANumbers))

export const rgbToHex = R.pipe(rgbaToHex, R.ifElse(R.isNil, R.identity, R.slice(0, -2)))

const formatRGBAColor = R.ifElse(isHexColor, hexToRGBA, getRGBANumbers)

const percentMix = R.curry((p, a, b) => R.add(a * (1 - p), b * p))

/**
 * colorStart {Color}
 * colorEnd {Color}
 * percent {Number} 0 < percent < 1
 * @return {Array} [r, g, b, a]
 */
export const mix = R.useWith(
  R.unapply(R.o(
    R.apply(R.zipWith), R.move(-1, 0)
  )),
  [formatRGBAColor, formatRGBAColor, percentMix]
)
