import React, { useEffect, useState } from 'react';
import './Contributors.css';

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
      <div className="grid">
        {contributors.map((contributor) => (
          <div key={contributor.login} className="card">
            <img
              src={contributor.avatar_url || 'https://via.placeholder.com/100'}
              alt={contributor.login}
              className="avatar"
            />
            <p><strong>{contributor.login}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contributors;
