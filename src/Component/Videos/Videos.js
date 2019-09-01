import React, {Component} from "react";
import Filter from '../Filter/Filter';
import Thumbnail from './Thumbnail/Thumbnail'
import classes from './Video.module.css'

class Videos extends Component{
   
    
    render(){ 
        console.log( this.props.filteredVideos);
        const thumbnails = this.props.filteredVideos.map((video, i) =>{
                    return <Thumbnail title={video.title} link={video.link} key={i} />
                })
           
        return(   
            <div className={classes.VideoContainer}>    
                {thumbnails} 
            </div>
        )    
    }

}

export default Videos;