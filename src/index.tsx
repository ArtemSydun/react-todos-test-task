import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './styles/index.scss'
import { App } from './app'
import { QueryClient, QueryClientProvider } from 'react-query'

const root = ReactDOM.createRoot(
  document.querySelector('#root') as HTMLElement,
)

const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
