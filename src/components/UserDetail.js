import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user details:', error));
  }, [id]);

  return user ? (
    <div className="card-container">
      <div className="user-card">
        <h2>{user.name}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
        <p><strong>Company:</strong> {user.company.name}</p>
      </div>
    </div>
  ) : <p>Loading...</p>;
};

export default UserDetail;
