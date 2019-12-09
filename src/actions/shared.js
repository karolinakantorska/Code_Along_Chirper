import { getInitialData } from '../utils/api'
// importing action creators
import { receiveUsers } from '../actions/users'
import { receiveTweets } from '../actions/tweets'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = 'tylermcginnis'

// exporting the action 'getInitialData'
export function handleInitialData () {
  // Redux return pattern
  // asynchronious request inside this function
  return (dispatch) => {
    dispatch(showLoading())
    // calling get initial data
    return getInitialData()
      // that will then return us a promisse
      // that will pass to us an object that has a users property and tweets property
      .then(({ users, tweets }) => {
        // now we want to take our users and tweets and add them to the state of our Redux stor
        dispatch(receiveUsers(users))
        dispatch(receiveTweets(tweets))
        dispatch(setAuthedUser(AUTHED_ID))
        dispatch(hideLoading())
      })
  }
}
