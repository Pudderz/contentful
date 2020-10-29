import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Footer from "../Components/footer";
import Blog from "../Components/blog";
import Pager from "../Components/pager";
import GoToTopBot from "../Components/goToTopBot";
import Metadata from "../Components/metadata";
import Grid from '@material-ui/core/Grid';
import MenuListComposition from '../Components/top'
const BlogPost = ({ data, pageContext }) => {
  const articles = data.allContentfulTeam.edges;
  return (
    <div>
      <Metadata />
      <MenuListComposition/>
      <h3 style={{ margin: "50px auto 25px auto", textAlign: "center" }}>All Articles</h3>
      <Pager pageContext={pageContext} />
      <div>
        <Grid container spacing={2} className="allPosts" style={{margin:'auto'}}> 

          {articles.map((article, index) => (
            <Blog key={index} data={article}  smallestSize={4} small={6}/>
          ))}
        </Grid>
      </div>
      <Pager pageContext={pageContext} />
      <GoToTopBot />
      <Footer />
    </div>
  );
};

BlogPost.propTypes = {
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

export default BlogPost;
