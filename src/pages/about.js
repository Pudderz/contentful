import React, { Component } from "react";
import Footer from "../Components/footer";
import Metadata from "../Components/metadata";
import "../Components/about.scss";
import MenuListComposition from "../Components/top";

class about extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <MenuListComposition />
        <Metadata />
        <div
          id="aboutSite"
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "space-around",
            minHeight: '60vh',
            flexWrap:'wrap',
          }}
        >
          <div>
            <h2>About Site</h2>
            <p>
              This is a Gatsby Blog Template site that takes data from a mdx
              files using graphql and displays the content in a blog format
            </p>
          </div>

          <div id="formDiv" style={{
                //   height: '100%',
                  boxSizing: 'border-box',
                  backgroundolor: '#242a2c',
          }}>
            <form className="contactForm"  netlify="true">
              <h3>Contact Form</h3>
              <label htmlFor="name">
                Name:
                <input id="name" type="text" placeholder="name" />
              </label>
              <label htmlFor="email">
                Email:
                <input id="email" type="email" placeholder="email" />
              </label>
              <div
                style={{
                  position: "relative",
                  width: "fit-content",
                  margin: "5px auto 0px",
                }}
              >
                <label
                  htmlFor="message"
                  style={{
                    margin: "0px",
                    position: "absolute",
                    top: "0%",
                    left: "23px",
                  }}
                >
                  Message:
                </label>
                <textarea
                  id="message"
                  placeholder="message"
                  style={{
                    margin: "0px 0px 0px 119px",
                    height: "134px",
                    width: "224px",
                    resize: "vertical",
                    minHeight: "45px",
                  }}
                />
              </div>

              <button className="purple" type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default about;
