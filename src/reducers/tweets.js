import { RECEIVE_TWEETS, TOGGLE_TWEET } from '../actions/tweets'

export default function tweets (state = {}, action) {
  switch(action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets
      }
    case TOGGLE_TWEET :
      return {
        // to spread all of the previous tweets on the state
        ...state,
        // new object for a tweet with id that we are passing on
        [action.id]: {
          // taking all of the properties of that object and spread them across onto this new object
          ...state[action.id],
          // we want to either remove or add the user name to list likes array
          likes: action.hasLiked === true
            ? state[action.id].likes.filter((uID) => uID !== action.authedUser)
            : state[action.id].likes.concat([action.authedUser])
        }
      }
    default :
      return state
  }
}
