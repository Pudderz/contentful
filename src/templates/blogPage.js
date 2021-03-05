import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import Image from "gatsby-image";
import Footer from "../Components/Common/footer";
import Metadata from "../Components/Common/metadata";
import { MDXRenderer } from "gatsby-plugin-mdx";
import TableOfContents from "../Components/BlogPage/TableOfContent";
import PropTypes from "prop-types";
import "../styles/blogStyles.scss";
import { DiscussionEmbed } from "disqus-react";
import MenuListComposition from "../Components/Common/top";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "../styles/blogPage.scss";
import { Fab, IconButton, Tooltip, Button } from "@material-ui/core";
import AboutSection from "../Components/Common/AboutSection";

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
            onClick={() => toggleDrawer("right", true)}
          >
            <ArrowBackIosIcon
              style={{ fill: "#fff" }}
              aria-label="profile"
              variant="contained"
              aria-haspopup="true"
            />
          </IconButton>
        </Tooltip>
      </MenuListComposition>
      <Metadata />

      <section style={{ marginTop: "20px" }}>
        <div style={{ gridColumn: "6/7" }}>
          <div
            id="blogAboutSection"
            style={{
              margin: "4.2em 20px",
              flexGrow: "2",
              boxSizing: "border-box",
            }}
          >
            <AboutSection />
          </div>

          {post?.childMdx.tableOfContents?.items && (
            <TableOfContents
              items={post.childMdx.tableOfContents.items}
            ></TableOfContents>
          )}
        </div>

        <div className="blogPiece">
          {/* <div className="blogContent"> */}
          <div
            style={{
              zIndex: "2",
              position: "relative",
              width: "60rem",
              margin: "auto",
              maxWidth: "100%",
              boxSizing: "border-box",
            }}
          >
            <h2 style={{ fontSize: "2em", margin: "0" }}>
              {post.childMdx.frontmatter.title}
            </h2>

            <hr style={{ margin: "0" }} />
            <div style={{ display: "flex", gap: "20px" }}>
              <p>by Matthew Pudney</p>
              <p>{post.childMdx.frontmatter.postedAt}</p>
            </div>

            <hr style={{ marginTop: "0" }} />
            <div
              style={{
                position: "relative",
                boxSizing: "border-box",
                margin: "auto",
                width: "100%",
                top: "0",
                bottom: "0",
                left: "0",
                right: "0",
                zIndex: "1",
                opacity: "1",
                maxHeight: "50vh",
                overflow: "hidden",
              }}
            >
              <Image
                fluid={data.contentfulTeam.featuredImage.fluid}
                alt={post.childMdx.frontmatter.title}
                style={{
                  position: "static",
                  width: "100%",
                  height: "100%",
                  margin: "0",
                }}
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
                  onClick={(e) => handleImageOpen(true)}
                >
                  <FullscreenIcon />
                </Fab>
              </Tooltip>
              <Modal
                aria-labelledby="transition-modal-Image"
                aria-describedby={`modal image of ${post.childMdx.frontmatter.title}`}
                open={openImage}
                onClose={handleImageClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Fade in={openImage} onClick={handleImageClose}>
                  {/* <div className="modalImage" style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', outline:'none'}}> */}
                  {/* <h2 id="transition-modal-title" style={{color:'white', textAlign:'center'}}>{post.childMdx.frontmatter.title}</h2> */}
                  <Image
                    loading="lazy"
                    fluid={data.contentfulTeam.featuredImage.fluid}
                    alt={post.childMdx.frontmatter.title}
                    style={{
                      position: "relative",
                      width: "80%",
                      maxHeight: "80%",
                      maxWidth: "90%",
                      margin: "auto",
                    }}
                    className="image"
                  />
                  {/* </div> */}
                </Fade>
              </Modal>
            </div>

            <h3
              style={{
                textAlign: "center",
                fontSize: "min(1em, 6vw)",
                fontFamily: "Karla, sans-serif",
              }}
            >
              {post.childMdx.frontmatter.snippet}
            </h3>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {previous && (
                <Link
                  // className="purple buttonGap"
                  // style={{ color: "black", fontSize: "1.5em" }}
                  to={`/blogs/${previous}`}
                >
                  <Button
                    color="primary"
                    variant="outlined"
                    style={{ borderRadius: "0px" }}
                  >
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
                  <Button
                    color="primary"
                    variant="outlined"
                    style={{ borderRadius: "0px" }}
                  >
                    Next Post
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div style={{ marginTop: "50px" }}>
            <div className="blogContent">
              <MDXRenderer>{post.childMdx.body}</MDXRenderer>
              <DiscussionEmbed {...disqusConfig} />
            </div>
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
