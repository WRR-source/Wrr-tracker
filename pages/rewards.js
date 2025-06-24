import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

function RewardsPage() {
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Ensure this runs only on the client side
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("loggedUser");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error("Failed to parse loggedUser:", error);
        }
      }
      setHydrated(true); // Mark as ready to render
    }
  }, []);

  if (!hydrated) {
    return <p>Loading rewards...</p>; // Prevents early rendering
  }

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
