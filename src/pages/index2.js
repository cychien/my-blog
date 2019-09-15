import React, { useState, useRef } from 'react'
import Color from 'color'
// import {
//   useSpring,
//   animated,
//   interpolate,
//   useChain,
//   useTrail,
// } from 'react-spring'
import Image from 'gatsby-image'
//import MainCSSProvider from '../layouts/MainCSSProvider'
//import './index.scss'

const PreviewBlock = ({ img, title }) => (
  <div className="index-page__preview-block">
    <div style={{ position: 'relative' }}>
      <Image
        fluid={img}
        style={{
          maxWidth: '328px',
          maxHeight: '185px',
          borderRadius: '20px',
        }}
        imgStyle={{
          borderRadius: '20px',
        }}
      />
      <div className="index-page__preview-block-title">{title}</div>
    </div>
  </div>
)

const generateBgColor = colorString => {
  return Color(colorString)
    .alpha(0.1)
    .hsl()
    .string()
}

const generateTextColor = colorString => {
  return Color(colorString)
    .darken(0.7)
    .hsl()
    .string()
}

const findArticleLayout = article => {
  const articleLayout = {
    life: {
      color: '#F9AA25',
      bgColor: generateBgColor('#F9AA25'),
      textColor: generateTextColor('#F9AA25'),
    },
    productivity: {
      color: '#21BA45',
      bgColor: generateBgColor('#21BA45'),
      textColor: generateTextColor('#21BA45'),
    },
    web: {
      color: '#2185D0',
      bgColor: generateBgColor('#2185D0'),
      textColor: generateTextColor('#2185D0'),
    },
  }
  return articleLayout[article] || null
}

