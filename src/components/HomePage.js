import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserList from './UserList';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      <header>
        <h1>Welcome to the User Management Application</h1>
      </header>
      
      <div className="actions" style={{ textAlign: 'center' }}>
        <Link to="/create">
          <button className="create-user-btn">Create New User</button>
        </Link>
      </div>
      <UserList users={users} setUsers={setUsers} />
    </div>
  );
};

export default HomePage;
