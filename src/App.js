import React , {Component} from 'react';
import Navbar from './components/layout/Navbar';
import './App.css';
import UserItem from './components/users/UserItem'

class App extends React.Component {
  render(){
    
      return (
      <div className='App'>
        <Navbar />
        UserItem
      </div>
      
    );
  } 
}
export default App;
