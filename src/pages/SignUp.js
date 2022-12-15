import Header from '../components/Header.js';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export default function SignUp(){
     const [error,setError] = React.useState(null);
     const navigate = useNavigate();
     const onSubmit = async (event) => {
       event.preventDefault();
       const form = event.target;
       const formData = new FormData(form);
       const username = formData.get("username");
       const password = formData.get("password");
       const values = { username, password };
     
       const response = await fetch('http://localhost:4000/api/sign-up', {
           method: 'POST', headers: {
               'Content-Type': 'application/json; charset=utf-8 '
           }, body: JSON.stringify(values)
       })
       const data = await response.json();
       if(response.ok) {
            window.alert("Account created");
            navigate('/log-in');
            console.log(data);  
       }
       else {
            setError(data);
       }
    }
    return (
        <div className="app-title">
           <Header />
            <form id="registration" onSubmit={onSubmit}>
                <h1>Sign-up form:</h1>
                <h2>Please enter a username and a password to make the sign-up!</h2>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" placeholder="Enter your username..." minLength="5" maxLength="12"  required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Enter your password..." pattern="(?=.*\d)(?=.*[!?.:]).{5,12}" title="Must contain at least one number and one special character, and 5-12 characters"/> 
                <p>Your password must contain <strong>at least</strong> a number and a symbol!</p>
                <button type="submit" className="button_submit" name="submit">REGISTER</button>
                {error?<p>Username or password invalid!</p>:null}
            </form>
        </div>
    );      
};