import React, { useEffect, useState } from 'react';
import './SlackUsers.css';

const SlackUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/slack_users.json')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => {
        console.error('Error loading Slack users:', error);
      });
  }, []);

  return (
    <div>
      <div className="grid">
        {users.map((user) => (
          <div key={user.id} className="card">
            <img
              src={user.profile_image || 'https://via.placeholder.com/100'}
              alt={user.name}
              className="avatar"
            />
            <p><strong>{user.name}</strong></p>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlackUsers;
