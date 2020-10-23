import React, { useState } from "react";
import Navigation from "../Components/navigation";
import Featured from "../Components/featured";
import "../Components/styles.scss";
import RecentPosts from "../Components/recentPosts";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Metadata from "../Components/metadata";

function Home({ data }) {
  const [state, setstate] = useState({
    featuredIndex: 0,
  });
  const onPostClick = (e) => {
    setstate({
      featuredIndex: e,
    });
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Metadata />
      <Navigation />
      <main>
        <div className="featured">
          <Featured data={data.allContentfulTeam.edges[state.featuredIndex]}></Featured>
        </div>
        <RecentPosts data={data} onPostClick={onPostClick} />
      </main>
    </>
  );
}
Home.propTypes = {
  data: PropTypes.object.isRequired,
};


export const query = graphql`
  query {
    allContentfulTeam(
      limit: 4
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
                title
                snippet
                postedAt
              }
            }
          }
        }
      }
    }
  }
`;

export default Home;
