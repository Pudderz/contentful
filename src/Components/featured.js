import React, { useState } from "react";
import { Link, navigate } from "gatsby";
import Image from "gatsby-image";
// import FeaturedListItem from "./featuredListItem";

const Featured = (props) => {
  const { allData } = props;
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [active, setActive] = useState({
    0: "active",
  });

  const onChange = (e) => {
    console.log(e.currentTarget.getAttribute("data-key"));
    setFeaturedIndex(e.currentTarget.getAttribute("data-key"));
    setActive({
      [e.currentTarget.getAttribute("data-key")]: "active",
    });
  };

  return (
    <div style={{
        margin: 'auto',
        width: '100%',
        maxWidth: '1400px',
    }}>
      <div className="featuredContainer"  >
      <div
      // className="featuredImage"
      >
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
      </div>
        <div className="featuredText">
          <div>
            <a
              style={{ width: "fit-content" }}
              onClick={() =>
                navigate("/search", {
                  state: {
                    category:
                      allData.allContentfulTeam.edges[featuredIndex].node
                        .categories[0],
                  },
                })
              }
            >
              {
                allData.allContentfulTeam.edges[featuredIndex].node
                  .categories[0]
              }
            </a>
            <Link
              to={`/blogs/${
                allData.allContentfulTeam.edges[featuredIndex].node.post
                  .childMdx.frontmatter.slug
              }`}
            >
              <h2 id="featuredTitle" 
              // className="underline"
              >
                {
                  allData.allContentfulTeam.edges[featuredIndex].node.post
                    .childMdx.frontmatter.title
                }
              </h2>
            </Link>

            <time>
              Posted At:{" "}
              {
                allData.allContentfulTeam.edges[featuredIndex].node.post
                  .childMdx.frontmatter.postedAt
              }
            </time>
            <div dangerouslySetInnerHTML={{__html : allData.allContentfulTeam.edges[featuredIndex].node.post.childMdx.frontmatter.snippet}}/>
            <Link
              to={`/blogs/${
                allData.allContentfulTeam.edges[featuredIndex].node.post
                  .childMdx.frontmatter.slug
              }`}
              className="purple"
            >
              Go To Post
            </Link>
          </div>
        </div>
        
      {/* </div> */}
    
    
    </div>
    {/* <div
          // className="popularSelection"
          style={{
            // display: "grid",
            // position: "absolute",
            zIndex: "2",
            // width: "100%",
            justifyContent: "space-around",
            bottom: "0",
          }}
        >
          <ul id="popular" className="flexbottom" style={{display:'grid', height:'100%', gridTemplateRows: '25%'}}>
            {allData.allContentfulTeam.edges.map((item, index) => (
              <FeaturedListItem
              indexKey={`${index}`}
              OnChange={onChange}
              
                data-key={`${index}`}
                active ={featuredIndex}
                text = {item.node.post.childMdx.frontmatter.title}
                image ={item.node.featuredImage.fluid}
              />
              
            ))}
          </ul>
        </div> */}
    </div>
    
  );
};

export default Featured;
