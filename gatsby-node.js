//import { paginate } from 'gatsby-awesome-pagination'
const { paginate } = require("gatsby-awesome-pagination");
const path = require("path");


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
      allPageViews(sort: {order: DESC, fields: totalCount}, filter: {children: {}, id: {regex: "/blogs/"}}, limit: 4) {
        nodes {
          totalCount
          id
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

  // Category pages
  const categorySet = new Set();
  const categoryObject = {};

  //creates set of all categories
  blogPosts.map((article) =>
    article.node.categories.map((category) => {
      categorySet.add(category);
    })
  );

  //creates object contianing an array for each category
  categorySet.forEach((category) => (categoryObject[category] = []));

  //adds article into category object for each category it is in
  blogPosts.forEach((article, index) => {
    article.node.categories.map((category) => {
      categoryObject[category].push(article);
    });
  });

  //creates category pages containing all articles for that category

  for (category in categoryObject) {
    let slug=category.toLowerCase();
    slug= slug.split(' ').join('');
    paginate({
      createPage,
      items: categoryObject[category],
      itemsPerPage: 6,
      pathPrefix: `/category/${slug}`,
      component: path.resolve("./src/templates/categoryTemplate.js"),
      context:{
        category:category
      }
    });
  }

  // Search Page
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

  const popularPosts = results.data.allPageViews.nodes;
  console.log(popularPosts);
  const popularPostsSlugs = [];
  let blogsRegex = /(?<=\/blogs\/)\w+/i
  // removes /blogs/ from eg "/blogs/garbagecollection" to get just the slug
  // to query on the index page index
  popularPosts.map((posts, index)=>{
    let slug = posts.id.match(blogsRegex);
    popularPosts[index].id = slug[0];
    popularPostsSlugs.push(slug[0])
    console.log(slug);

  })
  console.log(popularPostsSlugs)
  console.log(popularPosts);
  // pass most popular blogs to index.js

  createPage({
    path: "/",
    component: path.resolve(`./src/templates/index.js`),
    context: {
      popularPosts: popularPosts,
      array: popularPostsSlugs,
    },
  })
};

