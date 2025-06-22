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
    const storedUser = localStorage.getItem("loggedUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    router.push("/login");
  };

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <NavBar />
      <div>Welcome, {user.name} (Unit {user.unit})</div>
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
