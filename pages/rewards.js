import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";

export default function Rewards() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem("loggedUser"));
    if (!loggedIn) {
      router.push("/signup");
    } else {
      setUser(loggedIn);
    }
  }, []);

  if (!user) return null; // Avoid showing content while redirecting

  return (
    <>
      <NavBar />
      <div style={{ padding: 20 }}>
        <h2>Rewards Center</h2>
        <p>Welcome, {user.name}! You have <strong>{user.points}</strong> points.</p>
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
