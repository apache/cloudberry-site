import React, { useEffect, useState } from 'react';
import styles from './SlackUsers.module.css';

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
      <div className={styles.grid}>
        {users.map((user) => (
          <div key={user.id} className={styles.card}>
            <img
              src={user.profile_image || 'https://via.placeholder.com/100'}
              alt={user.name}
              className={styles.avatar}
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
