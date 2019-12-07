import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import { createStore } from 'redux'
import provider from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'

const store =createStore(reducer, middleware)

ReactDOM.render(
  <provider store ={ store }>
    <App />
  </provider>
  , document.getElementById('root')
)
