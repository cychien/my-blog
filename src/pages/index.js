import React, { useState } from 'react'
import { navigate } from 'gatsby'
import Image from 'gatsby-image'
import cx from 'classnames'
import moment from 'moment'
import MainLayout from '../layouts/MainLayout'
import SEO from '../components/SEO'
import useWindowSize from '../hooks/useWindowSize'
import './index.scss'

const articleTypes = ['all', 'life', 'productivity', 'book']
const findArticleTypeLabel = type => {
  const typeLabelMap = {
    all: '所有文章',
    life: '人生建議',
    productivity: '生產力',
    book: '推書',
  }
  return typeLabelMap[type] || null
}

const Article = ({
  link,
  thumbnail,
  type,
  subType,
  title,
  excerpt,
  readingTime,
  isHorizontal,
}) => (
  <div
    className={cx('index__article', {
      'index__article--horizontal': isHorizontal,
    })}
    onClick={() => navigate(link)}
  >
    <Image fluid={thumbnail} className="index__article-thumbnail" />
    <div className="index__article-content">
      <div>
        <div className="index__article-type">
          {type}
          {subType && (
            <span
              style={{ color: '#16a085', marginLeft: '10px', fontSize: '14px' }}
            >
              #{subType}
            </span>
          )}
        </div>
        <div className="index__article-title">{title}</div>
        <div className="index__article-excerpt">
          {excerpt.substring(0, 50) + '...'}
        </div>
      </div>
      <div className="index__article-min">{readingTime} 分鐘</div>
    </div>
  </div>
)

function Index({ data }) {
  const windowSize = useWindowSize()
  const divisor = windowSize.width <= 992 ? 2 : 3
  const [selectedArticleType, setSelectedArticleType] = useState('all')
  const { edges: posts } = data.allMdx
  const displayPosts =
    selectedArticleType === 'all'
      ? posts
      : posts.filter(post => post.node.frontmatter.type === selectedArticleType)
  const displayPostSortByTime = displayPosts
    .slice()
    .sort(
      (a, b) =>
        moment(b.node.frontmatter.date).valueOf() -
        moment(a.node.frontmatter.date).valueOf()
    )
  const postRemainder = displayPosts.length % divisor
  const displayPostsRemainder =
    postRemainder === 0 ? [] : displayPostSortByTime.slice(0, postRemainder)
  const displayPostsMinusRemainder =
    postRemainder === 0
      ? displayPostSortByTime
      : displayPostSortByTime.slice(postRemainder)

  return (
    <MainLayout>
      <SEO />
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
              style={{ marginBottom: '30px' }}
            >
              <Article
                link={post.node.fields.slug}
                thumbnail={post.node.frontmatter.cover.childImageSharp.fluid}
                type={findArticleTypeLabel(post.node.frontmatter.type)}
                subType={post.node.frontmatter.subType}
                title={post.node.frontmatter.title}
                excerpt={post.node.frontmatter.excerpt}
                readingTime={post.node.frontmatter.readingTime}
                isHorizontal={postRemainder === 1}
              />
            </div>
          ))}
          {displayPostsMinusRemainder.map(post => (
            <div
              key={post.node.id}
              className="col-lg-4 col-sm-6 col-12"
              style={{ marginBottom: '30px' }}
            >
              <Article
                link={post.node.fields.slug}
                thumbnail={post.node.frontmatter.cover.childImageSharp.fluid}
                type={findArticleTypeLabel(post.node.frontmatter.type)}
                title={post.node.frontmatter.title}
                excerpt={post.node.frontmatter.excerpt}
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
          frontmatter {
            title
            cover {
              childImageSharp {
                fluid(maxWidth: 800, cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            excerpt
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
