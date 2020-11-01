import React, { useState } from "react";
import { Link, navigate } from "gatsby";
import Image from "gatsby-image";

const Featured = (props) => {
  const { allData } = props;
  const [state, setstate] = useState({
    featuredIndex: 0,
  });
  const [active, setActive] = useState({
    0: "active",
  });

  //  const data = allData[state.featuredIndex]
  const onChange = (e) => {
    setstate({
      featuredIndex: e.currentTarget.getAttribute("data-key"),
    });
    setActive({
      [e.currentTarget.getAttribute("data-key")]: "active",
    });
  };
  // const onChange=(e)=>{
  //     props.onPostClick();
  // }
  return (
    <div className="featuredContainer">
      <div
      // className="featuredImage"
      >
        {/* <div
          style={{
            height: "100%",
            width: "100%",
          }}
        > */}
          {/* <a
            to={`/blogs/${
              allData.allContentfulTeam.edges[state.featuredIndex].node.post
                .childMdx.frontmatter.slug
            }`}
          > */}
          {allData.allContentfulTeam.edges.map((data, index) => (
            <Image
              key={index}
              style={{
                height: "100%",
              }}
              fluid={data.node.featuredImage.fluid}
              alt={data.node.post.childMdx.frontmatter.title}
              className={`image featuredImages ${active[index]} active${index}`}
              height="300px"
            />
          ))}
          {/* <Image
                style={{
                    height:'100%',
                }}
                fluid={allData.allContentfulTeam.edges[state.featuredIndex].node.featuredImage.fluid}
                alt={allData.allContentfulTeam.edges[state.featuredIndex].node.post.childMdx.frontmatter.title}
                className={`image ${active[allData.allContentfulTeam.edges[state.featuredIndex].node.post.childMdx.frontmatter.title]}`}
                height="300px"
                />     */}
          {/* </a> */}
        {/* </div> */}
      </div>
      <div id="textContainer">
        <div className="featuredText">
          <div>
            <a
              style={{ width: "fit-content" }}
              onClick={() =>
                navigate("/search", {
                  state: {
                    category:
                      allData.allContentfulTeam.edges[state.featuredIndex].node
                        .categories[0],
                  },
                })
              }
              className="category"
            >
              {
                allData.allContentfulTeam.edges[state.featuredIndex].node
                  .categories[0]
              }
            </a>
            <Link
              to={`/blogs/${
                allData.allContentfulTeam.edges[state.featuredIndex].node.post
                  .childMdx.frontmatter.slug
              }`}
            >
              <h2 id="featuredTitle" className="underline">
                {
                  allData.allContentfulTeam.edges[state.featuredIndex].node.post
                    .childMdx.frontmatter.title
                }
              </h2>
            </Link>

            <time>
              Posted At:{" "}
              {
                allData.allContentfulTeam.edges[state.featuredIndex].node.post
                  .childMdx.frontmatter.postedAt
              }
            </time>
            {/* <div dangerouslySetInnerHTML={{__html : data.node.post.childMdx.frontmatter.snippet}}/> */}
            <Link
              to={`/blogs/${
                allData.allContentfulTeam.edges[state.featuredIndex].node.post
                  .childMdx.frontmatter.slug
              }`}
              className="purple"
            >
              Go To Post
            </Link>
          </div>
        </div>
        <div
          className="popularSelection"
          style={{
            display: "flex",
            position: "absolute",
            zIndex: "2",
            width: "100%",
            justifyContent: "space-around",
            bottom: "0",
          }}
        >
          <ul id="popular" className="flexbottom">
            {allData.allContentfulTeam.edges.map((item, index) => (
              <li
                key={`${index}`}
                onClick={onChange}
                onKeyDown={onChange}
                data-key={`${index}`}
              >
                <Image
                  fluid={item.node.featuredImage.fluid}
                  alt={item.node.post.childMdx.frontmatter.title}
                  className="image recentPostImage"
                  style={{ margin: "10px" }}
                  data-key={`${index}`}
                />
                <div className="middle">
                  <div className="text">
                    <p>{item.node.post.childMdx.frontmatter.title}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* <IconButton>
                    <ImageIcon/>
                </IconButton>
                <IconButton>
                    <ImageIcon/>
                </IconButton>
                <IconButton>
                    <ImageIcon/>
                </IconButton>
                <IconButton>
                    <ImageIcon/>
                </IconButton> */}
        </div>
      </div>
    </div>
  );
};

export default Featured;
