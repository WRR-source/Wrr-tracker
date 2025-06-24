import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";

function RewardsPage() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [debugMessage, setDebugMessage] = useState("Loading...");

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("loggedUser");

      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUser(parsed);
          setDebugMessage(`User found: ${parsed.name}`);
        } catch (err) {
          console.error("Error parsing user:", err);
          setDebugMessage("Error parsing user");
          router.replace("/signup");
        }
      } else {
        setDebugMessage("No user in localStorage");
        router.replace("/signup");
      }

      setReady(true);
    }
  }, []);

  if (!ready) return <p>Still checking...</p>;

  return (
    <>
      <NavBar />
      <div style={{ padding: 20 }}>
        <h2>Rewards Center</h2>
        <p style={{ color: "gray" }}>{debugMessage}</p>
        {user ? (
          <>
            <p>
              Welcome, {user.name}! You have <strong>{user.points}</strong> points.
            </p>
            <ul>
              <li>🎁 $5 Gift Card – 50 points</li>
              <li>📱 Recycled Phone Case – 150 points</li>
              <li>🎧 Bluetooth Earbuds – 300 points</li>
              <li>🎉 Mystery Grand Prize – ??? points</li>
            </ul>
          </>
        ) : (
          <p>Redirecting to sign up...</p>
        )}
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(RewardsPage), {
  ssr: false,
});
