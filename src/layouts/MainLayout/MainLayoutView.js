import React from 'react'
import { Link } from 'gatsby'
import './mainLayout.scss'

function MainLayoutView({ children }) {
  return (
    <div className="main-layout__wrapper">
      <div className="main-layout__header">
        <h1 className="main-layout__name">Justin Chien</h1>
        <div className="main-layout__navbar">
          <Link
            to="/"
            className="main-layout__navbar-tab"
            activeClassName="main-layout__navbar-tab--active"
          >
            文章
          </Link>
          <Link
            to="/about"
            className="main-layout__navbar-tab"
            activeClassName="main-layout__navbar-tab--active"
          >
            關於我
          </Link>
        </div>
      </div>
      {children}
    </div>
  )
}

export default MainLayoutView
