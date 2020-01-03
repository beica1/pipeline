/**
 * FocusedOrderList.js of pipleline
 * Created by beica on 2019/11/15
 */
import * as R from 'ramda'
import { useTransition, animated} from 'react-spring'
import React from 'react'
import usePrevious from 'hooks/usePrevious'

const FocusedOrderList = ({ focused }) => {
  const prev = usePrevious(focused)
  
  const isInc = prev ? prev < focused : true
  
  const transitions = useTransition([focused],  R.identity,  {
    from: { transform: isInc ? 'translate3d(0, 100%, 0)' : 'translate3d(0, -100%, 0)'},
    enter: { transform: 'translate3d(0, 0px, 0)', opacity: 1 },
    leave: { transform: isInc ? 'translate3d(0, -100%, 0)' : 'translate3d(0, 100%, 0)', opacity: 0 },
  })
  
  return (
    <div className="over-hidden fill pos-rel">
      {transitions.map(({item,  props,  key}) => (
        <animated.div key={key} className="fo-list__item abs-fill" style={props}>{item}</animated.div>
      ))}
    </div>
  )
}

export default FocusedOrderList
