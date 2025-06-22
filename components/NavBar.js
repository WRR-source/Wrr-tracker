import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function NavBar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Safely read from localStorage on client-side only
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("loggedUser");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    router.push("/login");
  };

  return (
    <nav
      style={{
        backgroundColor: "#e5f5e0",
        padding: "10px 20px",
        marginBottom: 30,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: 20 }}>WRR Tracker</div>
      <div style={{ display: "flex", gap: "15px" }}>
        <button onClick={() => router.push("/")}>Home</button>
        <button onClick={() => router.push("/rewards")}>Rewards</button>
        <button onClick={() => router.push("/leaderboard")}>Leaderboard</button>
        {user?.isAdmin && (
          <Link href="/admin">
            <button>Admin</button>
          </Link>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
