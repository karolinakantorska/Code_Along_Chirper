import { saveLikeToggle, saveTweet } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'
// export receive tweets variable
// this is gonna be an action type
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const ADD_TWEET = 'ADD_TWEET'



function addTweet (tweet) {
  return {
    type: ADD_TWEET,
    // adding tweet
    tweet
  }
}
// asynchronous action creator
export function handleAddTweet (text, replyingTo) {
  // as secund argument in middleware is going to be pased a getState function that we can inoke to get state of our store
  return (dispatch, getState) => {
    // invoking get state to grab an authed user
    const { authedUser } = getState()
    // showingloading bar
    dispatch(showLoading())
    // calling set tweet passing in text and author
    return saveTweet({
      text,
      author: authedUser,
      replyingTo
    })
    // when above resolvs we are going to be passed tweet itself
    // than we can take and dispatch our ad tweet action creator passing in the tweet
    .then((tweet) => dispatch(addTweet(tweet)))
    // and then when that is done we can dispatch our hide loading action creator
    .then(() => dispatch(hideLoading()))
  }
}
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
