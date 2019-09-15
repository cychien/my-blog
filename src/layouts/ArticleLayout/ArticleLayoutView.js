import React from 'react'
import { navigate } from 'gatsby'
import Headroom from 'react-headroom'
import './articleLayout.scss'

function ArticleLayoutView({ children }) {
  return (
    <div className="article-layout__wrapper">
      <Headroom wrapperStyle={{ marginBottom: '46px' }}>
        <div className="article-layout__header" onClick={() => navigate('/')}>
          Justin Chien
        </div>
      </Headroom>
      {children}
    </div>
  )
}

export default ArticleLayoutView
