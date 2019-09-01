import React from 'react'
import classes from './Thumbnail.module.css'

function thumbnail (props) {
    const { link, title, key } = props;
     
    return (
      <div className={classes.Thumbnail}>
        <iframe title={key} src={link} ></iframe>
        <div>{title}</div>
      </div>
    )
}

export default thumbnail;
  
