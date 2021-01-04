import React, { useState } from "react";
import Featured from "../Components/featured";
import "../Components/styles.scss";
import RecentPosts from "../Components/recentPosts";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Metadata from "../Components/metadata";
import MenuListComposition from '../Components/top'
import Footer from "../Components/footer";
import '../Components/homePage.scss'
import { Link } from 'gatsby';
import { MostPopular } from "../Components/MostPopular";
import AboutSection from "../Components/AboutSection";
import AdSense from 'react-adsense';
function Home({ data }) {
 

  return (
    <>
      <Metadata />
      
      
      <div style={{ backgroundColor:'rgb(25, 28, 29)', 'padding': '10px',
    color: '#fff', textAlign: 'center'}}>
      <h1 style={{margin:'auto', fontSize:"50px"}}>Blog</h1>
      
      </div>
      <MenuListComposition background="rgb(25, 28, 29)"/>

      <main>
        <div style={{margin:'auto', maxWidth:'1300px'}}>
         <div className="featured" style={{marginTop:'50px'}}>
          <Featured
            // data={data.allContentfulTeam.edges[state.featuredIndex]}
            allData={data}
            // onPostClick={onPostClick}
          ></Featured>
        </div>
        {/* <RecentPosts data={data.allContentfulTeam.edges} />  */}
        <MostPopular/>
        <AboutSection/>
        <hr/>
            <div className="center"><Link to="/posts">All Posts</Link>
            
            <Link to="/posts">Search</Link>
            <Link to="/posts">About</Link>
            </div>
            <AdSense.Google
              client='ca-pub-1286129126098643'
              slot='7806394673'
              // style={{ display: 'block' }}
              // layout='in-article'
              // format='fluid'
            />
 
        </div>
               
        
      </main>
      <Footer/>
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
            fluid(maxWidth: 1300,quality: 90) {
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
