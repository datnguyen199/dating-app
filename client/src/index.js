import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/App'
import { HashRouter } from 'react-router-dom'
import actionCable from 'actioncable'

const CableApp = {}
// CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable')
try {
  CableApp.cable = actionCable.createConsumer('ws://100.27.193.20.compute-1.amazonaws.com/cable')
  console.log('Attempting WebSocket connection...');

  // Access the underlying WebSocket for logging
  const socket = CableApp.cable.connection.webSocket;

  socket.onopen = () => {
    console.log('WebSocket connection established successfully.');
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  socket.onclose = (event) => {
    console.error(
      `WebSocket connection closed: ${
        event.reason || 'No specific reason provided'
      }, code: ${event.code}`
    );
  };
} catch (error) {
  console.error('Failed to establish WebSocket connection:', error);
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <HashRouter>
    <React.StrictMode>
      <App cable={CableApp.cable}/>
    </React.StrictMode>
  </HashRouter>
)
