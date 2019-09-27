import React from 'react'
import { navigate } from 'gatsby'
import Headroom from 'react-headroom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import './articleLayout.scss'

function ArticleLayoutView({ children }) {
  return (
    <div className="article-layout__wrapper">
      <Headroom wrapperStyle={{ position: 'absolute' }}>
        <div className="article-layout__header" onClick={() => navigate('/')}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
      </Headroom>
      {children}
    </div>
  )
}

export default ArticleLayoutView
