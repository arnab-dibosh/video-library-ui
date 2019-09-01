import React, {Component} from "react";
import Filter from '../Filter/Filter';
import Videos from '../Videos/Videos';
import axios from 'axios';


class SearchVideo extends Component{
    state = {
        categories : [],
        selectedCategories: [],
        filteredVideos:[]
    }

    handleCategoryClick = (category, isSelected) => {
        
        let selectedCategories = [...this.state.selectedCategories];  
        if(isSelected) {                                  
            selectedCategories.push(category)
        }else {
            selectedCategories = selectedCategories.filter(cat => cat !== category)
        }
         this.setState({
                selectedCategories: selectedCategories
            })
        this.populateVideos(selectedCategories);             
    }

    populateVideos=(selectedCategories)=>{
        
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+this.props.authToken
        }

        if(selectedCategories.length){
            var strParam=selectedCategories.map(x => "'" + x + "'").toString();
            strParam='"'+strParam+'"';
            let data= {
                category: strParam,
            }

            let videos=[];
            axios.post('/getVideoByCategory', data, {headers: headers})
            .then((response) => {
                console.log(response);
            videos=response.data.videos;
                this.setState({
                    filteredVideos: videos
                })
            })
            .catch(function (error) {
                console.log(error);
            });  
        }
        else{
            this.setState({
                    filteredVideos: []
                })
        }
    }

    componentDidMount(){
         axios.get('/getCategories')
        .then((response) => {
           // console.log(response.data.categories);
          var cats= response.data.categories.map(cat=> cat.catName);
          this.setState({categories:cats, selectedCategories: cats});
          this.populateVideos(cats);
        })
        .catch(function (error) {
            console.log(error);
        }); 
    }

    render(){
        const { categories, selectedCategories } = this.state;
        return(
            <div> 
                <Filter categories={categories} onClickCategory={this.handleCategoryClick} />
                <Videos  filteredVideos={this.state.filteredVideos}/>
            </div>
        )    
    }

}

export default SearchVideo;