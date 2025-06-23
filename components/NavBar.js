import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function NavBar() {
  const router = useRouter();
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    setLoggedUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    router.push("/login");
  };

  const isActive = (path) => router.pathname === path;

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>♻ WRR Tracker</div>
      <div style={styles.links}>
        <NavLink href="/" label="Home" active={isActive("/")} />
        <NavLink href="/rewards" label="Rewards" active={isActive("/rewards")} />
        <NavLink href="/leaderboard" label="Leaderboard" active={isActive("/leaderboard")} />
        {!loggedUser && (
          <>
            <NavLink href="/signup" label="Sign Up" active={isActive("/signup")} />
            <NavLink href="/login" label="Login" active={isActive("/login")} />
          </>
        )}
        {loggedUser && (
          <>
            <span style={styles.welcome}>Hi, {loggedUser.name}</span>
            <button onClick={handleLogout} style={styles.logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

function NavLink({ href, label, active }) {
  return (
    <Link href={href}>
      <span style={{ ...styles.link, ...(active ? styles.activeLink : {}) }}>
        {label}
      </span>
    </Link>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#e0f2e9", // light earth tone green
    padding: "10px 20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontWeight: "bold",
    fontSize: "18px",
  },
  links: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  link: {
    cursor: "pointer",
    textDecoration: "none",
    color: "#444",
    fontWeight: 500,
  },
  activeLink: {
    color: "#0f5132",
    textDecoration: "underline",
  },
  welcome: {
    fontStyle: "italic",
    color: "#2e7d32",
  },
  logout: {
    padding: "4px 10px",
    border: "none",
    backgroundColor: "#d32f2f",
    color: "#fff",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
