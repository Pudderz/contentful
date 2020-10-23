import React from 'react'
import Image from 'gatsby-image'
import {Link} from 'gatsby'

function Blog({data}) {
    return (
        <li key={data.node.post.childMdx.frontmatter.slug} className="blogPost">
            <div >
                <Link to={`/blogs/${data.node.post.childMdx.frontmatter.slug}`}>
                <Image
                fluid={data.node.featuredImage.fluid}
                alt={data.node.post.childMdx.frontmatter.title}
                className="image"
                /></Link>
            </div>
            <div className="information">
                <h2>{data.node.post.childMdx.frontmatter.title}</h2>
                <time>Posted At: {data.node.post.childMdx.frontmatter.postedAt}</time>
                <div dangerouslySetInnerHTML={{__html:data.node.post.childMdx.frontmatter.snippet}}></div>
                <Link to={`/blogs/${data.node.post.childMdx.frontmatter.slug}`} className="purple">Read More</Link>   
            </div>
            
        </li>
    )
}


export default Blog
