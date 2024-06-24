import React, { useEffect } from 'react';
import useFetch from '../hooks/Userfetch'
import useLocalStorage from '../hooks/UseLocalStorage'
import './UserList.scss';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const { data, loading, error } = useFetch<User[]>('https://jsonplaceholder.typicode.com/users');
  const [users, setUsers] = useLocalStorage<User[]>('users', []);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data, setUsers]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="user-list">
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
