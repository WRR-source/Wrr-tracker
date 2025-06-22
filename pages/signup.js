import { useState } from "react";
import { useRouter } from "next/router";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSignup = () => {
    if (!name || !unit) return alert("Please fill in both fields");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push({ name, unit, points: 0 });
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedUser", unit);
    router.push("/");
  };

    return (
  <div style={{ textAlign: "center", marginTop: 100 }}>
    <h1>Sign Up</h1>

    <input
      type="text"
      placeholder="Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />

    <input
      type="text"
      placeholder="Unit"
      value={unit}
      onChange={(e) => setUnit(e.target.value)}
    />

    <label style={{ display: "block", margin: "10px 0" }}>
      <input
        type="checkbox"
        checked={isAdmin}
        onChange={(e) => setIsAdmin(e.target.checked)}
      />
      Register as Admin
    </label>

    <button onClick={handleSignup}>Sign Up</button>
  </div>
);
