import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import Footer from "../Components/Common/footer";
import Blog from "../Components/listOfBlogs/blog";
import Pager from "../Components/listOfBlogs/pager";
import GoToTopBot from "../Components/Common/goToTopBot";
import Metadata from "../Components/Common/metadata";
import Grid from "@material-ui/core/Grid";
import MenuListComposition from "../Components/Common/top";
import CategorySelection from "../Components/Common/categorySelection";
import { Breadcrumbs, Typography } from "@material-ui/core";
import PopularBlog from "../Components/FrontPage/PopularBlog";
import ItemBlog from "../Components/listOfBlogs/ItemBlog";

const listOfAllPosts = ({ data, pageContext }) => {
  const articles = data.allContentfulTeam.edges;
  return (
    <>
      <Metadata />
      <MenuListComposition />
      {/* <h3 style={{ margin: "50px auto 25px auto", textAlign: "center" }}>
        All Articles
      </h3> */}
      {/* <div
        style={{ width: "100%", height: "200px", backgroundColor: "#31393A" }}
      ></div> */}
      {/* <Pager pageContext={pageContext} /> */}

      <div className="columnContainer" style={{ width: "100%" }}>
        <div
          className="columns"
          style={{ display: "flex", alignItems: "stretch", width:'100%', justifyContent:'space-between', }}
        >
          <div className="postContainer" style={{margin:'auto', flexGrow:'1'}}>
            <Grid
              container
              spacing={2}
              className="allPosts"
              style={{ margin: "auto", maxWidth: "min(1080px, 100%)" }}
            >
              <Grid xs={12} item>
                <div
                  style={{
                    width: "100%",
                    padding: "20px 8px",
                    boxSizing: "border-box",
                  }}
                >
                  <Breadcrumbs aria-label="breadcrumb" className="breadcrumb">
                    <Link color="inherit" to="/posts">
                      All Articles
                    </Link>
                  </Breadcrumbs>
                </div>
              </Grid>
              <ol className="listOfPosts">
                
               {articles.map((article, index) => (
                <ItemBlog data={article} ></ItemBlog>
                // <Blog key={index} data={article} smallestSize={4} small={5} />
              ))} 
              </ol>
              
            </Grid>
          </div>
          <div
            className="filterOptions"
            style={{
              background: "#F5F7F7",
              padding: "20px",
              boxSizing: "border-box",
              flexBasis: "20%",
            }}
          >
            <h3 style={{ fontSize: "1.5em" }}>Categories</h3>
            <hr />
            <div style={{ maxWidth: "500px" }}>
              <CategorySelection />
            </div>
            <hr />
            <h3 style={{ fontSize: "1.5em" }}>Popular Posts</h3>

            <hr />
            <ul
              container
              spacing={2}
              className="allPosts"
              style={{
                margin: "auto",
                maxWidth: "min(1080px, 100%)",
                padding: "0",
                gap: "20px",
                display: "grid",
              }}
            >

              {articles.map((data, index) => (
                <li
                  key={data.node.post.childMdx.frontmatter.slug}
                  style={{
                    display: "flex",
                    flexFlow: "column",
                    padding: "0px",
                    justifyContent: "space-between",
                    boxSizing: "border-box",
                  }}
                >
                  <div style={{ display: "flex" }} className="popListItems ">
                    <div style={{ width: "100%" }}>
                      <Link
                        to={`/blogs/${data.node.post.childMdx.frontmatter.slug}`}
                      >
                        <div
                          style={{
                            // padding: "0px 20px 20px 20px",
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "10px",
                          }}
                        >
                          <h2
                            style={{
                              fontSize: "15px",
                              fontFamily: "system-ui",
                              display: "-webkit-box",
                              WebkitLineClamp: "2",
                              WebkitBoxOrient: "vertical",
                              margin: "0",
                            }}
                          >
                            {data.node.post.childMdx.frontmatter.title}
                          </h2>

                          <time
                            style={{
                              color: "rgb(42, 48, 57)",
                              fontSize: "14px",
                              alignSelf: "center",
                            }}
                          >
                            {data.node.post.childMdx.frontmatter.postedAt}
                          </time>
                        </div>
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Pager pageContext={pageContext} />
      </div>

      <GoToTopBot />
      <Footer />
    </>
  );
};

listOfAllPosts.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

export const query = graphql`
  query($limit: Int!, $skip: Int!) {
    allContentfulTeam(
      limit: $limit
      skip: $skip
      sort: { fields: [post___childMdx___frontmatter___Date], order: DESC }
    ) {
      edges {
        node {
          categories
          featuredImage {
            fluid(maxWidth: 800) {
              ...GatsbyContentfulFluid
            }
          }
          post {
            childMdx {
              frontmatter {
                slug
                snippet
                title
                postedAt
              }
            }
          }
        }
      }
    }
  }
`;

export default listOfAllPosts;
