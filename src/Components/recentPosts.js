import React from 'react'
import Image from 'gatsby-image'
import { Link } from 'gatsby';
export const PopularPosts =(props)=> {
    const onChange=(e)=>{
        props.onPostClick(e.currentTarget.getAttribute('data-key')); 
    }
    
    return (
        <div className="popularPosts">
            <h3>Recent Posts</h3>
            <hr/>
            <ul id="popular">
                {props.data.allContentfulTeam.edges.map((item, index)=>(
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
            <hr/>
            <div className="center"><Link to="/posts">All Posts</Link></div>
        </div>
    )
    
}

export default PopularPosts
