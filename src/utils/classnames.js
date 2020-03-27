/**
 * @module cx
 * classnames.js of pipleline
 * Created by beica on 2019/11/14
 */
import * as R from 'ramda'

const join = R.join(' ')

const processObject = R.pipe(R.pickBy(R.identity), R.keys, join)

/**
 * 递归格式化数组
 * @param {(String|Object|Boolean)[]} list
 * @returns {Array}
 */
const process = list => {
  const map = R.cond([
    [R.is(Array), R.pipe(process, join)],
    [R.is(Object), processObject],
    [R.T, R.ifElse(R.identity, R.identity, R.always(''))]
  ])
  return R.map(map, list)
}

/**
 * react 类名动态计算并格式化输出
 * @function
 * @returns {String}
 * @example
 * cx('a', 'b', 'c')
 * // => 'a b c'
 * @example
 * cx(['a', 'b', 'c'])
 * // => 'a b c'
 * @example
 * cx(['a', { b: true }, true && 'c'])
 * // => 'a b c'
 * @example
 * cx({a: true, b: false, c: true}) => 'a c'
 */
const cx = R.unapply(R.o(join, process))

export default cx
