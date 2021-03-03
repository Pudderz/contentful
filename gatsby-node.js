//import { paginate } from 'gatsby-awesome-pagination'
const { paginate } = require("gatsby-awesome-pagination");
const path = require("path");

// const crypto = require("crypto");
// const { google } = require("googleapis");

require("dotenv").config();

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const results = await graphql(`
    {
      allContentfulTeam(
        sort: { fields: [post___childMdx___frontmatter___Date], order: DESC }
      ) {
        edges {
          node {
            categories
            post {
              childMdx {
                frontmatter {
                  slug
                  title
                  Date
                  postedAt
                }
              }
            }
          }
        }
      }
    }
  `);

  if (results.error) {
    console.log("There was an error"+ results.error);
    return;
  }
  const blogPosts = results.data.allContentfulTeam.edges;
  //paginates /posts to divide the full list of pages up
  //itemsPerPage edit to change number of items per post page
  paginate({
    createPage,
    items: blogPosts,
    itemsPerPage: 6,
    pathPrefix: "/posts",
    component: path.resolve("./src/templates/listOfPages.js"),
  });

  //  Creates page for each blog post
  blogPosts.forEach((edge, index) => {
    const product = edge.node.post.childMdx;
    createPage({
      path: `/blogs/${product.frontmatter.slug}`,
      component: require.resolve("./src/templates/blogPage.js"),
      context: {
        slug: product.frontmatter.slug,
        previous:
          index === blogPosts.length - 1
            ? null
            : blogPosts[index + 1].node.post.childMdx.frontmatter.slug,
        next:
          index === 0
            ? null
            : blogPosts[index - 1].node.post.childMdx.frontmatter.slug,
      },
    });
  });

  createPage({
    path: "/search",
    component: path.resolve(`./src/templates/searchTemplate.js`),
    context: {
      blogData: {
        allBlogs: blogPosts,
        options: {
          indexStrategy: "All",
          searchSanitizer: "Lower Case",
        },
      },
    },
  });
};

// exports.sourceNodes = async ({ actions }) => {
//   const { createNode } = actions;

//   // google auth logic
//   const scopes = "https://www.googleapis.com/auth/analytics.readonly";
//   const jwt = new google.auth.JWT(
//     process.env.CLIENT_EMAIL,
//     null,
//     process.env.PRIVATE_KEY,
//     scopes
//   );
//   await jwt.authorize();

//   const analyticsReporting = google.analyticsreporting({
//     version: "v4",
//     auth: jwt,
//   });

//   // Analytics Reporting v4 query
//   const result = await analyticsReporting.reports.batchGet({
//     requestBody: {
//       reportRequests: [
//         {
//           viewId: process.env.VIEWID,
//           dateRanges: [
//             {
//               startDate: "30DaysAgo",
//               endDate: "today",
//             },
//           ],
//           metrics: [
//             {
//               expression: "ga:pageviews",
//             },
//           ],
//           dimensions: [
//             {
//               name: "ga:pagePath",
//             },
//           ],
//           orderBys: [
//             {
//               sortOrder: "DESCENDING",
//               fieldName: "ga:pageviews",
//             },
//           ],
//         },
//       ],
//     },
//   });

//   // Add analytics data to graphql
//   const { rows } = result.data.reports[0].data;
//   for (const { dimensions, metrics } of rows) {
//     const path = dimensions[0];
//     const totalCount = metrics[0].values[0];
//     createNode({
//       path,
//       totalCount: Number(totalCount),
//       id: path,
//       internal: {
//         type: `PageViews`,
//         contentDigest: crypto
//           .createHash(`md5`)
//           .update(JSON.stringify({ path, totalCount }))
//           .digest(`hex`),
//         mediaType: `text/plain`,
//         description: `Page views per path`,
//       },
//     });
//   }
// };
