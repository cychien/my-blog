import React, { Fragment, useState } from 'react'
import MainLayoutView from './MainLayoutView'

function MainLayoutContainer(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState)
  }

  return (
    <Fragment>
      <MainLayoutView
        children={props.children}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
      />
    </Fragment>
  )
}

export default MainLayoutContainer
