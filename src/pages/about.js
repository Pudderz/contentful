import React, { Component } from "react";
import Footer from "../Components/footer";
import Metadata from "../Components/metadata";
import "../Components/about.scss";
import MenuListComposition from "../Components/top";
import { Link } from "gatsby";
class about extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <MenuListComposition/>
        <Metadata />
        <div
          id="aboutSite"
          style={{
            textAlign: "center",
            display: "block",
            justifyContent: "space-around",
            minHeight: "60vh",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2>About Me</h2>
            <p>
              This is a Gatsby Blog Template site that takes data from a mdx
              files using graphql and displays the content in a blog format
            </p>
          </div>
          <div>
            <h2>About Blog</h2>
            <p>
              This is a Gatsby Blog Template site that takes data from a mdx
              files using graphql and displays the content in a blog format
            </p>
          </div>
          <div>
            <h2>Contact Me</h2>
            <p>
              <Link to="/contact">Contact</Link>
            </p>
          </div>
          
        </div>
        <Footer />
      </div>
    );
  }
}

export default about;
