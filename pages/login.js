import { useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";

export default function Login() {
  const router = useRouter();
  const [unit, setUnit] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const match = users.find(
      (u) => u.unit === unit && u.password === password
    );

    if (match) {
      localStorage.setItem("loggedUser", JSON.stringify(match));
      router.push("/");
    } else {
      setError("User not found. Please check unit number and password.");
    }
  };

  return (
    <>
      <NavBar />
      <div style={{ padding: 20 }}>
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleLogin}>
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

          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
