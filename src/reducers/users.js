import { RECEIVE_USERS } from '../actions/users'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        // all of the users
        ...action.users
      }
    default :
      return state
  }
}
