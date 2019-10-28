/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function SEO({ title, description, pathname, siteImage, isArticle }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            url
            image
          }
        }
      }
    `
  )

  return (
    <Helmet
      title={title}
      titleTemplate="%s | Justin Chien"
      defaultTitle="Justin Chien's Blog"
    >
      <html lang="zh-tw" />
      <meta name="description" content={description || site.description} />
      <meta name="image" content={site.image} />
      {site.url && (
        <meta property="og:url" content={`${site.url}${pathname || '/'}`} />
      )}
      {isArticle && <meta property="og:type" content="article" />}
      {site.title && <meta property="og:title" content={title || site.title} />}
      {site.description && (
        <meta
          property="og:description"
          content={description || site.description}
        />
      )}
      {site.image && (
        <meta property="og:image" content={siteImage || site.image} />
      )}
    </Helmet>
  )
}

export default SEO
