require('dotenv').config({
  path: `.env`,
})


module.exports = {
  /* Your site config here */
  //pathPrefix: "/Gatsby-Project",
  siteMetadata: {
    siteUrl: process.env.GATSBY_SITEURL
  },
  plugins: [
  {resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Gatsby Blog",
        short_name: "GatsbyBlog",
        start_url: "/",
        background_color: "#131127",
        theme_color: "#2d2640",
        display: "standalone",
        icon: "static/favicon.ico",
        icon_options: {
          purpose: `maskable`,
        },
      }
  },
  {
    resolve: 'gatsby-source-contentful',
    options: {
      spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
      accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
    }
  },
    
  'gatsby-plugin-offline',
  `gatsby-plugin-react-helmet`,
  "gatsby-transformer-sharp",
  "gatsby-plugin-sharp",
  "gatsby-plugin-sass",
  {
    resolve: 'gatsby-plugin-html-attributes',
    options: {
      lang: 'en'
    }
  },
  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      extensions: ['.md', '.mdx'],
      gatsbyRemarkPlugins: [
        {
          resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
            },
          
        },
        {
          resolve: `gatsby-remark-vscode`,
          options: {
            theme: 'Abyss' // Or install your favorite theme from GitHub
          }
        },
        {
          resolve: `gatsby-remark-embedder`,
          options: {
            customTransformers: [
              // Your custom transformers
            ],
            services: {
              // The service-specific options by the name of the service
            },
          },
        },
        `gatsby-remark-autolink-headers`,
        `gatsby-remark-slug`,
        {
          resolve: "gatsby-plugin-page-creator",
          options: {
            path: `${__dirname}/src/posts`,
          },
        }
      ]
      

    }
    
  }
    

],
}
