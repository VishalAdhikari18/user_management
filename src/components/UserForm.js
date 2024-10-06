import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UserForm = ({ onUserCreated }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: { street: '', city: '' },
  });
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => console.error('Error fetching user:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'street' || name === 'city') {
      setUser((prevUser) => ({
        ...prevUser,
        address: {
          ...prevUser.address,
          [name]: value,
        },
      }));
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `https://jsonplaceholder.typicode.com/users/${isEdit ? user.id : ''}`;
    const method = isEdit ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(response => response.json())
    .then(data => {
      alert(`User ${isEdit ? 'updated' : 'created'} successfully!`);
      if (!isEdit && onUserCreated) {
        onUserCreated(data); 
      }
      navigate('/');
    })
    .catch(error => console.error('Error saving user:', error));
  };

  return (
    <div>
      <h1>{isEdit ? 'Edit User' : 'Create User'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
        />
        <input
          type="text"
          name="street"
          value={user.address.street}
          onChange={handleChange}
          placeholder="Street"
          required
        />
        <input
          type="text"
          name="city"
          value={user.address.city}
          onChange={handleChange}
          placeholder="City"
          required
        />
        <button type="submit" >Save</button>
      </form>
    </div>
  );
};

export default UserForm;
