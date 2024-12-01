import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/App'
import { HashRouter } from 'react-router-dom'
import actionCable from 'actioncable'

const CableApp = {}
// CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable')
CableApp.cable = actionCable.createConsumer('wss://dating-app-m4tz.onrender.com/cable')

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <HashRouter>
    <React.StrictMode>
      <App cable={CableApp.cable}/>
    </React.StrictMode>
  </HashRouter>
)
