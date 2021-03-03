import React from "react";
import { Link } from "gatsby";
import { Grid } from "@material-ui/core";
import Blog from "./blog";
import { Breadcrumbs, Typography } from "@material-ui/core";
import PopularBlog from "./PopularBlog";
export const RecentPosts = (props) => {
  const articles = props.data;
  return (
    <div
      className="popularPosts"
      style={{
        minWidth: "min(300px,33%)",
        boxSizing: "border-box",
        minWidth: "300px",
        maxWidth: "1000px",
        margin: "0 auto",
        flexGrow:"2",
      }}
    >
      <h3 style={{ fontSize: "1.5em", color: "#4a5568" }}>Recent Posts</h3>

      <ul
        style={{
          gap: "20px",
          display: "grid",
          padding: "0 10px",
          boxSizing: "border-box",
        }}
      >
        {articles.map((article, index) => (
          <PopularBlog
            key={index}
            data={article}
            smallestSize={6}
            small={6}
            index={index}
          />
        ))}
        <li
          style={{
            display: "flex",
            flexFlow: "column",
            padding: "0px",

            justifyContent: "space-between",
            boxSizing: "border-box",
          }}
        >
          <Link to="/posts">View More...</Link>
        </li>
      </ul>
    </div>
  );
};

export default RecentPosts;
