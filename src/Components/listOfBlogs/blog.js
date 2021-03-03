import React from "react";
import Image from "gatsby-image";
import { Link } from "gatsby";

import Grid from "@material-ui/core/Grid";
function Blog({ data, smallestSize, small }) {
  return (
    <Grid
      className="items"
      item
      xs={12}
      sm={small}
      md={5}
      lg={smallestSize}
      key={data.node.post.childMdx.frontmatter.slug}
      style={{
        display: "flex",
        flexFlow: "column",
        padding: "0px",
        margin: "0px 20px 40px",
        // borderLeft: " 1px solid lightgray",
        // borderRight: " 1px solid lightgray",
        // borderBottom: " 1px solid lightgray",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}
    >
      <div id="imageContainer">
        <Link to={`/blogs/${data.node.post.childMdx.frontmatter.slug}`}>
          <div>
            <div>
              <Image
                fluid={data.node.featuredImage.fluid}
                alt={data.node.post.childMdx.frontmatter.title}
                className="image"
                height="300px"
                width="180px"
                // width="100%"
              />
            </div>

            
          </div>
        </Link>
      </div>

      {/* <p style={{ fontSize: "14px", fontFamily: "system-ui", display: '-webkit-box',
    '-webkit-line-clamp': '1',
    '-webkit-box-orient': 'vertical',marginBottom:'10px',marginTop:'5px', overflow:'hidden', padding:'0 20px'}}>
            {data.node.post.childMdx.frontmatter.title}
          </p> */}
      <div className="information">
        <Link to={`/blogs/${data.node.post.childMdx.frontmatter.slug}`}>
          <h2
            style={{
              fontSize: "20px",
              fontFamily: "system-ui",
              display: "-webkit-box",
              "WebkitLineClamp": "2",
              "WebkitBoxOrient": "vertical",
              height: "54px",
              margin: "0",
            }}
          >
            {data.node.post.childMdx.frontmatter.title}
          </h2>
        </Link>

        <div
          style={{
            fontSize: "14px",
            display: "-webkit-box",
            "-webkit-line-clamp": "3",
            "-webkit-box-orient": "vertical",
            overflow: "hidden",
          }}
          dangerouslySetInnerHTML={{
            __html: data.node.post.childMdx.frontmatter.snippet,
          }}
        ></div>
      </div>
      <div style={{ padding: "20px", display: "flex", gap: "20px" }}>
        <time style={{ color: "rgb(42, 48, 57)", fontSize: "14px" }}>
          {data.node.post.childMdx.frontmatter.postedAt}
        </time>
        <hr style={{ marginTop: "0", marginBottom: "0" }} />
        <Link to={`/about`}>Matthew Pudney</Link>
      </div>

      {/* </li> */}
    </Grid>
  );
}

export default Blog;
