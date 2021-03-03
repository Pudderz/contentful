import React from "react";
import Image from "gatsby-image";
import { Link } from "gatsby";

import li from "@material-ui/core/Grid";
function ItemBlog({ data }) {
  console.log(data);
  return (
    <li
      key={data.node.post.childMdx.frontmatter.slug}
      style={{
        display: "flex",
        flexFlow: "column",
        padding: "0px",
        flexGrow: "2",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex" }}>
        <div className="items" style={{ width: "100%" }}>
          {/* <p style={{ padding: "0 20px" }}>{index + 1}</p>   */}
          {/* <hr/> */}
          <Link to={`/blogs/${data.node.post.childMdx.frontmatter.slug}`}>
            <div
              className="information"
              // style={{width:'80%'}}
            >
              <h2
                style={{
                  fontSize: "20px",
                  fontFamily: "system-ui",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                  fontWeight:'600',
                  // height: "54px",
                  margin: "0",
                }}
              >
                {data.node.post.childMdx.frontmatter.title}
              </h2>
              <ul
                style={{
                  padding: "0",
                  display: "flex",
                  gap: "10px",
                  listStyle: "none",
                }}
              >
                {data.node.categories.map((category, index) => (
                  <li
                    key={category}
                    style={{
                      borderRadius: "5px",
                      backgroundColor: "rgba(0,200,0,0.2)",
                      padding: "1px 5px",
                      width: "fit-content",
                      margin: "5px 0 ",
                    }}
                  >
                    {category}
                  </li>
                ))}
              </ul>
              <p>{data.node.post.childMdx.frontmatter.snippet}</p>
              <time style={{ color: "rgb(42, 48, 57)", fontSize: "14px" }}>
                {data.node.post.childMdx.frontmatter.postedAt}
              </time>
            </div>
          </Link>
        </div>
      </div>
      {/* </li> */}
    </li>
  );
}

export default ItemBlog;
