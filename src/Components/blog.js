import React from 'react'
import Image from 'gatsby-image'
import {Link} from 'gatsby'

import Grid from '@material-ui/core/Grid';
function Blog({data, smallestSize, small}) {

    return (
        <Grid className="items" item xs={12} sm={small} md={6} lg={smallestSize} key={data.node.post.childMdx.frontmatter.slug}>
            <div id="imageContainer">
                <Link to={`/blogs/${data.node.post.childMdx.frontmatter.slug}`}>
                <Image
                fluid={data.node.featuredImage.fluid}
                alt={data.node.post.childMdx.frontmatter.title}
                className="image"
                height="300px"
                width="100%"
                /></Link>
            </div>
            <div className="information">
                <h2>{data.node.post.childMdx.frontmatter.title}</h2>
                
                <div dangerouslySetInnerHTML={{__html:data.node.post.childMdx.frontmatter.snippet}}></div>
                <time>Posted At: {data.node.post.childMdx.frontmatter.postedAt}</time>
                <Link to={`/blogs/${data.node.post.childMdx.frontmatter.slug}`} className="purple">Go To Post</Link>   
            </div>
            
        {/* </li> */}
        </Grid>
    )
}


export default Blog
