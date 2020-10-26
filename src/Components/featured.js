import React from 'react'
import {Link} from 'gatsby'
import Image from "gatsby-image"
import { IconButton } from '@material-ui/core'
import ImageIcon from '@material-ui/icons/Image';




const Featured =(props)=>{
    const { data, allData} = props;

    const onChange=(e)=>{
        props.onPostClick(e.currentTarget.getAttribute('data-key')); 
    }
    return(
    <div className="container" style={{
        height: 'fit-content',
        width:'100%',
    
        margin: 'auto',
        display: 'block',
        minHeight: 'auto',
        overflow: 'hidden',
        borderRadius: '15px',
        marginTop: '25px',
        maxHeight: 'auto',
        maxWidth: '1300px',
        maxHeight: '80vh'

    }}>
        <div 
        // className="featuredImage"
        >
            <div style={{
                height:'100%',
                width:'100%',
                maxHeight: '100%',
                maxWidth: '100%',
                
            }}>
                <Link to={`/blogs/${data.node.post.childMdx.frontmatter.slug}`}>
                <Image
                style={{
                    height:'100%',
                }}
                fluid={data.node.featuredImage.fluid}
                alt={data.node.post.childMdx.frontmatter.title}
                className="image"
                height="300px"
                />    
            </Link>
            </div>
            
        </div>
        <div className="featuredText">
            <div >
                <p className="category">Category</p>
                <h2>{data.node.post.childMdx.frontmatter.title}</h2>

            <time>Posted At: {data.node.post.childMdx.frontmatter.postedAt}</time>
            {/* <div dangerouslySetInnerHTML={{__html : data.node.post.childMdx.frontmatter.snippet}}/> */}
            <Link to={`/blogs/${data.node.post.childMdx.frontmatter.slug}`}className="purple">Go To Post</Link>    
            </div>
            
        </div>
        <div className="popularSelection"style={{display: 'flex',position: 'absolute',
    zIndex: '2',
    width:'100%',
    justifyContent:'space-around',
    bottom: '0',
    }}>
        <ul id="popular">
                {allData.allContentfulTeam.edges.map((item, index)=>(
                    <li key={`${index}`} onClick={onChange} onKeyDown={onChange} data-key={`${index}`}>
                        <Image
                        fluid={item.node.featuredImage.fluid}
                        alt={item.node.post.childMdx.frontmatter.title}
                        className="image recentPostImage"
                        style={{'objectFit':'cover', width: '100%', height:'100%',}}
                        data-key={`${index}`}
                        />
                        <div className="middle">
                            <div className="text">
                                <p>{item.node.post.childMdx.frontmatter.postedAt}</p>
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
)}

export default Featured
