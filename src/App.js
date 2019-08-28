import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SearchVideo from './Component/SearchVideo/SearchVideo';
import AddVideo from './Component/AddVideo/AddVideo';
import Login from './Component/Login/Login';
import classes from './App.module.css'

class App extends Component {
  state = {
    authToken: ''
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

  render() {
    const {authToken} = this.state;
    const navigations = (
       <div className={classes.Navigation}>
          <div className={classes.Link}>
            <Link to="/Create">Create</Link>
            <Link to="/Search">Search</Link>
          </div>
          <button onClick={this.handleLogOut}>Log Out</button>
        </div>
    )

    const routes= (
      <React.Fragment>
        <Route path="/Create/" render={() => <AddVideo authToken={authToken} />} />
        <Route path="/Search/" render={() => <SearchVideo authToken={authToken} />} />
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

