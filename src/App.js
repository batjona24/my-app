import './App.css';
import React from 'react';

function App() {
  // const [user, setUser] = React.useState({
  //   username:"",
  //   password:"",
  // })
  const [error,setError] = React.useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const username = formData.get("username");
    const password = formData.get("password");
    const values = { username, password };
  
    const response = await fetch('http://localhost:4000/api/sign-in', {
        method: 'POST', headers: {
            'Content-Type': 'application/json; charset=utf-8 '
        }, body: JSON.stringify(values)
    })
    const data = await response.json();
    if(response.ok) {
        const user_id = data.id;
        window.localStorage.setItem("user_id", user_id);
        // window.location.pathname = '/trips';
        console.log(data);
        
        // setUser(data);
    }
    else {
      
        setError(data);
    }
  };
    return (
      <div className="app-title">
        <h1>Hello!</h1>
        <form id="login" onSubmit={onSubmit}>
        <h1>LOG IN</h1>
        <h2>Please enter your username and password to log in!</h2>
        <label htmlFor='username'>Username:</label>
        <input type="text" id="username" name="username" placeholder="Enter your username..." required/>
        <label htmlFor='password' >Password:</label>
        <input type="password" id="password" name="password" placeholder="Enter your password..." required/>
        <button type="submit" name="submit">LOG IN</button>
        {error?<p>Username or password invalid!</p>:null}
        </form>
      </div>
    );
 
}

export default App;
