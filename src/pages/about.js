import React, { Component } from 'react'
import Navigation from '../Components/navigation'
import Footer from '../Components/footer'
import Metadata from '../Components/metadata'
import '../Components/about.scss'

class about extends Component {
    render() {
        return (
            <div style={{'textAlign': 'center'}}>
                <Navigation/>
                <Metadata/>
                <div id="aboutSite">
                    <h2>About Site</h2>     
                    <p>This is a Gatsby Blog Template site that takes data from a mdx files using graphql and displays the content in a blog format</p>
                    
                </div>
                
  
  

                <div id="formDiv">
                    <form className="contactForm" netlify>
                         <h3>Contact Form</h3>
                        <label htmlFor="name">
                            Name:<input id="name"type="text" placeholder="name"/>
                        </label>
                        <label htmlFor="email">
                            Email:<input id="email"type="email" placeholder="email"/>
                        </label>
                        <label htmlFor="message">
                            Message:<textarea id="message" placeholder="message"/>
                        </label>
                        
                        <button className="purple" type="submit">Send</button>
                    
                    </form>
                </div>
                <Footer/>       
            </div>
        )
    }
}

export default about
