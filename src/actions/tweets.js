import { saveLikeToggle } from '../utils/api'

// export receive tweets variable
// this is gonna be an action type
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'

export const TOGGLE_TWEET = 'TOGGLE_TWEET'

// export receiveTweets function (action creator)
export function receiveTweets (tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets,
  }
}

function toggleTweet ({ id, authedUser, hasLiked }) {
  return {
    type: TOGGLE_TWEET,
    id,
    authedUser,
    hasLiked
  }
}

//asynchronous action creator
// responsible for invoking save toggle function
export function handleToggleTweet (info) {
  return (dispatch) => {
    dispatch(toggleTweet(info))
    // we are using optimistic updates
    return saveLikeToggle(info)
    .catch((error) => {
      console.warn('Error in handleToggleTweet: ', error)
      // togglr tweet once again to reset it to what it was initialy
      dispatch(toggleTweet(info))
      alert('There was an error likeing tweet. Try again.')
    })
  }
}
