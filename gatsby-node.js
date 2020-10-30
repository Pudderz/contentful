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
            categories
            post {
              childMdx {
                frontmatter {
                  slug
                  title
                  Date
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
  const blogPosts= results.data.allContentfulTeam.edges
  //paginates /posts to divide the full list of pages up
  //itemsPerPage edit to change number of items per post page
  paginate({
    createPage,
    items: blogPosts,
    itemsPerPage: 4,
    pathPrefix: "/posts",
    component: path.resolve("./src/templates/listOfPages.js"),
  });

  //creates pages for each blog post
  blogPosts.forEach((edge, index) => {
    const product = edge.node.post.childMdx;
    createPage({
      path: `/blogs/${product.frontmatter.slug}`,
      component: require.resolve("./src/templates/blogPage.js"),
      context: {
        slug: product.frontmatter.slug,
        previous:(index === blogPosts.length-1)? null : blogPosts[index + 1].node.post.childMdx.frontmatter.slug,
        next: (index === 0)?  null : blogPosts[index-1].node.post.childMdx.frontmatter.slug,
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
