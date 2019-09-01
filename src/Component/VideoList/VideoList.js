import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AddVideo from './../AddVideo/AddVideo';
import axios from 'axios';
import TableRow from './../TableRow/TableRow';


export default class VideoList extends Component {
  
  state={
    videoList: [],
    selectedRowId: null,
  }  

   tabRow = (selectedRowId) => {
    return this.state.videoList.map((object, i) => {
      return (
        <TableRow
          video={object}
          key={object.id}
          selectRow={this.selectRow}
          selectedRowId={selectedRowId}
        />
      );
    });
  };  

   selectRow = rowId => {
    const {setSelectdVideo}= this.props;
    const selectedRowId = this.state.selectedRowId;
    const toggleSelection = selectedRowId === rowId;
    rowId = toggleSelection ? null : rowId;
    console.log("selected", rowId);
    this.setState({
      selectedRowId: rowId
    });

    this.state.videoList.map(video=> {if(video.id===rowId) setSelectdVideo(video)} );
  };

  deleteRow = rowId => {

      const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+this.props.authToken
        }

     axios.post('/deleteVideo', {id: rowId}, {headers: headers})
            .then((response) => {
                alert(response.data.success);

                const videoList = [...this.state.videoList];
                const Index = videoList.findIndex(item => item.id === rowId);
                videoList.splice(Index, 1);
                this.setState({ videoList: videoList });

            })
            .catch(function (error) {
                alert(error);
            });  

  };
    
  componentDidMount() {

    const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+this.props.authToken
        }

     axios.post('/getAllVideo', null, {headers: headers})
            .then((response) => {
                this.setState({
                    videoList: response.data.videos
                })           
            })
            .catch(function (error) {
                console.log(error);
            });  
  } 


  
  render() {
  
    const { selectedRowId, videoList } = this.state;
    
    const actionButtons = (
      <div className="actionButtons">
        <Link to={"/Add"} className="">
          <button className="btn btn-primary padding">Add</button>
        </Link>

        {selectedRowId ? (
          <Link to={"/edit"} className="">
            <button className="btn btn-primary padding">Edit</button>
          </Link>
        ) : null}

        {selectedRowId ? (
          <button
            className="btn btn-primary padding"
            onClick={() => this.deleteRow(selectedRowId)}
          >
            Delete
          </button>
        ) : null}
        

      </div>
    );

    return (
      <div>      
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Link</th>
              <th>Categories</th>
            </tr>
          </thead>
          <tbody>{this.tabRow(selectedRowId)}</tbody>
        </table>
        {actionButtons}
      </div>
    );
  }
}
