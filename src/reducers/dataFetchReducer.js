/**
 * dataFetchReducer.js of pipleline
 * Created by beica on 2020/1/3
 */
import { emit } from 'tools/eventBus'
import events from 'config/events'
import { LOADING_STATE } from 'config/enum'

const dataFetchReducer = (state, action) => {
  if (action.name) {
    emit(events.LOADING_REQ, action.name, action.type)
  }
  
  switch (action.type) {
    case LOADING_STATE.START:
      return {
        ...state,
        isLoading: true
      }
    case LOADING_STATE.DONE:
      return {
        ...state,
        isLoading: false,
        isDone: true,
        data: action.payload
      }
    case LOADING_STATE.FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.error
      }
    default:
      return {
        ...state
      }
  }
}

export default dataFetchReducer
