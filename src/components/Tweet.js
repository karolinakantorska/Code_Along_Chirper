import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet } from '../utils/helpers'

class Tweet extends Component {
  render() {
    const { tweet } = this.props

    if (tweet === null) {
      return <p>This tweet does not exist</p>
    }

    console.log(this.props)

    return (
      <div className= 'tweet'>

      </div>
    )
  }
}
// what state does this Component actually need from our redux store? this is going to be passed as a first argument
// state from redux store to Tweet component (firs argument)
// with mapStateToProps if you pass a prop to the component that you are rendering. That it is going to come here as the secund argument
// the props passed to the Tweet component (secund argument)

function mapStateToProps({ authedUser, users, tweets}, { id }) {
  const tweet = tweets[id]
  // information about parent tweet
  // if a tweet has a property replayingTo
  // null if the tweet does not exist
  const parentTweet = tweet ? tweets[tweet.replayingTo] : null

  return {
    // We're destructuring both arguments. From the store, we're extracting:
    // he authedUser data
    // the users data
    // the tweets data
    authedUser,
    // null if the tweet does not exist
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
      : null
  }
}

export default connect(mapStateToProps)(Tweet)
