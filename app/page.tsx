"use client"

import { signOut } from "@/auth";

const App = () => {
  return (
    <div>
      <button onClick={async () => {
        await signOut()
      }}>Logout</button>
    </div>
  );
}

export default App;