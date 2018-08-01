import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResultImage from './ResultImage';
import './ImageDisplayer.css'


class ImageDisplayer extends Component {


  static propTypes = {
    data: PropTypes.array.isRequired
  }


  onImageClicked = () => {
    console.log("hola")
  }

  render() {
    let incKey = 0
    // const that = this

    let ExtractData = this.props.data.map(imageurl => {
      return (
        <ResultImage image={imageurl} key={imageurl.id} onImageClick={this.onImageClicked} />

      )
    })
    return (
      <div className="flex-container">
        {ExtractData}
      </div>
    )
  }



}

export default ImageDisplayer
