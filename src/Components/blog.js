import React from 'react'
import Image from 'gatsby-image'
import {Link} from 'gatsby'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
function Blog({data, smallestSize}) {

    return (
        <Grid className="items" item xs={12} sm={12} md={6} lg={smallestSize} key={data.node.post.childMdx.frontmatter.slug}>
        {/* <li   */}
         {/* className="blogPost" */}
        {/* > */}
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
                <Link to={`/blogs/${data.node.post.childMdx.frontmatter.slug}`} className="purple">Read More</Link>   
            </div>
            
        {/* </li> */}
        </Grid>
    )
}


export default Blog
