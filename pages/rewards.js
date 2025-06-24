import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";

function RewardsPage() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = typeof window !== "undefined" && localStorage.getItem("loggedUser");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error("Failed to parse user:", err);
        router.replace("/signup");
      }
    } else {
      router.replace("/signup");
    }

    setReady(true);
  }, []);

  if (!ready) return null;

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
          <li>🎁 $5 Gift Card – 50 points</li>
          <li>📱 Recycled Phone Case – 150 points</li>
          <li>🎧 Bluetooth Earbuds – 300 points</li>
          <li>🎉 Mystery Grand Prize – ??? points</li>
        </ul>
      </div>
    </>
  );
}

// This makes sure the page runs **only on the client**
export default dynamic(() => Promise.resolve(RewardsPage), {
  ssr: false,
});
