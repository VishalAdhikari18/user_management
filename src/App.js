import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import UserForm from './components/UserForm';
import UserDetail from './components/UserDetail';
import './styles.css';


const App = () => {
  const [users, setUsers] = useState([]);
  const handleUserCreated = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage users={users} setUsers={setUsers} />}
        />
        <Route
          path="/create"
          element={<UserForm onUserCreated={handleUserCreated} />}
        />
        <Route
          path="/edit/:id"
          element={<UserForm users={users} setUsers={setUsers} />}
        />
        <Route
          path="/user/:id"
          element={<UserDetail />}
        />
      </Routes>
    </Router>
  );
};

export default App;
