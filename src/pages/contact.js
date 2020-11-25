import React, { Component } from "react";
import Footer from "../Components/footer";
import Metadata from "../Components/metadata";
import "../Components/about.scss";
import MenuListComposition from "../Components/top";

export const contact = () => {
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
            id="formDiv"
            style={{
              //   height: '100%',
              boxSizing: "border-box",
              backgroundolor: "#242a2c",
            }}
          >
            <form className="contactForm" netlify>
              <h3>Contact Form</h3>
              <label htmlFor="name">
                Name:
                <input id="name" name="contact-name"type="text" placeholder="name" required/>
              </label>
              <label htmlFor="email">
                Email:
                <input id="email" name="contact-email"type="email" placeholder="email" required/>
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
                  id="messageLabel"
                  style={{
                    margin: "0px",
                    top: "0%",
                    left: "23px",
                  }}
                >
                  Message:
                </label>
                <textarea id="message" name="contact-message" placeholder="message" style={{}} required/>
              </div>

              <button className="purple" type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    )
}

export default contact