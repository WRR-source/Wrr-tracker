import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    router.push("/login");
  };

  return (
    <nav style={{
      backgroundColor: "#e5f5e0",
      padding: "10px 20px",
      marginBottom: 30,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: "sans-serif"
    }}>
      <div style={{ fontWeight: "bold", fontSize: "20px" }}>♻️ WRR Tracker</div>
      <div style={{ display: "flex", gap: "15px" }}>
        <button onClick={() => router.push("/")} style={btn}>Dashboard</button>
        <button onClick={() => router.push("/rewards")} style={btn}>Rewards</button>
        <button onClick={() => router.push("/leaderboard")} style={btn}>Leaderboard</button>
        <button onClick={handleLogout} style={{ ...btn, backgroundColor: "tomato" }}>Logout</button>
      </div>
    </nav>
  );
}

const btn = {
  padding: "6px 12px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: 4,
  cursor: "pointer"
};
