import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import { TiArrowBackOutline } from 'react-icons/ti/index'
import { TiHeartOutline } from 'react-icons/ti/index'
import { TiHeartFullOutline } from 'react-icons/ti/index'
import { handleToggleTweet} from '../actions/tweets'
import { Link, withRouter } from 'react-router-dom'

class Tweet extends Component {
  handleLike = (e) => {
    e.preventDefault()

    const { dispatch, tweet, authedUser } = this.props

    dispatch(handleToggleTweet({
      id: tweet.id,
      hasLiked: tweet.hasLiked,
      authedUser
    }))
  }
  toParent = (e, id) => {
    e.preventDefault()

this.props.history.push(`/tweet/${id}`)

  }
  render() {
    const { tweet } = this.props

    if (tweet === null) {
      return <p>This tweet does not exist</p>
    }

    const {name,avatar, timestamp, text, hasLiked, likes, replies, id, parent } = tweet
    return (
      <Link to={`/tweet/${id}`} className= 'tweet'>
        <img
          src= {avatar}
          alt={`Avatar of ${name}`}
          className= 'avatar'
        />
        <div className= 'tweet-info'>
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            {parent && (
              <button className= 'replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>
          <div className='tweet-icons'>
            <TiArrowBackOutline className='tweet-icon' />
            <span>{replies !== 0 && replies}</span>
            <button className='heart-button' onClick={this.handleLike}>
              {hasLiked === true
                    ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
                    : <TiHeartOutline className='tweet-icon'/>}
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
    </Link>
    )
  }
}

// what state does this Component actually need from our redux store? this is going to be passed as a first argument
// state from redux store to Tweet component (firs argument)
// with mapStateToProps if you pass a prop to the component that you are rendering. That it is going to come here as the secund argument
// the props passed to the Tweet component (secund argument)
function mapStateToProps ({authedUser, users, tweets}, { id }) {
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

export default withRouter(connect(mapStateToProps)(Tweet))
