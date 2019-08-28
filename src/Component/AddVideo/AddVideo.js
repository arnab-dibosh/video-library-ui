import React, {Component} from "react";
import axios from 'axios';
import Class from './AddVideo.module.css';

class AddVideo extends Component{
    state = {
       title: '',
       link: '',
       category: ''
    }

    handleInputChange = (e, field) => {
        const value = e.target.value;        
         this.setState({[field]: value});
    }

       

    handleFormSubmit = (e) => {
        e.preventDefault(); 
        let catArray= this.state.category.split(' ');

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+this.props.authToken
        }

        let data= {
            title: this.state.title,
            link: this.state.link,
            category: JSON.stringify(catArray) 
        }
       // console.log(headers, data);

        axios.post('/insertVideo', data, {headers: headers})
        .then((response)=> {
           alert(response.data.success);
           this.setState({
                title: '',
                link: '',
                category: ''
                });
        })
        .catch(function (error) {
            alert(error);
        });

    }

    render(){
             
        return( 
            <React.Fragment>   
                <div className={Class.Logform}>                    
                    <form className={Class.Form}>
                        <input value={this.state.title} className={Class.Input} placeholder="Title" type="text" name="title" onChange={(e)=>{this.handleInputChange(e,'title')}} />
                        <input value={this.state.link} className={Class.Input} placeholder="Link" type="text" name="link"  onChange={(e)=>{this.handleInputChange(e,'link')}}/>
                        <input value={this.state.category} className={Class.Input} placeholder="Categories" type="text" name="category"  onChange={(e)=>{this.handleInputChange(e,'category')}}/>
                        <br/>
                        <input className={Class.Btn} type="submit" value="Save" onClick={this.handleFormSubmit}/>
                    </form> 
                </div>
                <p>*In Link field replace watch with embed(Ex: https://www.youtube.com/embed/v=UDmq8lPWbjo instead https://www.youtube.com/watch?v=UDmq8lPWbjo)</p>
            </React.Fragment>
        )    
    }

}

export default AddVideo;


