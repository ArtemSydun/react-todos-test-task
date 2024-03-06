/* eslint-disable import/no-unresolved */
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './styles/index.scss'
import { App } from './app'
import { Provider } from 'react-redux'
import { store } from './store'

const root = ReactDOM.createRoot(
  document.querySelector('#root') as HTMLElement,
)
root.render(
  <React.StrictMode>
    <Provider store={store}>

      <App />

    </Provider>
  </React.StrictMode>,
)
