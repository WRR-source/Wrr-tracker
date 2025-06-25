import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";

export default function Rewards() {
  const [user, setUser] = useState(undefined); // undefined = still loading
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("loggedUser");

      if (data) {
        setUser(JSON.parse(data)); // ✅ User found
      } else {
        setUser(null); // ❌ No user found
      }
    }
  }, []);

  useEffect(() => {
    if (user === null) {
      router.push("/signup"); // 🔁 Redirect AFTER we know for sure
    }
  }, [user]);

  if (user === undefined) {
    return <div>Loading user info...</div>; // ⏳ Initial load
  }

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
