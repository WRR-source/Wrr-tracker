import { useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !unit || !password) {
      setError("All fields are required.");
      return;
    }

    const newUser = {
      name,
      unit,
      password,
      isAdmin,
      points: 0,
    };

    const existingUsers =
      JSON.parse(localStorage.getItem("users")) || [];

    if (existingUsers.find((u) => u.unit === unit)) {
      setError("A user with this unit number already exists.");
      return;
    }

    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    localStorage.setItem("loggedUser", JSON.stringify(newUser));

    router.push("/");
  };

  return (
    <>
      <NavBar />
      <div style={{ padding: 20 }}>
        <h2>Sign Up</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          /><br /><br />

          <input
            type="text"
            placeholder="Unit Number"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            required
          /><br /><br />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br /><br />

          <label>
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            Register as Admin
          </label><br /><br />

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
}
