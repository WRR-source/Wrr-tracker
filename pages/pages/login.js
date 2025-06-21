import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [unit, setUnit] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.unit === unit);
    if (!user) {
      alert("User not found. Please sign up.");
      return;
    }
    localStorage.setItem("loggedInUser", unit);
    router.push("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Enter your unit number"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
