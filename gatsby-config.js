module.exports = {
  siteMetadata: {
    title: `Justin Chien's Blog`,
    description: `嗨，我是 Justin！目前是資管所碩士班學生、前端工程師和閱讀愛好者，希望透過部落格傳播對大家有幫助的內容，也歡迎與我交流或做朋友 :)`,
    url: 'https://justinchien.co',
    image: `${__dirname}/src/assets/images/favicon.png`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1600,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Justin Chien's blog`,
        short_name: `Justin's blog`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#306060`,
        display: `minimal-ui`,
        icon: `src/assets/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-netlify`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-101659054-3',
        head: false,
        anonymize: false,
        respectDNT: true,
        pageTransitionDelay: 0,
      },
    },
  ],
}
