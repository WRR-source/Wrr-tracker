import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("loggedUser");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch (e) {
          console.error("Error parsing user:", e);
        }
      }
    }
  }, []);

  return (
    <nav style={styles.nav}>
      <div>
        <Link href="/" style={styles.link}>Home</Link>
        {user && <Link href="/rewards" style={styles.link}>Rewards</Link>}
        {user && <Link href="/leaderboard" style={styles.link}>Leaderboard</Link>}
      </div>
      <div>
        {!user ? (
          <>
            <Link href="/signup" style={styles.link}>Sign Up</Link>
            <Link href="/login" style={styles.link}>Login</Link>
          </>
        ) : (
          <button onClick={() => {
            localStorage.removeItem("loggedUser");
            window.location.href = "/login";
          }} style={styles.link}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: "#e0e4dd",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "2px solid #c5c7c1",
    marginBottom: "20px"
  },
  link: {
    marginRight: 15,
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold",
    cursor: "pointer"
  }
};
