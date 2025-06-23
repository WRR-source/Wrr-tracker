import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";
export default function Rewards() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const rewards = [
    { name: "🎁 $5 Gift Card", cost: 150 },
    { name: "📱 Phone Charger", cost: 350 },
    { name: "🎧 Bluetooth Speaker", cost: 550 },
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
  <>
    <NavBar />
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Rewards for {user.name}</h1>
      <p>
        You have <strong>{user.points} points</strong>
      </p>
    </div>
  </>
);
