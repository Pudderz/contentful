import {Link} from 'gatsby'
import PropTypes from "prop-types";
import React from 'react'

const Pager = ({pageContext}) =>{
    const {previousPagePath, nextPagePath}= pageContext;
    return(
        <div className="pager">
        {previousPagePath && (
            <Link className="purple" to={previousPagePath}>Previous Page</Link>
        )}
        {nextPagePath && (
            <Link className="purple" to={nextPagePath}>Next Page</Link>
        )}
        </div>
    )
}

Pager.propTypes = {
    pageContext: PropTypes.object.isRequired,
}
export default Pager;