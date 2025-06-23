import { useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";

export default function Signup() {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const router = useRouter();

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((user) => user.unit === unit);

    if (existingUser) {
      alert("User with this unit already exists.");
      return;
    }

    const newUser = { name, unit, points: 0 };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    router.push("/rewards");
  };

  return (
    <>
      <NavBar />
      <div style={{ padding: 20, fontFamily: "sans-serif" }}>
        <h1>Sign Up</h1>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ display: "block", marginBottom: 10 }}
        />
        <input
          type="text"
          placeholder="Unit Number"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          style={{ display: "block", marginBottom: 10 }}
        />
        <button onClick={handleSignup}>Sign Up</button>
      </div>
    </>
  );
}
