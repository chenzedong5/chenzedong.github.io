import {
  HANDLE_PSY_TESR
} from 'actionType'

const init = {
  psyList: [],
  testList: {},
  result: {}
}

export default (state = init, action) => {
  switch (action.type) {
    case HANDLE_PSY_TESR:
      return {
        ...state, ...action.payload
      };
    default:
      return state
  }
}