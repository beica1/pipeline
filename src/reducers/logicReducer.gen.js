/**
 * logicReducer.js of pipleline
 * Created by beica on 2019/11/22
 */
export default logic => (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.value
    case 'PURE':
      return logic(state)
    case 'ADD':
      return logic(action.addend, state)
    default:
      return state
  }
}
