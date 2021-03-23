import React, {useState, useEffect} from "react";
import PopularBlog from "./PopularBlog";

export const PopularPosts = (props) => {
  const articles = props.data;
  
  const [allPopularPosts, setAllPopularPosts] = useState( props.data)
  // ToDO order articles in order of pageviews provided by popularPosts

useEffect(() => {
  console.log(props)
  const popularOrder = [];
  console.log(popularPosts);
  const popularPosts = props.popularInfo || [];
  popularPosts.forEach((post)=>{


    for(let article of articles){
      
      if(article.node.post.childMdx.frontmatter.slug === post.id){
        console.log(article.node.post.childMdx.frontmatter.slug);
        popularOrder.push(article);
        break;
      }
    }
  })

  setAllPopularPosts(popularOrder);

}, [])


  return (
    <div
      className="popularPosts"
      style={{
        // minWidth: "min(300px,33%)",
        boxSizing: "border-box",
        // minWidth: "300px",
        // maxWidth: "1000px",
        margin:'0 auto',
        flexGrow:'2',
      }}
    >
      <h3 style={{ fontSize: "1.5em" }}
        className="header"
      >Popular Posts</h3>

      <ul
        style={{
          gap: "20px",
          display: "grid",
          padding: "0 10px",
          boxSizing: "border-box",
        }}
      >
        {allPopularPosts.map((article, index) => (
          <PopularBlog
            key={article.node.post.childMdx.frontmatter.slug}
            data={article}
            smallestSize={6}
            small={6}
            index={index}
          />
        ))}
      </ul>
    </div>
  );
};
