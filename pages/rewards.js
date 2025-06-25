import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";

export default function Rewards() {
  const [user, setUser] = useState(undefined); // start as undefined
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedUser");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null); // now we know there's no user
    }
  }, []);

  useEffect(() => {
    if (user === null) {
      router.push("/signup");
    }
  }, [user]);

  if (user === undefined) {
    return <div>Loading user info...</div>; // loading first time
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
