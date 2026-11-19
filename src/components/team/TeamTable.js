import React from 'react';

// Renders a PPMC / committer table from src/data/team.js.
export default function TeamTable({ members }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>GitHub ID</th>
          <th>Organization</th>
        </tr>
      </thead>
      <tbody>
        {members.map((m) => (
          <tr key={m.github}>
            <td>
              {m.name}
              {m.mentor && <em> (Mentor)</em>}
            </td>
            <td>{m.email}</td>
            <td>{m.github}</td>
            <td>{m.organization}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
