import React from "react";
import { graphql } from "gatsby";
import Image from "gatsby-image";
import Navigation from "../Components/navigation";
import Footer from "../Components/footer";
import Metadata from "../Components/metadata";
import { MDXRenderer } from "gatsby-plugin-mdx";
import TableOfContents from "../Components/TableOfContent";
import PropTypes from "prop-types";
import '../Components/blogStyles.scss'

const markdownTemp = ({ data }) => {
  const post = data.contentfulTeam.post;

  return (
    <React.Fragment>
      <Navigation />
      <Metadata />
      <section>
        {post?.childMdx.tableOfContents?.items && (
          <TableOfContents items={post.childMdx.tableOfContents.items} />
        )}
        <div className="blogPiece">
          <Image
            fluid={
              data.contentfulTeam.featuredImage.fluid
            }
            alt={post.childMdx.frontmatter.title}
            style={{ position: "relative", margin: "auto", maxHeight: "60vh" }}
            className="image"
          />
          <h1>{post.childMdx.frontmatter.title}</h1>
          <p>{post.childMdx.frontmatter.postedAt}</p>
          <div className="blogContent">
            <MDXRenderer>{post.childMdx.body}</MDXRenderer>
          </div>
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
};
markdownTemp.propTypes = {
  data: PropTypes.object.isRequired,
};


export const postQuery = graphql`
  query BlogPostByPath($slug: String!) {
    contentfulTeam(slug: { eq: $slug }) {
      featuredImage {
        fluid(maxWidth: 800) {
          ...GatsbyContentfulFluid
        }
      }
      post {
        childMdx {
          tableOfContents
          frontmatter {
            title
            postedAt
          }
          body
        }
      }
    }
  }
`;


export default markdownTemp;
