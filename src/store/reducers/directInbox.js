import {SET_DIRECT_INBOX} from '../actions/types'

const initialState = {
  directInbox: undefined
}

const reducer = (state = initialState, action) =>{
  console.log('action', action)
  switch (action.type) {
    case SET_DIRECT_INBOX:
      return {
        ...state,
        directInbox: action.directInbox
      }
    default:
      return state
  }
}

export default reducer