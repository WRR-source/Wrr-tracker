import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";

export default function Rewards() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("loggedUser");
      console.log("Stored user raw:", storedUser);

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          console.log("Parsed user object:", parsedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error("Error parsing stored user:", error);
        }
      } else {
        console.warn("No user found, redirecting...");
        router.replace("/signup");
      }

      setLoading(false);
    }
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <NavBar />
      <div style={{ padding: 20 }}>
        <h2>Rewards Center</h2>
        <p>
          Welcome, {user?.name || "Guest"}! You have{" "}
          <strong>{user?.points ?? 0}</strong> points.
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
