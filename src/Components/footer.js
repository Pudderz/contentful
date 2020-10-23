import { Link } from 'gatsby'
import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (
            <div className="colorPurple">
               <footer>
                    <h4>Blog</h4> 
                    <div className="flex">
                    <div className="grid">
                    <h5>Our company</h5>
                    <Link to="/about">About us</Link>
                    <Link to="/">Jobs</Link>
                    <Link to="/">View plans</Link>
                    <Link to="/">Reviews</Link>  
                    </div>

                    <div className="grid">
                    <h5>Help me</h5>
                    <Link to="/">FAQ</Link>
                    <Link to="/">Terms of use</Link>
                    <Link to="/">Privacy policy</Link>
                    <Link to="/">Cookies</Link>  
                    </div>

                    <div className="grid">
                    <h5>Contact</h5>
                    <Link to="/">Email</Link>
                    <Link to="/">Support</Link>
                    <Link to="/">Live chat</Link>
                    </div>

                    <div className="grid">
                    <h5>Others</h5>
                    <Link to="/">Careers</Link>
                    <Link to="/">Information</Link>
                    <Link to="/">Licenses</Link>  
                    </div>
                    </div>


                </footer> 
            </div>
        )
    }
}

export default Footer
