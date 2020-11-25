import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import Image from "gatsby-image";
import Footer from "../Components/footer";
import Metadata from "../Components/metadata";
import { MDXRenderer } from "gatsby-plugin-mdx";
import TableOfContents from "../Components/TableOfContent";
import PropTypes from "prop-types";
import "../Components/blogStyles.scss";
import { DiscussionEmbed } from "disqus-react";
import MenuListComposition from "../Components/top";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import SettingsIcon from "@material-ui/icons/Settings";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import '../Components/blogPage.scss';
import {
  Fab,
  IconButton,
  Tooltip,
  Button,
  Drawer,
  ButtonBase,
} from "@material-ui/core";

const MarkdownTemp = ({ data, pageContext }) => {
  const post = data.contentfulTeam.post;
  const { next, previous } = pageContext;
  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: {
      identifier: `${post.childMdx.frontmatter.title}${post.childMdx.frontmatter.postedAt}`,
    },
  };
  const [state, setState] = useState({ right: false });
  const toggleDrawer = (anchor, toShow) => {
    setState({ ...state, [anchor]: toShow });
  };



  const [openImage, setImageOpen] = useState(false);

  const handleImageOpen = () => {
    setImageOpen(true);
  };

  const handleImageClose = () => {
    setImageOpen(false);
  };
  return (
    <React.Fragment>
      <MenuListComposition>
          <Tooltip title="Menu">
            <IconButton
            id="blogMenuOpen"
              aria-label="profile"
              variant="contained"
              onClick={()=>toggleDrawer('right', true)}
            >
              <ArrowBackIosIcon
                style={{ fill: "#fff" }}
                aria-label="profile"
                variant="contained"
                // ref={anchorRef}
                // aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
              />
            </IconButton>
          </Tooltip>
        </MenuListComposition>
      <Metadata />

      <header
        style={{
          position: "relative",
          background: "#1b1b1b",
          color: "#fff",
          marginBottom: "1rem",
          fontSize: "2rem",
        }}
      >
        
        

        
      </header>
      <div
          style={{
            // textAlign: "center",
            padding: "2rem",
            zIndex: "2",
            position: "relative",
            // fontSize: "2rem",
            width: "60rem",
            margin: "auto",
            maxWidth: '100%',
    boxSizing: 'border-box',
          }}
        >

<h2 style={{fontSize: '2em',
    margin: '0'}}>{post.childMdx.frontmatter.title}</h2>

          <hr style={{margin:'0'}}/>
          <div style={{display:'flex',gap:'20px'}}>
            <p>by Matthew Pudney</p>
          <p>{post.childMdx.frontmatter.postedAt}</p>  
          
          </div>
          
          <hr style={{marginTop:'0'}}/>
      <div
          style={{
            position: "relative",
            // maxWidth:'800px',
            // padding:'20px',
            boxSizing:'border-box',

            margin:'auto',
            width:'100%',
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            zIndex: "1",
            opacity: "1",
            maxHeight:'50vh',
            overflow: 'hidden',
            // "backgroundSize": "cover",
            // "backgroundPosition": "center center",
            // 'backgroundImage': `url(${data.contentfulTeam.featuredImage.fluid})`,
            // 'backdropFilter': 'blur(50px)',
          }}
        >
          <Image
            fluid={data.contentfulTeam.featuredImage.fluid}
            alt={post.childMdx.frontmatter.title}
            style={{position: 'static', width: "100%", height: "100%" }}
            className="image"
          />
          <Tooltip title="Fullscreen Image">
          <Fab
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              zIndex: "2",
            }}
            aria-label="fullscreen"
            size="small"
            onClick={e=> handleImageOpen(true)}
          >
            <FullscreenIcon />
          </Fab>
          {/* <IconButton
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
              zIndex: "2",
            }}
          >
            <FullscreenIcon /> */}
          {/* </IconButton> */}
        </Tooltip>
        <Modal
        aria-labelledby="transition-modal-Image"
        aria-describedby="transition-modal-description"
        open={openImage}
        onClose={handleImageClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >

        
        <Fade in={openImage} onClick={handleImageClose}>
          {/* <div className="modalImage" style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', outline:'none'}}> */}
            {/* <h2 id="transition-modal-title" style={{color:'white', textAlign:'center'}}>{post.childMdx.frontmatter.title}</h2> */}
            <Image
            loading="lazy"
            fluid={data.contentfulTeam.featuredImage.fluid}
            alt={post.childMdx.frontmatter.title}
            style={{ position: "relative", width: "100%", height: "100%"}}
            className="image"
          />
          {/* </div> */}
        </Fade>
      </Modal>
        </div>

        
          
        <h3

            style={{
              textAlign:'center',
              fontSize: "min(1em, 6vw)",
              fontFamily: "Karla, sans-serif",
            }}
          >
            {post.childMdx.frontmatter.snippet}
          </h3>
<div style={{
  display:'flex',
  justifyContent:'space-between'

}}>
{previous && (

          <Link
          // className="purple buttonGap"
          // style={{ color: "black", fontSize: "1.5em" }}
          to={`/blogs/${previous}`}
        >
        <Button color="primary" variant="outlined" style={{borderRadius:'0px'}}>

        
          Previous Post
        </Button>  
        </Link>
        
        
      )}
      {next && (
       
        <Link
          // className="purple buttonGap"
          // style={{ color: "black", fontSize: "1.5em" }}
          to={`/blogs/${next}`}
        >
<Button color="primary" variant="outlined" style={{borderRadius:'0px'}}>
          Next Post
        </Button>
        </Link>
        
      )}
</div>
          

          {/* <button className="purple buttonGap">Blog</button>
          <button className="purple buttonGap">GitHub</button>
          <button className="purple buttonGap">Portfolio</button> */}
        </div>

       


      <Drawer
        anchor="right"
        open={state[`right`]}
        onClose={() => toggleDrawer(`right`, false)}
        className="draw"
        // onOpen={(e) => toggleDrawer(`right`, true)}
      >
        <Tooltip title="Close Menu">
            <IconButton
              aria-label="Close menu"
              variant="contained"
              onClick={()=>toggleDrawer('right', false)}
              style={{
                  width: 'fit-content',
                  position:'absolute',
                  right:'0'
                }}
            >
              <ArrowForwardIosIcon
                style={{ fill: "#000" }}
                aria-label="close menu"
                variant="contained"
                aria-haspopup="true"
              />
            </IconButton>
          </Tooltip>
        {/* <div className="examples" style={{ width: "250px" }}>
          <summary>Table of Contents</summary>
          <ol className="example">{renderItems(post.childMdx.tableOfContents.items, activeId)}</ol>
        </div> */}
        {post?.childMdx.tableOfContents?.items && (
          <TableOfContents
            items={post.childMdx.tableOfContents.items}
          ></TableOfContents>
         
        )}
          
          <div className="overlay" style={{display:'grid', justifyContent:'center', textAlign:'center', fontSize:'2em', gridTemplateRows: 'repeat(auto-fill, 40px)'}}>
          <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/search">Search</Link>
        <Link to="/about">About</Link>
        <Button to="https://github.com/Pudderz">Github</Button>
      </div>
      {next && (
            <Link
               className="purple buttonGap"
               style={{ color: "black", border:'2px solid black', fontSize: "1.5em",textAlign:'center',margin: '4px 20px' }}
              to={`/blogs/${next}`}
            >
              Next Post
            </Link>
          )} 
          {previous && (
            <Link
               className="purple buttonGap"
              style={{ color: "black", border:'2px solid black', fontSize: "1.5em" ,textAlign:'center',margin: '4px 20px'}}
              // style={{ color: "black", fontSize: "1.5em" }}
              to={`/blogs/${previous}`}
            >
              Previous Post
            </Link>
          )}
      </Drawer>
      <section style={{marginTop:'0px'}}>
        {post?.childMdx.tableOfContents?.items && (
          <TableOfContents items={post.childMdx.tableOfContents.items}>
          </TableOfContents>
        )}

        <div className="blogPiece">
          <div className="blogContent">
            <MDXRenderer>{post.childMdx.body}</MDXRenderer>
            <DiscussionEmbed {...disqusConfig} />
          </div>
        </div>
      </section>

      <Footer />
    </React.Fragment>
  );
};
MarkdownTemp.propTypes = {
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
            snippet
          }
          timeToRead
          body
        }
      }
    }
  }
`;

export default MarkdownTemp;
