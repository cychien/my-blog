import React from 'react'
import { navigate } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import avatar from '../../assets/images/gatsby-icon.png'
import './mainLayout.scss'

function MainLayoutView({ children, isMenuOpen, toggleMenu }) {
  return (
    <div className="main-layout__wrapper">
      <div className="main-layout__header">
        <div className="main-layout__menu">
          <div className="main-layout__menu-icon" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} />
          </div>
          {isMenuOpen && (
            <div className="main-layout__select">
              <div
                className="main-layout__select-option"
                onClick={() => navigate('/')}
              >
                文章
              </div>
              <div
                className="main-layout__select-option"
                onClick={() => navigate('/about')}
              >
                關於我
              </div>
            </div>
          )}
        </div>
        <div className="main-layout__name">Justin Chien</div>
        <div>
          <img src={avatar} className="main-layout__avatar" />
        </div>
      </div>
      {children}
    </div>
  )
}

export default MainLayoutView
