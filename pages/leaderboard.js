import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const sorted = storedUsers.sort((a, b) => b.points - a.points);
    setUsers(sorted);
  }, []);

  return (
    <>
      <NavBar />
      <div style={{ padding: 20, fontFamily: "sans-serif" }}>
        <h1>🏆 Leaderboard</h1>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {index + 1}. {user.name} (Unit {user.unit}) – {user.points} points
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
