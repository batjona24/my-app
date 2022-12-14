import './App.css';
import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import SignUp from './pages/SignUp.js';
import LogIn from './pages/LogIn.js';
import Trips from './pages/Trips.js';


function App() {
 return (
    <BrowserRouter>
      <Routes>
        <Route path='/sign-up' element={<SignUp/>}></Route>
        <Route path='/log-in' element={<LogIn/>}></Route>
        <Route path='/trips' element={<Trips/>}></Route>
      </Routes>
    </BrowserRouter>
    );
 
}

export default App;
