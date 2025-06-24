import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

function RewardsTest() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("loggedUser");
      if (data) {
        setUser(JSON.parse(data));
      }
    }
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>REWARDS TEST PAGE</h2>
      {user ? (
        <pre>{JSON.stringify(user, null, 2)}</pre>
      ) : (
        <p style={{ color: "red" }}>No user found in localStorage</p>
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(RewardsTest), { ssr: false });
