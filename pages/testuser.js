import dynamic from "next/dynamic";

function TestUserPage() {
  let storedUser = null;

  if (typeof window !== "undefined") {
    storedUser = localStorage.getItem("loggedUser");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>TEST: Stored User Data</h2>
      <pre>{storedUser || "Nothing in localStorage"}</pre>
    </div>
  );
}

export default dynamic(() => Promise.resolve(TestUserPage), {
  ssr: false,
});
