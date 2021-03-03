import { Button, ButtonGroup, TextField } from "@material-ui/core";
import { Link } from "gatsby";
import React, { Component } from "react";
import CategorySelection from "./categorySelection";
import '../../styles/footer.scss'


class Footer extends Component {

  changeCategory=(category)=>{
    this.props.changeCategory(category)
  }
  
  render() {
    return (

        <footer className="grid" style={{position:'sticky', top:'100%', left:'0', right:'0'}}>
          <hr
            style={{ width: "100%", maxWidth: "1300px", margin: "24px auto 0" }}
          />
          <div
            style={{ margin: "auto", padding: "20px" }}
            className="selection"
          >
            <CategorySelection changeCategory={this.changeCategory}/>
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
            <Link to="/">Home</Link>
            <Link to="/about">About </Link>
            <Link to="/contact">Contact</Link>
            <Link to="/posts">All Articles</Link>
          </div>
        </footer>
    );
  }
}

export default Footer;
