import React, { FormEvent, useEffect, useState } from 'react';
import useFetch from '../hooks/Userfetch'
import useLocalStorage from '../hooks/UseLocalStorage'
import './UserList.scss';
import '../hooks/UserFetch.scss'



interface User {
  id: number;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const { data, loading, error } = useFetch<User[]>('https://jsonplaceholder.typicode.com/users');
  const [users, setUsers] = useLocalStorage<User[]>('users', []);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [searchId, setSearchId] = useState<string>('');
  const [foundUser, setFoundUser] = useState<User | null>(null);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data, setUsers]);

  const handleAddUser = (event: FormEvent) => {
    event.preventDefault();
    const newUser: User = {
      id: users.length ? Math.max(...users.map(user => user.id)) + 1 : 1,
      name,
      email
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setName('');
    setEmail('');
  };

  const handleSearchUser = (event: FormEvent) => {
    event.preventDefault();
    const user = users.find(user => user.id === parseInt(searchId));
    setFoundUser(user || null);
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="user-list">
      <h1>User List</h1>
      <form onSubmit={handleAddUser}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <button type="submit">Add User</button>
      </form>

      <form onSubmit={handleSearchUser}>
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Search by ID"
          required
        />
        <button type="submit">Search User</button>
      </form>

      {foundUser && (
        <div className="found-user">
          <h2>Found User</h2>
          <p><strong>ID:</strong> {foundUser.id}</p>
          <p><strong>Name:</strong> {foundUser.name}</p>
          <p><strong>Email:</strong> {foundUser.email}</p>
        </div>
      )}

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
