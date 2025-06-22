import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";
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
      const sorted = [...allUsers].sort((a, b) => b.points - a.points);
      setUsers(sorted);
    }
  }, []);

  if (!currentUser) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
    <NavBar />
      <h1>🏆 Leaderboard</h1>
      <p>Logged in as: <strong>{currentUser.name}</strong> (Unit {currentUser.unit})</p>

      <table style={{ marginTop: 20, width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Unit</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user.unit} style={{ backgroundColor: i === 0 ? "#d4f7d4" : "transparent" }}>
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
