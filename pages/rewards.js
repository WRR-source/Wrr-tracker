import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Rewards() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const rewards = [
    { name: "🎁 $5 Gift Card", cost: 50 },
    { name: "📱 Phone Charger", cost: 100 },
    { name: "🎧 Bluetooth Speaker", cost: 250 },
    { name: "🎉 Mystery Grand Prize", cost: 9999 }, // unreachable on purpose
  ];

  useEffect(() => {
    const unit = localStorage.getItem("loggedInUser");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const current = users.find((u) => u.unit === unit);
    if (!current) {
      router.push("/login");
    } else {
      setUser(current);
    }
  }, []);

  const handleRedeem = (reward) => {
    alert(`You redeemed: ${reward.name}`);
    // Future: actually deduct points and update user
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Rewards for {user.name}</h1>
      <p>You have <strong>{user.points} points</strong></p>

      <div style={{ marginTop: 30 }}>
        <h2>Available Rewards</h2>
        <ul>
          {rewards.map((reward, index) => (
            <li key={index} style={{ marginBottom: 10 }}>
              {reward.name} – <strong>{reward.cost === 9999 ? "Top Recycler Only" : `${reward.cost} pts`}</strong>
              {reward.cost !== 9999 && (
                <button
                  onClick={() => handleRedeem(reward)}
                  disabled={user.points < reward.cost}
                  style={{
                    marginLeft: 10,
                    padding: "4px 10px",
                    backgroundColor: user.points >= reward.cost ? "green" : "gray",
                    color: "white",
                    border: "none",
                    borderRadius: 4,
                    cursor: user.points >= reward.cost ? "pointer" : "not-allowed",
                  }}
                >
                  Redeem
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
