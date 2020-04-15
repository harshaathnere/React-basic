import React , {Component, Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import './App.css';
import axios from 'axios';
import Users from './components/users/Users';
import User from './components/users/User';
import About from './components/pages/About'
import Search from './components/users/Search';
import Alert from './components/layout/Alert';


class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert:null,
    repos: []

  }
//  async componentDidMount(){
//    console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET);
//    this.setState({loading: true});
//    const res = await axios.get(`https://api.github.com/search/users?q=${text}client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
//   &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  
//   this.setState({users: res.data, loading:false});
  
//   }
// Search github users
  searchUsers =  async text => {
    this.setState({loading: true});
  const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=4129af26042112503ded&client_secret=b453053237de910a81bfa3564b591f3572539ec9`);
  
  this.setState({user: res.data, loading:false}); 
  }
  // get single gitub users
  getUser = async(username) => {
    this.setState({loading: true});
  const res = await axios.get(`https://api.github.com/users/${username}?client_id=4129af26042112503ded&client_secret=b453053237de910a81bfa3564b591f3572539ec9`);
  
  this.setState({users: res.data.items, loading:false}); 
  }
// get user repos
getUserRepos = async(username) => {
  this.setState({loading: true});
const res = await axios.get(`https://api.github.com/users/repos?per_page=5&sort=created:asc${username}?client_id=4129af26042112503ded&client_secret=b453053237de910a81bfa3564b591f3572539ec9`);

this.setState({repos: res.data.items, loading:false}); 
}
  // Clear user from state
  clearUsers = () => this.setState({users: [], loading: false});
  // set alert
  setAlert = (msg, type) => {
    this.setState({alert: { msg , type}});
    setTimeout(() =>  this.setState({alert: null}), 5000)};
  
  render(){
    const  {users,user,repos, loading} = this.state;
    console.log('process--->',user)

     return (
       <Router>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={this.state.alert}/>
          <Switch>
            <Route exact path = '/' render={props =>(
              <Fragment>
                <Search
           searchUsers={this.searchUsers} 
           clearUsers={this.clearUsers} 
           showClear={this.state.users.length > 0  ? true: false}
           setAlert={this.setAlert}
           />
       {user && user.items &&   <Users loading={loading} users={user.items}/> }
              </Fragment>
            )}/>
            <Route exact path='/about' component={About}/>
            <Route exact path = '/user/:login' render={props => (<User{...props} 
              getUser={this.getUser}
              getUserRepos = {this.getUserRepos}
               user={user} 
               repos={repos}
               loading={loading}/>)}/>
          </Switch>
          
        </div>
      </div>
      </Router>
    );
  } 
}
export default App;
