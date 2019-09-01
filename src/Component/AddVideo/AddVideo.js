import React, {Component} from "react";
import axios from 'axios';
import Class from './AddVideo.module.css';
import Creatable from 'react-select/creatable';


class AddVideo extends Component{
    state = {
       title: '',
       link: '',
       categories: null,
       selectedCategory: null,
       selectedVideo: {},
    }

    handleInputChange = (e, field) => {
        const value = e.target.value;        
         this.setState({[field]: value});
    }  

     handleCategoryChange = selectedOption => {
        this.setState({ selectedCategory: selectedOption });
    };

    handleFormSubmit = (e) => {
        e.preventDefault(); 
        let catArray= this.state.selectedCategory.map(cat=>cat.value);

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

        var url=this.props.editMode? 'updateVideo': 'insertVideo';
        if(this.props.editMode) data.id=this.state.selectedVideo.id;

        axios.post('/'+url, data, {headers: headers})
        .then((response)=> {
           alert(response.data.success);
           this.setState({
                title: '',
                link: '', 
                selectedCategory: null
                });
        })
        .catch(function (error) {
            console.log(error);
            alert(error);
        });

    }

    componentDidMount() {
        const {selectedVideo, editMode}= this.props;  

         axios.get('/getCategories')
        .then((response) => {
           
          var cats= response.data.categories.map(cat=> {
                return {
                    value: cat.catName,
                    label: cat.catName
                }
            });

          this.setState({categories:cats});
        })
        .catch(function (error) {
            console.log(error);
        }); 
        
        if(editMode){
            const categories= selectedVideo.categories.map(cat=> {
                return {
                    value: cat.catName,
                    label: cat.catName
                }
            });

            this.setState({
                title: selectedVideo.title,
                link: selectedVideo.link,
                selectedCategory: categories,
                selectedVideo: selectedVideo
            });
        }    
  }    

    render(){
         const {categories, selectedCategory } = this.state;

        return( 
            <React.Fragment>   
                <div className={Class.Logform}>                    
                    <form className={Class.Form}>
                        <input value={this.state.title} className="form-control" placeholder="Title" type="text" name="title" onChange={(e)=>{this.handleInputChange(e,'title')}} />
                        <br/>
                        <input value={this.state.link} className="form-control" placeholder="Link" type="text" name="link"  onChange={(e)=>{this.handleInputChange(e,'link')}}/>
                        <br/>
                        <Creatable isMulti={true} placeholder="Categories" value={selectedCategory} onChange={this.handleCategoryChange} options={categories}/>
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
