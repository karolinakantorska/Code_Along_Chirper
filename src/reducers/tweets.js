import { RECEIVE_TWEETS, TOGGLE_TWEET, ADD_TWEET } from '../actions/tweets'

export default function tweets (state = {}, action) {
  switch (action.type) {
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
    case ADD_TWEET:

        // lets grab tweet out of the action
        const { tweet } = action
        // if we are replying to the tweet
        let replyingTo = {}
        if (tweet.replyingTo !== null) {
          // then replyig to is going to be an object
          replyingTo = {
            [tweet.replyingTo]: {
              // object for that tweet is going to be everything that was before
              ...state[tweet.replyingTo],
              // we modyfy now the replies property of this specific slice of state
              // [tweet.replyTo] it is ID of the tweet we are replying to
              replies: state[tweet.replyingTo].replies.concat([tweet.id])
            }
          }

        // return object and spread all of the previous tweets onto it
        return {
          ...state,
          // adding new tweet to our tweet state
          [action.tweet.id]: action.tweet,
          ...replyingTo
        }
      }
    default :
      return state
  }
}
