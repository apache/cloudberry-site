import React, { useEffect, useState } from 'react';
import styles from './Contributors.module.css';

const Contributors = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    // Fetch data from contributors_and_team.json
    fetch('/contributors_and_team.json')
      .then((response) => response.json())
      .then((data) => {
        setContributors(data);
      })
      .catch((error) => {
        console.error('Error loading contributors:', error);
      });
  }, []);

  return (
    <div>
      <div className={styles.grid}>
        {contributors.map((contributor) => (
          <div key={contributor.login} className={styles.card}>
            <img
              src={contributor.avatar_url || 'https://via.placeholder.com/100'}
              alt={contributor.login}
              className={styles.avatar}
            />
            <p><strong>{contributor.login}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contributors;
