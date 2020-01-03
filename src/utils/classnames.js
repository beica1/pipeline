/**
 * classnames.js of pipleline
 * Created by beica on 2019/11/14
 */
import * as R from 'ramda'

const join = R.join(' ')

const processObject = R.pipe(R.pickBy(R.identity), R.keys, join)

const process = list => {
  const map = R.cond([
    [R.is(Array), R.pipe(process, join)],
    [R.is(Object), processObject],
    [R.T, R.identity]
  ])
  return R.map(map, list)
}

/**
 * cx('a', 'b', 'c') => 'a b c'
 * cx(['a', 'b', 'c']) => 'a b c'
 * cx({a: true, b: false, c: true}) => 'a c'
 * cx(['a', { b: true }]) => 'a b'
 */
export default R.unapply(R.o(join, process))
