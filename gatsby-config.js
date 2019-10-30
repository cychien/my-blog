module.exports = {
  siteMetadata: {
    title: `Justin Chien's Blog`,
    description: `嗨，我是 Justin！目前是資管所碩士班學生、前端工程師和閱讀愛好者，希望透過部落格傳播對大家有幫助的內容，歡迎與我交流或做朋友 :)`,
    siteUrl: 'https://justinchien.co',
    image: `https://lh3.googleusercontent.com/8jeVfMw1305bUGvxelflplQELnRHNYgd7MXveIc950Okyg5N6Tsu-kT9BW-ApErGbagNDC5ISle65A36E4HX8hgOLRc4ZpKzvTVeDk9OhcsM9vLY_qV_lNIXiT6JREOoRh6DJeBHxLL9LS_K158LvyYprz44xSGjKp26fBVxEfhJlUVCEGjWafblBGb3vPX2An9sH4ojQ6u5a-W4ZBTfAPP9YkqFLgunz15pNEMSTFzUSRG02bWbWntQ7LCwQurUEhNEqmOSjvLY1Ed3cV4tL6PCkaVQATRxfkChWCa-IoDGJus6Ioe7UqJ5HBF7kc1EOBN0I47Paxo5fsTLmyXViCC1Ldwa1mWny6N63aOtCywczsxhhKxbepLauVOSspEy0UJWJNKMn3gEd_cVToUGYwckJCbnONBXKqxfyTQnmQXM3iAogYxh1cNPcMkJd3s5t4DwOEfNwjFz8sm6P0lNsnGLVjiGz2ZaEPkaZIxYRx7kZnB4CRxQyBIbMF18-6R4VmKPEnCKXvPEGvjQwtyGK5SJvxjev9lkYD91M8m4ENS1emT4UWdfM_1JPrvCwkw-Zr6Qosbx8kPDSEwlPCc9Mv7Cfu27IzFUahien9ri9yzTNv8ba_e4x6oXKRE4PsPvkWC1uBiwAxPwfBDLVRE_xw1lbxHNLWA6c5Bh7t7DRBePdf9noYRf02Q=s969-no`,
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
        head: true,
        anonymize: false,
        respectDNT: true,
        pageTransitionDelay: 0,
      },
    },
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-sitemap`,
  ],
}
