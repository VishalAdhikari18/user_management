import React from 'react';
import { Link } from 'react-router-dom';

const UserList = ({ users, setUsers }) => {

  const deleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
      }).then(() => setUsers(users.filter(user => user.id !== id)));
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <Link to={`/user/${user.id}`} className="details-btn">View Details</Link> | 
                <Link to={`/edit/${user.id}`} className="edit-btn">Edit</Link> | 
                <button className="delete-btn" onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
