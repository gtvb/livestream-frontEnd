import { signOut } from "@/auth";

const App = () => {
  return (
    <div>
      <button onClick={async () => {
        "use server"
        await signOut()
      }}>Logout</button>
    </div>
  );
}

export default App;