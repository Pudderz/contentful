import React, { useState } from "react";
import { StaticQuery, graphql } from "gatsby";
import { navigate } from "gatsby";
import { Button } from "@material-ui/core";


const CategorySelection = (props) => {
    const [showOutline, setShowOutline] = useState('')
  const [outlinePlacement, setOutlinePlacement] = useState({
    top: 0,
    right: 0,
  });
  var outlineTimeout;
  var parentPos;
  var childPos;
  const onMouseOver = (e) => {
    clearTimeout(outlineTimeout);
    setShowOutline('active')
      //Stops e being the child element of the Button which would be a span
      if(e.target.tagName.toLowerCase() === 'span'){
        parentPos = e.target.parentElement.parentElement.getBoundingClientRect();
        childPos = e.target.parentElement.getBoundingClientRect();
      }else{
        parentPos = e.target.parentElement.getBoundingClientRect();
        childPos = e.target.getBoundingClientRect();
      }

    const relativePos = {};
    relativePos.top = childPos.top - parentPos.top;
    relativePos.right =  parentPos.right- childPos.right;
    relativePos.bottom = parentPos.bottom- childPos.bottom ;
    relativePos.left = childPos.left - parentPos.left;

    setOutlinePlacement({
      ...relativePos,
    });
  };
const onMouseLeave = e =>{
    outlineTimeout = setTimeout(()=>{
        setShowOutline('');
    }, 1000)
}

const buttonClicked =(category)=>{
  if(window.location.pathname === "/search"){
    props.changeCategory({target:{value:category}})
  }else{
    navigate('/search',{state: { category : category}}
    )
  }
  }

  return (
    <StaticQuery
      query={graphql`
        {
          allContentfulTeam {
            edges {
              node {
                categories
              }
            }
          }
        }
      `}
      render={(data) => {
        return (
          <div style={{ position: "relative" ,display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',}}>

            {data.allContentfulTeam.edges.map((article, pageIndex) =>
              article.node.categories.map((category, index) => {
                return (
                  <Button
                  className="categoryLink"
                    key={`${pageIndex},${index}`}
                    onMouseEnter={onMouseOver}
                    onMouseLeave= {onMouseLeave}
                    variant="outlined"
                    style={{ margin: "4px",
                borderRadius: '0px' }}
                    onClick={e=>{
                      e.preventDefault();
                      buttonClicked(category)
                      }} 
                  >
                    {category}
                  </Button>
                );
              })
            )}

            <div
              className={`movingOutline ${showOutline}`}
              style={{
                position: "absolute",
                top: outlinePlacement.top,
                left: outlinePlacement.left,
                right: outlinePlacement.right,
                bottom: outlinePlacement.bottom,
                border: "1px solid #fcbc3e",
                pointerEvents: 'none',
                transition: 'all .3s ease-out',
              }}
            ></div>
          </div>
        );
      }}
    />
  );
};

export default React.memo(CategorySelection);
