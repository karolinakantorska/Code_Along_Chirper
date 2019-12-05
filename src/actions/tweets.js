// export receive tweets variable
// thi is gonna be an action type
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'

// export receiveTweets function (action creator)
export function receiveTweets (tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets,
  }
}
