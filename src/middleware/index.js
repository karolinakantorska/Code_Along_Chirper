import thunk from 'redux-thunk'
import logger from './logger'
import { applyMiddleware } from 'redux'

// invocation of apply applyMiddleware
export default applyMiddleware(
  thunk,
  logger
)
