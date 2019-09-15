import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import SEO from '../../components/SEO'
//import MainCSSProvider from '../../layouts/MainCSSProvider'
//import { Container, Segment, Grid, Icon } from 'semantic-ui-react'
import Headroom from 'react-headroom'
//import './postTemplate.scss'

function PostTemplateView() {
  const data = useStaticQuery(graphql`
    query($id: String) {
      mdx(id: { eq: $id }) {
        id
        body
        frontmatter {
          title
          cover {
            childImageSharp {
              fluid(maxWidth: 2000) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)

  return (
    <MainCSSProvider>
      <Headroom>
        <div className="post-template__header">
          <div className="post-template__header-logo">Justin Chien's blog</div>
          <div className="post-template__header-go-back">
            <Link to="/">回首頁</Link>
          </div>
        </div>
      </Headroom>
      <SEO title={data.mdx.frontmatter.title} />
      <Container fluid className="post-template__container">
        <h1>{data.mdx.frontmatter.title}</h1>
        <div className="post-template__image-container">
          <Image
            fluid={data.mdx.frontmatter.cover.childImageSharp.fluid}
            className="post-template__image"
          />
        </div>
        <div className="post-template__segment-container">
          <Segment raised padded="very" className="post-template__segment">
            <MDXProvider
              components={{
                a: props => <a {...props} className="custom-mdx__a" />,
                p: props => <p {...props} className="custom-mdx__p" />,
                blockquote: props => (
                  <blockquote {...props} className="custom-mdx__blockquote" />
                ),
              }}
            >
              <MDXRenderer>{data.mdx.body}</MDXRenderer>
            </MDXProvider>
          </Segment>
        </div>
        <div className="post-template__home">
          <Link to="/">
            <Icon name="home" className="post-template__home-icon" />
            回首頁
          </Link>
        </div>
        {/**
           * 
           * <div className="post-template__watch-more">
          <h3>相關文章</h3>
          <Grid columns={4} className="post-template__promote-articles">
            <Grid.Row>
              <Grid.Column>
                <Segment
                  color="brown"
                  inverted
                  className="post-template__promote-article post-template__promote-article--mix"
                  raised
                  stacked
                >
                  <Icon name="star" />
                  人生方向
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment className="post-template__promote-article" raised>
                  123
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment className="post-template__promote-article" raised>
                  123
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment className="post-template__promote-article" raised>
                  123
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
           * 
           */}
      </Container>
    </MainCSSProvider>
  )
}

export default PostTemplateView
