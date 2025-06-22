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
    } else {
      router.push("/login");
    }
  }, []);

  const handleSubmit = () => {
    if (!user) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updated = users.map((u) =>
      u.unit === user.unit
        ? {
            ...u,
            points: u.points + plastic + cans + glass,
          }
        : u
    );

    localStorage.setItem("users", JSON.stringify(updated));
    localStorage.setItem(
      "loggedUser",
      JSON.stringify({
        ...user,
        points: user.points + plastic + cans + glass,
      })
    );

    setUser((prev) => ({
      ...prev,
      points: prev.points + plastic + cans + glass,
    }));

    setPlastic(0);
    setCans(0);
    setGlass(0);

    alert("Recycling submitted successfully!");
  };

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <NavBar />
      <div style={{ padding: 20, fontFamily: "sans-serif" }}>
        <h1>Welcome, {user.name} (Unit {user.unit})</h1>
        <p>Points: {user.points}</p>

        <div style={{ marginTop: 20 }}>
          <h2>Add Recycled Items</h2>

          <label>
            Plastic Bottles 🧴:
            <input
              type="number"
              value={plastic}
              onChange={(e) => setPlastic(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Cans 🥫:
            <input
              type="number"
              value={cans}
              onChange={(e) => setCans(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Glass Bottles 🍾:
            <input
              type="number"
              value={glass}
              onChange={(e) => setGlass(Number(e.target.value))}
            />
          </label>
          <br />
          <button
            style={{ marginTop: 10, padding: "5px 10px" }}
            onClick={handleSubmit}
          >
            Submit Recycling
          </button>
        </div>
      </div>
    </>
  );
}
