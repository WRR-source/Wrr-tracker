import { useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [plastic, setPlastic] = useState(0);
  const [cans, setCans] = useState(0);
  const [glass, setGlass] = useState(0);

  const handleLogin = () => {
    setUser({ name: "Demo User", unit: "101" });
  };

  const addPoints = () => {
    const total = plastic + cans + glass;
    setPoints(points + total);
    setPlastic(0);
    setCans(0);
    setGlass(0);
  };

  if (!user) {
    return (
      <div style={{ textAlign: "center", paddingTop: "100px" }}>
        <h1>WRR Tracker Login</h1>
        <button onClick={handleLogin}>Demo Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Welcome, {user.name}</h1>

      <div style={{ marginTop: "20px" }}>
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

      <div style={{ marginTop: "20px" }}>
        <h2>Your Points</h2>
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>{points} pts</p>
      </div>
    </div>
  );
}
