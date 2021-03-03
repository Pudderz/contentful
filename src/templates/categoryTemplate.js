import React from "react";
import PropTypes from "prop-types";
import { graphql, Link } from "gatsby";
import Footer from "../Components/Common/footer";
import Blog from "../Components/blog";
import Pager from "../Components/pager";
import GoToTopBot from "../Components/Common/goToTopBot";
import Metadata from "../Components/Common/metadata";
import Grid from "@material-ui/core/Grid";
import MenuListComposition from "../Components/Common/top";
import CategorySelection from "../Components/Common/categorySelection";
import { Breadcrumbs, Typography } from "@material-ui/core";


const CategoryTemplate = (props) => {
  const { data, pageContext } = props;
console.log(pageContext.category);
  const articles = data.allContentfulTeam.edges;
  return (
    <>
      <Metadata />
      <MenuListComposition />

      <div className="columnContainer" style={{ width: "100%" }}>
        <div
          className="columns"
          style={{ display: "flex", alignItems: "stretch" }}
        >
          <div style={{ maxWidth: "80%" }}>
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
                    <p>
                      {pageContext.category}
                    </p>
                  </Breadcrumbs>
                </div>
              </Grid>
              {articles.map((article, index) => (
                <Blog key={index} data={article} smallestSize={4} small={5} />
              ))}
            </Grid>
          </div>
          <div
            style={{
              background: "#F5F7F7",
              padding: "20px",
              boxSizing: "border-box",
              flexBasis: "20%",
            }}
          >
            <p>Categories</p>
            <hr />
            <div style={{ maxWidth: "500px" }}>
              <CategorySelection />
            </div>
            <hr />

            <p>Popular Posts</p>
            <hr />
            <Grid
              container
              spacing={2}
              className="allPosts"
              style={{ margin: "auto", maxWidth: "min(1080px, 100%)" }}
            >
              <Grid xs={12} item>
              </Grid>
              {articles.map((data, index) => (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  key={data.node.post.childMdx.frontmatter.slug}
                  style={{
                    display: "flex",
                    flexFlow: "column",
                    padding: "0px",
                    justifyContent: "space-between",
                    boxSizing: "border-box",
                  }}
                >
                  <div style={{ display: "flex" }} className="items"> 
                    <p style={{ padding: "0 20px", margin:'20px 0' }}>{index + 1}</p>

                    <div  style={{ width: "100%" }}>
                      <Link
                        to={`/blogs/${data.node.post.childMdx.frontmatter.slug}`}
                      >
                        <div className="information">
                          <h2
                            style={{
                              fontSize: "15px",
                              fontFamily: "system-ui",
                              display: "-webkit-box",
                              WebkitLineClamp: "2",
                              WebkitBoxOrient: "vertical",
                              height: "30px",
                              margin: "10px 0 0 0",
                            }}
                          >
                            {data.node.post.childMdx.frontmatter.title}
                          </h2>
                         
                        </div>
                        <div
                          style={{
                            padding: "0px 20px 20px 20px",
                            display: "flex",
                            gap: "20px",
                          }}
                        >
                          <time
                            style={{
                              color: "rgb(42, 48, 57)",
                              fontSize: "14px",
                            }}
                          >
                            {data.node.post.childMdx.frontmatter.postedAt}
                          </time>
                          <hr style={{ marginTop: "0", marginBottom: "0" }} />
                          <Link to={`/about`}>Matthew Pudney</Link>
                        </div>
                      </Link>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>

          </div>
        </div>
        <Pager pageContext={pageContext} />
      </div>

      <GoToTopBot />
      <Footer />
    </>
  );
};

CategoryTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
};

export const query = graphql`
  query($limit: Int!, $skip: Int!, $category: [String]) {
    allContentfulTeam(
      limit: $limit
      skip: $skip
      sort: { fields: [post___childMdx___frontmatter___Date], order: DESC }
      filter: {categories: {in:$category}}
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

export default CategoryTemplate;
