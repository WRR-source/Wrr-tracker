import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Leaderboard() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unit = localStorage.getItem("loggedInUser");
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const current = allUsers.find((u) => u.unit === unit);
    if (!current) {
      router.push("/login");
    } else {
      setCurrentUser(current);
      // Sort users by points (highest first)
      const sorted = [...allUsers].sort((a, b) => b.points - a.points);
      setUsers(sorted);
    }
  }, []);

  if (!currentUser) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>🏆 Leaderboard</h1>
      <p>Logged in as: <strong>{currentUser.name}</strong> (Unit {currentUser.unit})</p>

      <table style={{ marginTop: 20, width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Rank</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Name</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Unit</th>
            <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user.unit} style={{ backgroundColor: i === 0 ? "#e0ffe0" : "transparent" }}>
              <td>{i + 1}</td>
              <td>{user.name}</td>
              <td>{user.unit}</td>
              <td>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
