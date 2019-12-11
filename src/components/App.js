import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData} from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import NewTweet from '../components/NewTweet'
import TweetPage from '../components/TweetPage'
import Nav from './Nav'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        // instead of giveing a div here, fragment does not add any element to the dom
        <Fragment>
          <LoadingBar/>
            <div className= 'container'>
            <Nav />
            // if this.props.loading is true we render null
            {this.props.loading === true
              ? null
              : <div>
                  <Route patch= '/' exact component= {Dashboard} />
                  <Route patch= '/tweet/:id' component= {TweetPage} />
                  <Route patch= '/new' component= {NewTweet} />

                </div>}
            // if this.props.loading is false we render Dashboard component
            // : <Dashboard/> }
            // fake react router
            //  : <TweetPage match= {{params: {id:"5c9qojr2d1738zlx09afby"}}} />}
          </div>
        </Fragment>
      </Router>

    )
  }
}

// to render a Daschboard component only when loading initial data is finished
function mapStateToProps ({ authedUser }) {
  return {
    // when authedUser equals null then loading is true
    loading: authedUser === null
  }
}
export default connect(mapStateToProps)(App)
