import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet'
import NewTweet from './NewTweet'


class TweetPage extends Component {
  render () {
    const { id, replies } = this.props
    return(
      <div>
        <Tweet id={id} />
        <NewTweet id={id} />
        {replies.length !== 0 && <h3 className='center'>Replies</h3>}
        <ul>
          {replies.map((replyId) => (
            <li key={replyId}>
              <Tweet id={replyId}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
// props = any props that we have passed to the component
function mapStateToProps ({ authedUser, tweets, users}, props) {
  // hardcoded be us, finally this will be comming fron react router
  const { id } = props.match.params
  // the data we want to be passed to the component
  return {
    id,
    // if there does'n exist a tweet with this id the reply will be empty array
    replies: !tweets[id]
      ? []
      // tweets id with reply property on it sorted chronologically
      : tweets[id].replies.sort((a,b,) => tweets[b].timestamp - tweets[a].timestamp)
  }
}

export default connect(mapStateToProps)(TweetPage)
