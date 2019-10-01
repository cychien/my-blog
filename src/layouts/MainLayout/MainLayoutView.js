import React from 'react'
import { useStaticQuery, graphql, navigate } from 'gatsby'
import Image from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import OutsideListener from '../../components/OutsideListener'
import avatar from '../../assets/images/avatar.png'
import './mainLayout.scss'

function MainLayoutView({ children, isMenuOpen, toggleMenu }) {
  const avatarImageSrc = useStaticQuery(graphql`
    query {
      allFile(filter: { name: { eq: "avatar" } }) {
        edges {
          node {
            childImageSharp {
              fixed(width: 36, height: 36) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  `)

  return (
    <div className="main-layout__wrapper">
      <div className="main-layout__header">
        <OutsideListener
          onClickOutside={() => {
            if (isMenuOpen) toggleMenu()
          }}
        >
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
        </OutsideListener>
        <div className="main-layout__name">Justin Chien</div>
        <div>
          <Image
            fixed={avatarImageSrc.allFile.edges[0].node.childImageSharp.fixed}
            className="main-layout__avatar"
          />
        </div>
      </div>
      {children}
    </div>
  )
}

export default MainLayoutView
