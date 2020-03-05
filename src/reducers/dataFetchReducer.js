/**
 * dataFetchReducer.js of pipleline
 * Created by beica on 2020/1/3
 */
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        isLoading: true
      }
    case 'DONE':
      return {
        ...state,
        isLoading: false,
        isDone: true,
        data: action.payload
      }
    case 'FAIL':
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
