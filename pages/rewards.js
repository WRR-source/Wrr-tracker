import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";

export default function Rewards() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false); // prevents early redirect

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("loggedUser");
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        router.replace("/signup");
      }
      setReady(true);
    }
  }, []);

  if (!ready) return null; // wait for auth check before rendering

  return (
    <>
      <NavBar />
      <div style={{ padding: 20 }}>
        <h2>Rewards Center</h2>
        <p>
          Welcome, {user?.name || "Guest"}! You have <strong>{user?.points || 0}</strong> points.
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
