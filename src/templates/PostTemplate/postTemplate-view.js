import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import moment from 'moment'
import ArticleLayout from '../../layouts/ArticleLayout'
import SEO from '../../components/SEO'
import './postTemplate.scss'

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
          date
          readingTime
        }
      }
    }
  `)

  return (
    <ArticleLayout>
      <div className="container">
        <h1 className="post__title">{data.mdx.frontmatter.title}</h1>
        <div className="post__metadata">
          <div>{moment(data.mdx.frontmatter.date).format('YYYY-MM-DD')}</div>
          <div>{data.mdx.frontmatter.readingTime} min</div>
        </div>
        <div className="post__cover">
          <Image
            fluid={data.mdx.frontmatter.cover.childImageSharp.fluid}
            style={{ borderRadius: '5px' }}
          />
        </div>
        <MDXProvider
          components={{
            a: props => <a {...props} className="post__mdx-a" />,
            p: props => <p {...props} className="post__mdx-p" />,
            blockquote: props => (
              <blockquote {...props} className="post__mdx-blockquote" />
            ),
          }}
        >
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </MDXProvider>
      </div>
    </ArticleLayout>
  )
}

export default PostTemplateView