function Index({ data }) {
  const [activeArticleType, setActiveArticleType] = useState('life')
  const [currentPostIndex, setCurrentPostIndex] = useState(0)
  const bgColor = findArticleLayout(activeArticleType)
    ? findArticleLayout(activeArticleType).bgColor
    : '#fff'
  const textColor = findArticleLayout(activeArticleType)
    ? findArticleLayout(activeArticleType).textColor
    : '#fff'
  const baseColor = findArticleLayout(activeArticleType)
    ? findArticleLayout(activeArticleType).color
    : '#fff'
  const introWrapperSpringRef = useRef()
  const { isOpen } = useSpring({
    from: { isOpen: 0 },
    isOpen: 1,
    ref: introWrapperSpringRef,
  })
  const introHeadingRef = useRef()
  const { opacity: headerOpacity, y: headerY } = useSpring({
    from: { opacity: 0, y: -20 },
    opacity: 1,
    y: 0,
    ref: introHeadingRef,
  })
  const introTextRef = useRef()
  const { opacity: textOpacity, y: textY } = useSpring({
    from: { opacity: 0, y: -20 },
    opacity: 1,
    y: 0,
    ref: introTextRef,
  })
  const blogOverviewRef = useRef()
  const blogOverviewSpring = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    ref: blogOverviewRef,
  })

  const { edges: posts } = data.allMdx
  let currentTypePosts = posts.filter(
    post => post.node.frontmatter.type === activeArticleType
  )
  if (currentTypePosts.length >= 6) {
    currentTypePosts = currentTypePosts.slice(0, 6)
  }

  const articleRef = useRef()
  const articleSpring = useTrail(currentTypePosts.length, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    opacity: 1,
    transform: 'translate3d(0%,0,0)',
    ref: articleRef,
  })

  useChain(
    [
      introWrapperSpringRef,
      introHeadingRef,
      introTextRef,
      blogOverviewRef,
      articleRef,
    ],
    [0, 0.4, 1, 1.5, 2]
  )

  return (
    <MainCSSProvider>
      <div className="index-page" style={{ backgroundColor: bgColor }}>
        <animated.div
          className="index-page__intro-wrapper"
          style={{
            width: isOpen.interpolate(isOpen =>
              isOpen === 0 ? '0px' : `calc((56.25% - 66px) * ${isOpen})`
            ),
          }}
        >
          <div className="index-page__intro">
            <animated.h1
              className="index-page__heading"
              style={{
                opacity: headerOpacity,
                transform: headerY.interpolate(
                  headerY => `translate3d(0, ${headerY}px, 0)`
                ),
              }}
            >
              <span className="index-page__name">Hi I am Justin</span>
            </animated.h1>
            <animated.div
              className="index-page__intro-text"
              style={{
                opacity: textOpacity,
                transform: textY.interpolate(
                  textY => `translate3d(0, ${textY}px, 0)`
                ),
              }}
            >
              <div>我熱愛吸收新知，同時也熱愛分享生活與知識</div>
              <div>希望你能在這裡發現更多看事情的不同角度</div>
            </animated.div>
          </div>
        </animated.div>
        <animated.div style={blogOverviewSpring}>
          <Grid style={{ marginTop: 0 }}>
            <Grid.Row columns={2}>
              <Grid.Column width={9}></Grid.Column>
              <Grid.Column width={7} floated="right">
                <div className="index-page__overview">
                  <div className="index-page__article-type-btns">
                    {activeArticleType === 'life' ? (
                      <Button
                        color="yellow"
                        className="index-page__article-type-btn"
                        style={{
                          boxShadow: `0px 0px 8px 3px ${baseColor}`,
                        }}
                        onMouseEnter={() => setActiveArticleType('life')}
                      >
                        人生方向
                      </Button>
                    ) : (
                      <div
                        className="index-page__article-type-btn--inactive"
                        onMouseEnter={() => setActiveArticleType('life')}
                      >
                        人生方向
                      </div>
                    )}

                    {activeArticleType === 'productivity' ? (
                      <Button
                        color="green"
                        className="index-page__article-type-btn"
                        style={{
                          boxShadow: `0 0 8px 3px ${baseColor}`,
                        }}
                        onMouseEnter={() =>
                          setActiveArticleType('productivity')
                        }
                      >
                        生產力
                      </Button>
                    ) : (
                      <div
                        className="index-page__article-type-btn--inactive"
                        onMouseEnter={() =>
                          setActiveArticleType('productivity')
                        }
                      >
                        生產力
                      </div>
                    )}

                    {activeArticleType === 'web' ? (
                      <Button
                        color="blue"
                        className="index-page__article-type-btn"
                        style={{ boxShadow: `0 0 8px 3px ${baseColor}` }}
                        onMouseEnter={() => setActiveArticleType('web')}
                      >
                        網頁開發
                      </Button>
                    ) : (
                      <div
                        className="index-page__article-type-btn--inactive"
                        onMouseEnter={() => setActiveArticleType('web')}
                      >
                        網頁開發
                      </div>
                    )}
                  </div>
                  {currentTypePosts.length > 0 && (
                    <div className="index-page__preview">
                      <animated.div className="index-page__preview-wrapper">
                        {articleSpring.map(({ ...rest }, index) => {
                          if (index === currentPostIndex) {
                            return (
                              <animated.div
                                style={{ ...rest }}
                                key={currentTypePosts[index].node.id}
                              >
                                <PreviewBlock
                                  img={
                                    currentTypePosts[index].node.frontmatter
                                      .cover.childImageSharp.fluid
                                  }
                                  title={
                                    currentTypePosts[index].node.frontmatter
                                      .title
                                  }
                                />
                              </animated.div>
                            )
                          }
                          return (
                            <animated.div
                              key={currentTypePosts[index].node.id}
                              className="index-page__other-article"
                              style={{ ...rest }}
                            >
                              <span
                                style={{
                                  color: textColor,
                                  opacity:
                                    Math.abs(index - currentPostIndex) === 1
                                      ? 1
                                      : Math.abs(index - currentPostIndex) === 2
                                      ? 0.7
                                      : 0.3,
                                }}
                                onMouseEnter={() => {
                                  setCurrentPostIndex(index)
                                }}
                              >
                                {currentTypePosts[index].node.frontmatter.title}
                              </span>
                            </animated.div>
                          )
                        })}
                      </animated.div>
                    </div>
                  )}
                </div>
                <div className="index-page__entry">to my Blog</div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </animated.div>
      </div>
    </MainCSSProvider>
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
