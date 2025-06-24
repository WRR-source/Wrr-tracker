import dynamic from "next/dynamic";

function TestRewardsPage() {
  let storedUser = null;

  if (typeof window !== "undefined") {
    storedUser = localStorage.getItem("loggedUser");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Rewards Test Page</h2>
      <p><strong>Raw stored value:</strong></p>
      <pre>{storedUser || "Nothing in localStorage"}</pre>
    </div>
  );
}

export default dynamic(() => Promise.resolve(TestRewardsPage), {
  ssr: false,
});
