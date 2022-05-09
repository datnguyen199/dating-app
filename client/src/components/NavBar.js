import React from 'react'
import colorLogo from '../images/color_logo.png'
import whiteLogo from '../images/white_logo.png'

function NavBar({ user, minimal, showAuth, setShowAuth }) {
  return (
    <nav>
      <div className="logo-container">
        <img className="logo" src={minimal ? colorLogo : whiteLogo} />
      </div>
      {!user.id
       && 
      <button className="nav-button" disabled={showAuth} onClick={() => setShowAuth(true)}>
        Login
      </button>}
    </nav>
  )
}

export default NavBar