import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'
import MainCSSProvider from '../MainCSSProvider'
import { Container, Button, Icon } from 'semantic-ui-react'
import './categoryLayout.scss'

function CategoryLayoutView({ children }) {
  const data = useStaticQuery(graphql`
    query {
      coverImage: file(relativePath: { eq: "cover.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      logo: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fixed(width: 300) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <MainCSSProvider>
      <BackgroundImage
        Tag="div"
        className="cover"
        fluid={data.coverImage.childImageSharp.fluid}
      >
        <Container className="cover__content">
          <div>
            <h1 className="cover__logo">Justin Chien's blog</h1>
            <div className="cover__intro">
              <div>嗨 👋🏼 ，我是Justin</div>
              <div>平時我喜歡寫網頁、閱讀和分享自己的想法</div>
              <div>希望能透過文字和大家一起成長 🚀</div>
            </div>
          </div>
          {/* <div className="cover__compass">
            <Button color="brown" icon labelPosition="left" inverted>
              <Icon name="star" />
              人生方向
            </Button>
            <Button color="purple" icon labelPosition="left" inverted>
              <Icon name="rocket" />
              生產力
            </Button>
            <Button color="blue" icon labelPosition="left" inverted>
              <Icon name="computer" />
              網頁開發
            </Button>
          </div> */}
        </Container>
      </BackgroundImage>
      <Container>{children}</Container>
    </MainCSSProvider>
  )
}

export default CategoryLayoutView
