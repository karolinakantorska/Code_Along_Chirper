import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'
import { Redirect } from 'react-router-dom'

// that will be a controled component
// using react component state
// it is not shared by few different components, it is easier to do so
class NewTweet extends Component {
  state = {
      text:'',
      toHome: false
  }
  handleChange = (textFeld) => {
   const text = textFeld.target.value

   this.setState(() => ({
     // updating the text of local state
     text
   }))
 }

 handleSubmit = (e) => {
   e.preventDefault()
// grabbing the text from state
   const { text } = this.state
   const { dispatch, id } = this.props

   dispatch(handleAddTweet(text, id))

   //console.log('New Tweet: ', text)
   // reset a text fielt to empty string
   this.setState(() => ({
     text: '',
     toHome: id ? false : true
   }))
 }

  render() {
    const { text, toHome } = this.state

    if (toHome === true) {
      return <Redirect to = '/' />
    }

    const tweetLeft = 280 - text.length

    return(
      <div>
        <h3 className='center'>Compose new Tweet</h3>
        <form className= 'new-tweet' onSubmit={this.handleSubmit}>
          <textarea
            placeholder= 'What is happening'
            value= {text}
            onChange= {this.handleChange}
            className= 'textarea'
            maxLength= {280}
          />
        {tweetLeft <= 100 && (
          <div className='tweet-length'>
            {tweetLeft}
          </div>
        )}
        <button
          className= 'btn'
          type= 'submit'
          disabled= {text === ''}
          >
          Submit
        </button>
        </form>
      </div>
    )
  }
}

export default connect()(NewTweet)
