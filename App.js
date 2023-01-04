import React from 'react';
import './App.css';
import Home from './components/home/home';
import SignIn from './components/sign-in/sign-in';
import SignUp from './components/sign-up/sign-up';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Scrumboard from './components/scrumboard/scrumboard';


class App extends React.Component {
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/scrumboard' element={<Scrumboard/>}/>
          </Routes>
        </div>
      </BrowserRouter>
     
    );
  }
  
}

export default App;
