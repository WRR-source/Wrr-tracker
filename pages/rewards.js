import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import NavBar from "../components/NavBar";

function RewardsPage() {
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Run only on client
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("loggedUser");
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
        } catch (e) {
          console.error("Invalid JSON in localStorage");
        }
      }
      setHydrated(true);
    }
  }, []);

  if (!hydrated) return <p>Loading...</p>;

  if (!user) {
    return (
      <>
        <NavBar />
        <div style={{ padding: 20 }}>
          <h2>Rewards</h2>
          <p style={{ color: "red" }}>Please sign up or log in to view rewards.</p>
        </div>
      </>
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

// Dynamic export disables SSR for this page
export default dynamic(() => Promise.resolve(RewardsPage), { ssr: false });
