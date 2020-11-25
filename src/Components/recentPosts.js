import React from 'react'
import { Link } from 'gatsby';
import {Grid} from '@material-ui/core'
import Blog from './blog'
export const PopularPosts = props => {
    const articles = props.data;
    return (
        <div className="popularPosts"style={{padding:'20px', boxSizing:'border-box'}}>
            <h3>Recent Posts</h3>
            <hr/>
            
            <Grid container  className="allPosts recent">
            {articles.map((article, index) => (
                <Blog key={index} data={article} smallestSize={6} small={12}/>
            ))}
            </Grid>
          
            <hr/>
            <div className="center"><Link to="/posts">All Posts</Link></div>
        </div>
    )
    
}

export default PopularPosts
