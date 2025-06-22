// trigger redeploy
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";
export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [plastic, setPlastic] = useState(0);
  const [cans, setCans] = useState(0);
  const [glass, setGlass] = useState(0);

  useEffect(() => {
    const unit = localStorage.getItem("loggedInUser");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const current = users.find((u) => u.unit === unit);
    if (!current) {
      router.push("/login");
    } else {
      setUser(current);
    }
  }, []);

  const addPoints = () => {
    const total = plastic + cans + glass;
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updated = users.map((u) =>
      u.unit === user.unit ? { ...u, points: u.points + total } : u
    );
    localStorage.setItem("users", JSON.stringify(updated));
    setUser((prev) => ({ ...prev, points: prev.points + total }));
    setPlastic(0);
    setCans(0);
    setGlass(0);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    router.push("/login");
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
    <NavBar />
      <h1>Welcome, {user.name} (Unit {user.unit})</h1>

      <div style={{ marginTop: 20 }}>
        <h2>Add Recycled Items</h2>
        <label>
          Plastic Bottles 🥤:
          <input type="number" value={plastic} onChange={(e) => setPlastic(Number(e.target.value))} />
        </label>
        <br />
        <label>
          Cans 🥫:
          <input type="number" value={cans} onChange={(e) => setCans(Number(e.target.value))} />
        </label>
        <br />
        <label>
          Glass Bottles 🍾:
          <input type="number" value={glass} onChange={(e) => setGlass(Number(e.target.value))} />
        </label>
        <br />
        <button onClick={addPoints}>Add to Total</button>
      </div>

      <div style={{ marginTop: 20 }}>
        <h2>Your Points</h2>
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>{user.points} pts</p>
      </div>

      <button onClick={handleLogout} style={{ marginTop: 20, color: "red" }}>Logout</button>
    </div>
  );
}
