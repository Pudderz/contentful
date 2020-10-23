import React from 'react'
import Navigation from '../Components/navigation'
import Metadata from '../Components/metadata'
export default function page(){
    const divStyles ={
        position: 'absolute',
        top:0,
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: 'center',
        margin: 'auto',
        maxWidth:'400px',
        height: '300px',
    }
    return (
        <>
        <Metadata/>
        <Navigation/>
        <div style={divStyles}>
            <h2 style={{color: 'white', margin: '0'}}> Resource not found</h2>
            <h3 style={{color: 'grey', margin: '0', fontSize: '2em'}}> Error 404</h3>
            <p style={{color: 'white'}}>The requested resource could not be found</p>
        </div>
        </>
    )
}
