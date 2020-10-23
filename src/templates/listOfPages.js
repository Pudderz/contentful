import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Footer from "../Components/footer";
import Blog from "../Components/blog";
import Pager from "../Components/pager";
import Navigation from "../Components/navigation";
import GoToTopBot from "../Components/goToTopBot";
import Metadata from "../Components/metadata";

const BlogPost = ({ data, pageContext }) => {
  const articles = data.allContentfulTeam.edges;
  return (
    <div>
      <Metadata />
      <Navigation />
      <h3 style={{ margin: "auto", textAlign: "center" }}>Posts</h3>
      <Pager pageContext={pageContext} />
      <div>
        <ul className="allPosts">
          {articles.map((article, index) => (
            <Blog key={index} data={article} />
          ))}
        </ul>
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
