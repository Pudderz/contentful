import React from 'react'
import {Link} from 'gatsby'
import Image from "gatsby-image"

const Featured =({ data })=>(
    <div className="container">
        <div className="featuredImage">
            <Link to={`/blogs/${data.node.post.childMdx.frontmatter.slug}`}>
                <Image
                fluid={data.node.featuredImage.fluid}
                alt={data.node.post.childMdx.frontmatter.title}
                className="image"
                />    
            </Link>
        </div>
        <div className="featuredText">
            
            <h2>{data.node.post.childMdx.frontmatter.title}</h2>

            <time>Posted At: {data.node.post.childMdx.frontmatter.postedAt}</time>
            <div dangerouslySetInnerHTML={{__html : data.node.post.childMdx.frontmatter.snippet}}/>
            <Link to={`/blogs/${data.node.post.childMdx.frontmatter.slug}`}className="purple">Read More</Link>    
        </div>
    </div>
)

export default Featured
