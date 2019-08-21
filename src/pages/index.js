import React from 'react'
import { Link, graphql } from 'gatsby'
import { Grid } from 'semantic-ui-react'
import CategoryLayout from '../layouts/CategoryLayout'
import SEO from '../components/SEO'
import PostCard from '../components/PostCard'
import chunk from 'lodash.chunk'
import drop from 'lodash.drop'
import './index.scss'

const IndexPage = ({ data }) => {
  const { edges: posts } = data.allMdx
  const remainder = posts.length % 3
  return (
    <CategoryLayout>
      <SEO title="Justin Chien's blog" />
      <div className="category">
        <Grid columns="equal">
          {remainder === 1 && (
            <Grid.Row>
              <Grid.Column>
                <Link to={posts[0].node.fields.slug}>
                  <PostCard
                    title={posts[0].node.frontmatter.title}
                    date={posts[0].node.frontmatter.date}
                    author={posts[0].node.frontmatter.author}
                    cover={
                      posts[0].node.frontmatter.cover.childImageSharp.fluid
                    }
                    readingTime={posts[0].node.frontmatter.readingTime}
                    tag={posts[0].node.frontmatter.tag}
                    intro={posts[0].node.frontmatter.intro}
                    isCoverLeft
                  />
                </Link>
              </Grid.Column>
            </Grid.Row>
          )}
          {remainder === 2 && (
            <Grid.Row>
              <Grid.Column>
                <Link to={posts[0].node.fields.slug}>
                  <PostCard
                    title={posts[0].node.frontmatter.title}
                    date={posts[0].node.frontmatter.date}
                    author={posts[0].node.frontmatter.author}
                    cover={
                      posts[0].node.frontmatter.cover.childImageSharp.fluid
                    }
                    readingTime={posts[0].node.frontmatter.readingTime}
                    tag={posts[0].node.frontmatter.tag}
                    intro={posts[0].node.frontmatter.intro}
                  />
                </Link>
              </Grid.Column>
              <Grid.Column>
                <Link to={posts[1].node.fields.slug}>
                  <PostCard
                    title={posts[1].node.frontmatter.title}
                    date={posts[1].node.frontmatter.date}
                    author={posts[1].node.frontmatter.author}
                    cover={
                      posts[1].node.frontmatter.cover.childImageSharp.fluid
                    }
                    readingTime={posts[1].node.frontmatter.readingTime}
                    tag={posts[1].node.frontmatter.tag}
                    intro={posts[1].node.frontmatter.intro}
                  />
                </Link>
              </Grid.Column>
            </Grid.Row>
          )}
          {chunk(drop(posts, remainder), 3).map((group, index) => (
            <Grid.Row key={index}>
              {group.map(({ node: post }, subIndex) => (
                <Grid.Column key={`${index}-${subIndex}`}>
                  <Link to={post.fields.slug}>
                    <PostCard
                      title={post.frontmatter.title}
                      date={post.frontmatter.date}
                      author={post.frontmatter.author}
                      cover={post.frontmatter.cover.childImageSharp.fluid}
                      readingTime={post.frontmatter.readingTime}
                      tag={post.frontmatter.tag}
                      intro={post.frontmatter.intro}
                    />
                  </Link>
                </Grid.Column>
              ))}
            </Grid.Row>
          ))}
        </Grid>
      </div>
    </CategoryLayout>
  )
}

export const pageQuery = graphql`
  query blogIndex {
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
            tag
            readingTime
            intro
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default IndexPage
