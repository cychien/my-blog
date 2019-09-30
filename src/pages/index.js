import React, { useState } from 'react'
import { navigate } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import cx from 'classnames'
import moment from 'moment'
import MainLayout from '../layouts/MainLayout'
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
      <div className="index__article-min">{readingTime} 分鐘</div>
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
  const displayPostSortByTime = displayPosts
    .slice()
    .sort((a, b) =>
      moment(a.node.frontmatter.date).isAfter(moment(b.node.frontmatter.date))
    )
  const postRemainder = posts.length % 3
  const displayPostsRemainder =
    postRemainder === 0 ? [] : displayPostSortByTime.slice(0, postRemainder)
  const displayPostsMinusRemainder =
    postRemainder === 0
      ? displayPostSortByTime
      : displayPostSortByTime.slice(postRemainder)

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
          {displayPostsRemainder.map(post => (
            <div
              key={post.node.id}
              className={cx({
                'col-12': postRemainder === 1,
                'col-lg-6 col-md-6 col-12': postRemainder === 2,
              })}
            >
              <Article
                link={post.node.fields.slug}
                title={post.node.frontmatter.title}
                thumbnail={post.node.frontmatter.cover.childImageSharp.fluid}
                type={findArticleTypeLabel(post.node.frontmatter.type)}
                readingTime={post.node.frontmatter.readingTime}
              />
            </div>
          ))}
          {displayPostsMinusRemainder.map(post => (
            <div key={post.node.id} className="col-lg-4 col-sm-6 col-12">
              <Article
                link={post.node.fields.slug}
                title={post.node.frontmatter.title}
                thumbnail={post.node.frontmatter.cover.childImageSharp.fluid}
                type={findArticleTypeLabel(post.node.frontmatter.type)}
                readingTime={post.node.frontmatter.readingTime}
              />
            </div>
          ))}
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
            date(formatString: "YYYY-MM-DD")
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
