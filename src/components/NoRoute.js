import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import image from '../images/404.gif'


const NoRoute = () => {
    return(
        <div>
            <h3>404 Not Found</h3>
            <img src={image} alt="404" width='200px'/>
        </div>
    )
}

export default NoRoute