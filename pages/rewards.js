import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

function RewardsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("loggedUser");
      if (data) {
        try {
          const parsed = JSON.parse(data);
          setUser(parsed);
        } catch (e) {
          console.error("Error parsing user data:", e);
        }
      }
      setLoading(false);
    }
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Rewards</h2>
        <p style={{ color: "red" }}>No user found. Please sign up or log in.</p>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div style={{ padding: 20 }}>
        <h2>Rewards Center</h2>
        <p>
          Welcome, <strong>{user.name}</strong>! You have{" "}
          <strong>{user.points}</strong> points.
        </p>
        <ul>
          <li>🎁 $5 Gift Card – 50 points</li>
          <li>📱 Recycled Phone Case – 150 points</li>
          <li>🎧 Bluetooth Earbuds – 300 points</li>
          <li>🎉 Mystery Grand Prize – ??? points</li>
        </ul>
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(RewardsPage), { ssr: false });
