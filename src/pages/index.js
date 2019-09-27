import React, { useState } from 'react'
import { navigate } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import MainLayout from '../layouts/MainLayout'
import cx from 'classnames'
import './index.scss'

const articleTypes = ['all', 'life', 'productivity', 'web']
const findArticleTypeLabel = type => {
  const typeLabelMap = {
    all: '所有文章',
    life: '人生建議',
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
  const [selectedArticleType, setSelectedArticleType] = useState('all')
  const { edges: posts } = data.allMdx
  const displayPosts =
    selectedArticleType === 'all'
      ? posts
      : posts.filter(post => post.node.frontmatter.type === selectedArticleType)

  return (
    <MainLayout>
      <div className="index__wrapper">
        <div className="index__article-types">
          {articleTypes.map(articleType => (
            <div
              className={cx('index__article-type-btn', {
                'index__article-type-btn--active':
                  articleType === selectedArticleType,
              })}
              key={articleType}
              onClick={() => setSelectedArticleType(articleType)}
            >
              {findArticleTypeLabel(articleType)}
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-lg-4 col-sm-6 col-12">
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
        </div>
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
