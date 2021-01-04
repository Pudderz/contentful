import React from "react";
import Footer from "../Components/footer";
import Metadata from "../Components/metadata";
import "../Components/about.scss";
import MenuListComposition from "../Components/top";
import { Link } from "gatsby"
import { Fab, makeStyles, Tooltip } from "@material-ui/core";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import ContactForm from "../Components/ContactForm";

const useStyles = makeStyles({
  contactInfo: {
    display: "flex",
    padding: 0,
  },
  contact: {
    width: "50%",
    padding: "20px",
    boxSizing: "border-box",
    "& button": {
      margin: "20px 0",
    },
  },
  section:{
    backgroundColor: '#191c1d',
    color: 'white',
    overflow: 'hidden',
    '& h2,h3,h4':{
      margin:'0',
    }
  },
  header:{
    display:'flex',
    gap:'1em',
    justifyContent:'center',
    padding:'0',
    margin:'20px 0',
    '& h2':{
      fontSize:'3em',
      margin:'0',
    }
  }
});

export const Contact = () => {
  const classes=useStyles();
    return (
        <div style={{ textAlign: "center" }}>
        <MenuListComposition/>
        <Metadata />
        <div
          id="aboutSite"
          style={{
            textAlign: "center",
            display: "block",
            minHeight: "100vh",
            flexWrap: "wrap",
          }}
        >
       
          <div
        style={{ minHeight: "100vh", backgroundColor: "#191c1d" }}
      >
        <div
          className="top"
          style={{
            zIndex: "400",
            justifyContent: "flex-end",
            width: "90%",
            margin: "7px auto 0",
          }}
        >
     

          <Link to="/">
            <Tooltip title="Home">
              <a
                style={{
                  color: "white",
                  pointerEvents: "all",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Home
              </a>
            </Tooltip>
          </Link>
        </div>

        <div className={classes.section}>
          <div>
            <div className="textContainer" style={{ marginTop: "20px" }}>
              <header id="flexHeader">
                <h2>Hey, I'm Matthew</h2>

                <div
                  style={{
                    display: "flex",
                    gap: "1em",
                    justifyContent: "center",
                  }}
                >
                  <Tooltip title="LinkedIn profile">
                    <a
                      href="https://www.linkedin.com/in/matthew-pudney/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Fab size="small">
                        <LinkedInIcon />
                      </Fab>
                    </a>
                  </Tooltip>
                  <Tooltip title="Github profile">
                    <a
                      href="https://github.com/Pudderz"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Fab size="small">
                        <GitHubIcon />
                      </Fab>
                    </a>
                  </Tooltip>
                  
                </div>
              </header>

              <p style={{ textAlign: "center" }}>
                I'm a front-end web developer based in UK, looking for a
                full-time role.
              </p>
            </div>
            <div className="textContainer" style={{ margin: "0 auto" }}>
              <div>
                <h2>About Me</h2>
                <hr />
                <div></div>
                <p>
                  I love learning the massive scope of computer science which I
                  find incredibly rewarding and exciting as there's always
                  something more you can learn and improve on.
                </p>
                <div style={{ padding: "10px" }}></div>
                <p>
                  I'm currently looking for an opportunity to work on a
                  JavaScript framework and hope to learn and move to a
                  full-stack position in the future.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.section}>
          <div
            className={`textContainer ${classes.contactInfo}`}
            id="contactInfo"
            style={{ margin: "0 auto" }}
          >
            <div id="contact"
            className={classes.contact}
            >
              <h2>Get in touch</h2>

              <hr />
              <p>
                Thank you for checking out my portfolio and if you'd like to
                learn more about what makes me tick or if you have knowledge of
                any exciting opportunities feel free to reach out.
              </p>
              <p>To get in touch, contact via my email: mpudney2@gmail.com</p>
              <p>Or by this contact form:</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
        </div>
        <Footer />
      </div>
    )
}

export default Contact