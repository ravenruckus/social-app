import React, { Component } from 'react'
import './bgr.css'

export default class Main extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    return(
      <div className="homepage-hero-module">
        <div className="video-container">
            <div className="filter"></div>
            <video autoPlay loop className="fillWidth">
                <source src="./bground/bgr.mp4" type="video/mp4" />Your browser does not support the video tag. I suggest you upgrade your browser.
                <source src="./bground/bgr.webm" type="video/webm" />Your browser does not support the video tag. I suggest you upgrade your browser.
            </video>
            <div className="poster hidden">
                <img src="./bground/bgr.jpg" alt="" />
            </div>
        </div>
      </div>
    )
  }
}
