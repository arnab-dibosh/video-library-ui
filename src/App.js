import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SearchVideo from './Component/SearchVideo/SearchVideo';
import Login from './Component/Login/Login';
import AddVideo from './Component/AddVideo/AddVideo';
import VideoList from './Component/VideoList/VideoList';
import classes from './App.module.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  state = {
    authToken: '',
    selectedRow: {}
  }
  setAuthToken = (authToken) => {
    localStorage.setItem('authToken',authToken);
    this.setState({authToken: authToken});
    //console.log()
  }

  componentDidMount() {
    // See if localStorage has authToken
    if(!this.state.authToken) {
      if(localStorage.getItem('authToken')) {
        this.setState({authToken: localStorage.getItem('authToken')})
      }
    }
    // If no token then then Login
    // Else set the authToken state from LocalStorage

  }

  handleLogOut=()=>{
    localStorage.removeItem('authToken');
    this.setState({authToken: ''})
  }

  setSelectdVideo= (selectedRow)=>{
    //console.log(selectedRow);
    this.setState({selectedRow: selectedRow})
  }

  render() {
    const {authToken} = this.state;
    const navigations = (
       <div className={classes.Navigation}>
          <div className={classes.Link}>
            <Link to="/VideoList">Video List</Link>
            <Link to="/Search">Search</Link>
          </div>
          <button onClick={this.handleLogOut}>Log Out</button>
        </div>
    )

    const routes= (
      <React.Fragment>
        <Route path="/VideoList" render={() => <VideoList setSelectdVideo={this.setSelectdVideo} authToken={authToken} />} />
        <Route path="/Search" render={() => <SearchVideo authToken={authToken} />} />
        <Route path="/Add" render={() => <AddVideo editMode={false} authToken={authToken} />} />
        <Route path="/edit" render={() => <AddVideo editMode={true} selectedVideo={this.state.selectedRow} authToken={authToken} />} />
      </React.Fragment>
    )

    return (
      <Router>
        <div className={classes.App}>
        { !authToken ? (<Login onLoginSuccess={this.setAuthToken}/>) : null }
        { authToken ? navigations : null }       
        { authToken ? routes : null }       
        </div>
      </Router>
    );
  }
}

export default App;

