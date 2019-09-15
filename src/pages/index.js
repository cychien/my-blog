import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import BackgroundImage from 'gatsby-background-image'
import MainLayout from '../layouts/MainLayout'
import './index.scss'

const findArticleTypeLabel = type => {
  const typeLabelMap = {
    all: '所有文章',
    life: '人生方向',
    productivity: '生產力',
    web: '網頁開發',
  }
  return typeLabelMap[type] || null
}

const Article = ({ link, title, thumbnail, type, readingTime }) => (
  <BackgroundImage
    Tag="div"
    className="index__article"
    fluid={thumbnail}
    onClick={() => navigate(link)}
  >
    <div className="index__article-type">{type}</div>
    <div className="index__article-banner">
      <div className="index__article-title">{title}</div>
      <div className="index__article-min">{readingTime} min</div>
    </div>
  </BackgroundImage>
)

function Index({ data }) {
  const [showArticleTypeSelect, setShowArticleTypeSelect] = useState(false)
  const [articleType, setArticleType] = useState('all')
  const { edges: posts } = data.allMdx
  const displayPosts =
    articleType === 'all'
      ? posts
      : posts.filter(post => post.node.frontmatter.type === articleType)

  return (
    <MainLayout>
      <div className="container">
        <div className="index__article-type-label">
          <span
            onClick={() => setShowArticleTypeSelect(prevState => !prevState)}
          >
            {findArticleTypeLabel(articleType)}
            <FontAwesomeIcon icon={faCaretDown} className="ml-2" />
          </span>
          {showArticleTypeSelect && (
            <div className="index__article-type-select">
              {articleType !== 'all' && (
                <div
                  className="index__article-type-option"
                  onClick={() => {
                    setArticleType('all')
                    setShowArticleTypeSelect(false)
                  }}
                >
                  所有文章
                </div>
              )}
              {articleType !== 'life' && (
                <div
                  className="index__article-type-option"
                  onClick={() => {
                    setArticleType('life')
                    setShowArticleTypeSelect(false)
                  }}
                >
                  人生方向
                </div>
              )}
              {articleType !== 'productivity' && (
                <div
                  className="index__article-type-option"
                  onClick={() => {
                    setArticleType('productivity')
                    setShowArticleTypeSelect(false)
                  }}
                >
                  生產力
                </div>
              )}
              {articleType !== 'web' && (
                <div
                  className="index__article-type-option"
                  onClick={() => {
                    setArticleType('web')
                    setShowArticleTypeSelect(false)
                  }}
                >
                  網頁開發
                </div>
              )}
            </div>
          )}
        </div>
        {displayPosts.map(post => (
          <Article
            key={post.node.id}
            link={post.node.fields.slug}
            title={post.node.frontmatter.title}
            thumbnail={post.node.frontmatter.cover.childImageSharp.fluid}
            type={findArticleTypeLabel(post.node.frontmatter.type)}
            readingTime={post.node.frontmatter.readingTime}
          />
        ))}
      </div>
    </MainLayout>
  )
}

export const pageQuery = graphql`
  query {
    allMdx {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            cover {
              childImageSharp {
                fluid(maxWidth: 800, cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            date(formatString: "YYYY.MM.DD")
            author
            type
            readingTime
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default Index
