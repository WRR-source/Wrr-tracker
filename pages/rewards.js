// FILE: /pages/rewards.js

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";

export default function Rewards() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (!storedUser) {
      router.push("/signup");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <NavBar />
      <div style={{ padding: 20 }}>
        <h1>Rewards</h1>
        <p>Welcome, {user.name}!</p>
        <p>You have {user.points} points.</p>
        <ul>
          <li>🎁 Gift Card - 100 points</li>
          <li>📱 Electronics - 500 points</li>
          <li>🎉 Surprise Grand Prize - 1000 points</li>
        </ul>
      </div>
    </>
  );
}
