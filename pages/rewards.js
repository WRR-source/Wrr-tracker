import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Rewards() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unit = localStorage.getItem("loggedInUser");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const current = users.find((u) => u.unit === unit);
    if (!current) {
      router.push("/login");
    } else {
      setUser(current);
    }
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Rewards for {user.name}</h1>
      <p>You have <strong>{user.points} points</strong></p>

      <div style={{ marginTop: 30 }}>
        <h2>Available Rewards</h2>
        <ul>
          <li>🎁 $5 Gift Card – <strong>150 pts</strong></li>
          <li>📱 Phone Charger – <strong>500 pts</strong></li>
          <li>🎧 Bluetooth Speaker – <strong>1000 pts</strong></li>
          <li>🎉 Mystery Grand Prize – <strong>Top Recycler Only</strong></li>
        </ul>
        <p style={{ marginTop: 20 }}>Keep recycling to unlock more!</p>
      </div>
    </div>
  );
}
