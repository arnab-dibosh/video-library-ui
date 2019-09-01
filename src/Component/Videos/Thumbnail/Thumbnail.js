import React from 'react'
import classes from './Thumbnail.module.css'

function thumbnail (props) {
    const { link, title } = props;
     
    return (
      <div className={classes.Thumbnail}>
        <iframe src={link} ></iframe>
        <div>{title}</div>
      </div>
    )
}

export default thumbnail;
  
