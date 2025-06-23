import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";

export default function Rewards() {
  const [user, setUser] = useState(null);
  const [checkedAuth, setCheckedAuth] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("loggedUser");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        router.replace("/signup");
      }
      setCheckedAuth(true); // finish checking
    }
  }, []);

  // wait until auth is checked before rendering anything
  if (!checkedAuth) return null;

  return (
    <>
      <NavBar />
      <div style={{ padding: 20 }}>
        <h2>Rewards Center</h2>
        <p>
          Welcome, {user?.name}! You have <strong>{user?.points}</strong> points.
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
