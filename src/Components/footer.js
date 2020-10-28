import { Button, ButtonGroup, TextField } from "@material-ui/core";
import { Link } from "gatsby";
import React, { Component } from "react";
import CategorySelection from "./categorySelection";

class Footer extends Component {
  render() {
    return (
      <div className="colorPurple">
        <footer className="grid">
          <div
            style={{
              maxWidth: "1300px",
              margin: "auto",
              backgroundColor: "#fcbc3e",
              padding: "30px",
              color: "black",
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <h2 style={{ margin: "auto", textAlign: "center" }}>
              Subscribe to the mailing list
            </h2>
            <ButtonGroup style={{ height: "fit-content", minWidth: "40%" }}>
              <TextField
                id="outlined-basic"
                label="email"
                variant="outlined"
                style={{
                  backgroundColor: "white",
                  borderRadius: "0",
                  width: "60%",
                }}
              />
              <Button
                style={{
                  color: "white",
                  backgroundColor: "#191c1d",
                  borderRadius: "0",
                }}
              >
                SubScribe
              </Button>
            </ButtonGroup>
          </div>
          <hr
            style={{ width: "100%", maxWidth: "1300px", margin: "24px auto 0" }}
          />
          <div
            style={{ margin: "auto", padding: "20px" }}
            className="selection"
          >
            <CategorySelection />
          </div>
          <hr style={{ width: "100%", maxWidth: "1300px", margin: "auto" }} />
          <div
            className="flexFooter"
            style={{
              width: "100%",
              maxWidth: "1300px",
              margin: "auto",
              padding: "10px",
              flexWrap: 'wrap',
            }}
          >
            <Link to="/about">About us</Link>
            <Link to="/">Contact</Link>
            <Link to="/">All Articles</Link>
            <Link to="/">Privacy policy</Link>
            <Link to="/">Cookies</Link>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
