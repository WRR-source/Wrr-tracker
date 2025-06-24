import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

function RewardsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("loggedUser");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUser(parsed);
        } catch (e) {
          console.error("Failed to parse user:", e);
        }
      }
      setLoading(false);
    }
  }, []);

  if (loading) return <p>Loading rewards...</p>;

  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Rewards</h2>
        <p style={{ color: "red" }}>Please sign up or log in to view rewards.</p>
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
          <li>🎁 $5 Gift Card – 150 points</li>
          <li>📱 Recycled Phone Case – 350 points</li>
          <li>🎧 Bluetooth Earbuds – 550 points</li>
          <li>🎉 Mystery Grand Prize – ??? points</li>
        </ul>
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(RewardsPage), { ssr: false });
