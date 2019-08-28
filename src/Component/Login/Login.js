import React, {Component} from "react";
import axios from 'axios';
import Class from './Login.module.css'

class Login extends Component{
    state = {
       email: '',
       password: ''
    }

    handleInputChange = (e, field) => {
        const value = e.target.value;        
         this.setState({[field]: value});
    }

    
    handleFormSubmit = (e) => {
        const { onLoginSuccess } = this.props;
        e.preventDefault();

        axios.post('http://localhost:8000/api/login', {
            email: this.state.email,
            password: this.state.password
        })
        .then(function (response) {
            const authToken = response.data.success.token;
            // Store the token in localStorage
            // Set the token as a state property in the parent
            onLoginSuccess(authToken);
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    render(){
             
        return(           
            <div className={Class.Logform}>
                <h2 className={Class.Header}>Login to your account</h2> 
                <form className={Class.Form} className='login'>
                    <input className={Class.Input} placeholder="E-mail" type="text" name="email" onChange={(e)=>{this.handleInputChange(e,'email')}} />
                    <input  placeholder="Password" className={Class.Input} type="password" name="password"  onChange={(e)=>{this.handleInputChange(e,'password')}}/>
                    <br/>
                    <input className={Class.Btn} type="submit" value="Login" onClick={this.handleFormSubmit}/>
                </form> 
            </div>
        )    
    }

}

export default Login;


