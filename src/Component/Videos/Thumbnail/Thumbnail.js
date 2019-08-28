import React from 'react'
import classes from './Thumbnail.module.css'

function thumbnail (props) {
    const { link } = props;
    return (
      <div className={classes.Thumbnail}>
        <iframe src={link} ></iframe>
      </div>
    )
}

export default thumbnail;
  
