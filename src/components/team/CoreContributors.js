import React from 'react';
import { ppmcMembers, committers } from '@site/src/data/team';
import styles from './CoreContributors.module.css';

// Avatar wall of the PPMC members and committers listed in src/data/team.js.
export default function CoreContributors() {
  const people = [...ppmcMembers, ...committers].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <div className={styles.grid}>
      {people.map((p) => (
        <a
          key={p.github}
          className={styles.card}
          href={`https://github.com/${p.github}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`https://avatars.githubusercontent.com/${p.github}?s=128`}
            alt={p.github}
            className={styles.avatar}
            width={64}
            height={64}
            loading="lazy"
          />
          <span className={styles.name}>{p.name}</span>
          <span className={styles.login}>@{p.github}</span>
        </a>
      ))}
    </div>
  );
}
