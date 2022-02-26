import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link className="navbar-brand m-1" to="/">Mitigant crypto</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item active mt-1">
                  <Link className="nav-link" to="/">Home </Link>
                </li>


            </ul>
            </div>
        </nav>

  )
}

export default Navbar