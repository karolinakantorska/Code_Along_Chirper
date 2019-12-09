import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData} from '../actions/shared'
import Dashboard from './Dashboard'


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <div>
        // if this.props.loading is true we render null
        {this.props.loading === true ? null
        // if this.props.loading is false we render Dashboard component
        : <Dashboard/> }
      </div>
    )
  }
}

// to render a Daschboard component only when loading initial data is finished
function mapStateToProps({ authedUser }) {
  return {
    // when authedUser equals null then loading is true
    loading: authedUser === null
  }
}
export default connect(mapStateToProps)(App)
