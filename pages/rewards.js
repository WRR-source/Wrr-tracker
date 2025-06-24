import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";

export default function Rewards() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("loggedUser");

      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          setUser(parsed);
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      } else {
        router.replace("/signup");
      }

      setLoading(false);
    }
  }, []);

  if (loading) return null;

  return (
    <>
      <NavBar />
      <div style={{ padding: 20 }}>
        <h2>Rewards Center</h2>
        <p>
          Welcome, {user?.name || "Guest"}! You have <strong>{user?.points || 0}</strong> points.
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
