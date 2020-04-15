import React from 'react';
import UserItem from './UserItem.js';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
const Users = ({users, loading}) => {
console.log('users-->',users)
  if(loading){
  return <Spinner/>
  }
  else{
    return (

      <div style={userStyle}>
        {users.map(user => (

        <UserItem key={user.id} user={user}/>
        ))}
      </div>
    );
  }
  
    
  }
  Users.protoTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired, 
  }

const userStyle = {
  display: 'grid',
  gridTemplatedColumns:  'repeat(3, 1fr)',
  gridGap: '1 rem'
};
export default Users
