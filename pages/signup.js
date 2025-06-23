import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";

export default function Rewards() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      router.push("/signup");
    } else {
      setUser(currentUser);
    }
  }, []);

  if (!user) return null;

  return (
    <>
      <NavBar />
      <div style={{ padding: 20, fontFamily: "sans-serif" }}>
        <h1>Rewards for {user.name}</h1>
        <p>
          You have <strong>{user.points} points</strong>
        </p>
      </div>
    </>
  );
}
