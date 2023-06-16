//  index.jsx
//  - The entry/start point for the front-end.

// Import dependencies
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.scss'

// Renders the App component into the 'root' div, included in index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
