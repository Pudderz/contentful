//import { paginate } from 'gatsby-awesome-pagination'
const { paginate } = require("gatsby-awesome-pagination");
const path = require("path");
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const results = await graphql(`
    {
      allContentfulTeam(
        sort: { fields: [post___childMdx___frontmatter___Date], order: DESC }
      ) {
        edges {
          node {
            post {
              childMdx {
                frontmatter {
                  slug
                }
              }
            }
          }
        }
      }
    }
  `);

  if (results.error) {
    console.log("There was an error");
    return;
  }
  //paginates /posts to divide the full list of pages up
  //itemsPerPage edit to change number of items per post page
  paginate({
    createPage,
    items: results.data.allContentfulTeam.edges,
    itemsPerPage: 4,
    pathPrefix: "/posts",
    component: path.resolve("./src/templates/listOfPages.js"),
  });

  //creates pages for each blog post
  results.data.allContentfulTeam.edges.forEach((edge) => {
    const product = edge.node.post.childMdx;
    createPage({
      path: `/blogs/${product.frontmatter.slug}`,
      component: require.resolve("./src/templates/blogPage.js"),
      context: {
        slug: product.frontmatter.slug,
      },
    });
  });
};
