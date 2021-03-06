import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import moment from 'moment'
import ArticleLayout from '../../layouts/ArticleLayout'
import SEO from '../../components/SEO'
import CodeBlock from '../../components/CodeBlock'
import './postTemplate.scss'

function PostTemplateView({ data }) {
  return (
    <ArticleLayout>
      <SEO
        title={data.mdx.frontmatter.title}
        description={data.mdx.frontmatter.excerpt}
        image={`${data.mdx.frontmatter.cover.publicURL}`}
        pathname={`/${data.mdx.frontmatter.title}`}
        isArticle
      />
      <div className="post__title-info--desktop">
        <h1 className="post__title--desktop">{data.mdx.frontmatter.title}</h1>
        <div className="post__metadata--desktop">
          <div>{moment(data.mdx.frontmatter.date).format('YYYY-MM-DD')}</div>
          <div>{data.mdx.frontmatter.readingTime} 分鐘</div>
        </div>
      </div>
      <div className="post__cover">
        <Image fluid={data.mdx.frontmatter.cover.childImageSharp.fluid} />
      </div>
      <div className="post__content-wrapper">
        <div className="post__title-info--mobile">
          <h1 className="post__title--mobile">{data.mdx.frontmatter.title}</h1>
          <div className="post__metadata--mobile">
            <div>{moment(data.mdx.frontmatter.date).format('YYYY-MM-DD')}</div>
            <div>{data.mdx.frontmatter.readingTime} 分鐘</div>
          </div>
        </div>

        <MDXProvider
          components={{
            a: props => <a {...props} className="post__mdx-a" />,
            p: props => <p {...props} className="post__mdx-p" />,
            h2: props => <h2 {...props} className="post__mdx-h2" />,
            h3: props => <h3 {...props} className="post__mdx-h3" />,
            pre: props => <pre {...props} className="post__mdx-pre" />,
            ol: props => <ol {...props} className="post__mdx-ol" />,
            li: props => <li {...props} className="post__mdx-li" />,
            blockquote: props => (
              <blockquote {...props} className="post__mdx-blockquote" />
            ),
            strong: props => <strong {...props} className="post__mdx-strong" />,
            code: CodeBlock,
          }}
        >
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </MDXProvider>
      </div>
    </ArticleLayout>
  )
}

export const query = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        cover {
          publicURL
          childImageSharp {
            fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        date
        readingTime
        excerpt
      }
    }
  }
`

export default PostTemplateView
