const logger = (store) => (next) => (action) => {
  // logger will show us anytime that new action is dispatched
  // and what the new state is going to be after dispatch
  // this will be groupt together inside the console
  console.group(action.type)
    console.log('The Action: ', action)
    // return value here by invoking next which is going to be dipatched passing the action
    // that will update the state.
    const returnValue = next(action)
    console.log('The new State: ', store.getState())
  console.groupEnd()
  return returnValue
}

export default logger
