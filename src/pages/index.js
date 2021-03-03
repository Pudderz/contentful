import React, { useState } from "react";
import "../Components/styles.scss";
import RecentPosts from "../Components/recentPosts";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Metadata from "../Components/metadata";
import MenuListComposition from "../Components/top";
import Footer from "../Components/footer";
import "../styles/homePage.scss";
import AboutSection from "../Components/AboutSection";
import AdSense from "react-adsense";
import { PopularPosts } from "../Components/PopularPosts";
import {Featured } from '../Components/featured'
function Home({ data }) {
  return (
    <>
      <Metadata />

      <MenuListComposition background="rgb(25, 28, 29)" />

      <main>
        <div style={{ margin: "auto", maxWidth: "1300px" }}>
          <div className="featured" style={{ marginTop: "50px" }}>
            {/* <Featured
            // data={data.allContentfulTeam.edges[state.featuredIndex]}
            allData={data}
            // onPostClick={onPostClick}
          ></Featured>
           */}
          
          </div>
          <div
          className="frontPageContainer"
          
          >
            <RecentPosts data={data.allContentfulTeam.edges} />
            <PopularPosts data={data.allContentfulTeam.edges} />

            <div
            className="clampContainer"
            >
              <AboutSection />
            </div>
          </div>

          {/* <AdSense.Google
              client='ca-pub-1286129126098643'
              // slot='7806394673'
              // style={{ display: 'block' }}
              // layout='in-article'
              // format='fluid'
            /> */}
        </div>
      </main>
      <Footer />
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
          categories
          featuredImage {
            fluid(maxWidth: 1300, quality: 90) {
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
