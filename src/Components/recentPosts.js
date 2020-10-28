import React from 'react'
import { Link } from 'gatsby';
import {Grid} from '@material-ui/core'
import Blog from './blog'
export const PopularPosts =(props)=> {
    const articles = props.data;
    return (
        <div className="popularPosts">
            <h3>Recent Posts</h3>
            <hr/>
            <ul className="allPosts recent">
            <Grid container spacing={2}>
            {articles.map((article, index) => (
                <Blog key={index} data={article} smallestSize={6} small={12}/>
            ))}
            </Grid>
             </ul>
            <hr/>
            <div className="center"><Link to="/posts">All Posts</Link></div>
        </div>
    )
    
}

export default PopularPosts
