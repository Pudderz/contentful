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
import {DiscussionEmbed} from 'disqus-react';
import MenuListComposition from '../Components/top'
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import { IconButton, Tooltip } from "@material-ui/core";

const markdownTemp = ({ data }) => {
  const post = data.contentfulTeam.post;
  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: `${post.childMdx.frontmatter.title}${post.childMdx.frontmatter.postedAt}`},
  }
  return (
    <React.Fragment>
      <MenuListComposition/>
      {/* <Navigation /> */}
      <Metadata />
      
      <header style={{
"position": "relative",
"background": "#1b1b1b",
    "color": "#fff",
    marginBottom: '1rem',
    fontSize: '2rem'
}}>
     <div style={{"position": "absolute",
    "top": "0",
    "bottom": "0",
    "left": "0",
    "right": "0",
    "zIndex": "1",
    "opacity": "1",
    // "backgroundSize": "cover",
    // "backgroundPosition": "center center",
    // 'backgroundImage': `url(${data.contentfulTeam.featuredImage.fluid})`,
    // 'backdropFilter': 'blur(50px)',
    }}>
        <Image
            fluid={
              data.contentfulTeam.featuredImage.fluid
            }
            alt={post.childMdx.frontmatter.title}
            style={{ position: "relative", width: "100%", height: "100%" }}
            className="image"
          />

    </div>
    <div style={{"textAlign": "center",
    "padding": "2rem",
    "zIndex": "2",
    "position": "relative",
    "fontSize": "2rem",
    "width": "60rem",
    "margin": "auto",
    "maxWidth": "80%"}}>
        <h2>{post.childMdx.frontmatter.title}</h2>
        <h3 style={{'fontSize': 'min(1em, 7vw)'}}>Advice on user experience,conversion optimisation and digital leadership from Paul Boag</h3>
        <h4>{post.childMdx.frontmatter.postedAt}</h4>
        <button className="purple buttonGap">Blog</button>
        <button className="purple buttonGap">GitHub</button>
        <button className="purple buttonGap">Portfolio</button>
        
    </div>
    
    <Tooltip title="Fullscreen Image">
          <IconButton style={{position: 'absolute', bottom: '0', right:'0',zIndex: '2'}}>
        <FullscreenIcon/>
        </IconButton>
        </Tooltip>
        
</header>
{/* <div className="container" style={{maxHeight: '100px'}}> */}

  {/* <div className="featuredText">
<h1>{post.childMdx.frontmatter.title}</h1>
          <p></p>
         </div> */}
{/* </div> */}
<div style={{backgroundColor: '#1b1b1b', color: '#fff', width: '100%'}}>
      <p>Time to read</p>

    </div>
<section>
        {post?.childMdx.tableOfContents?.items && (
          <TableOfContents items={post.childMdx.tableOfContents.items} />
        )}
         
        <div className="blogPiece">
         
          <div className="blogContent">
            <MDXRenderer>{post.childMdx.body}</MDXRenderer>
            <DiscussionEmbed {...disqusConfig} />
          </div>
          <details>
            <summary>Next and Prev</summary>
            <ol>
            <div>Prev -</div>
          <div>Next -</div>
          </ol>
          </details>
          
          
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
        fluid(maxWidth: 1200) {
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
