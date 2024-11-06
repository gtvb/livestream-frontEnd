import { auth, signOut } from "@/auth";

export default async function Dashboard() {
    const session = await auth()
    return (
        <div>

            <form action={async () => {
                "use server"
                await signOut()
            }}>
                <button>Sign out</button>
            </form>

            <p>{JSON.stringify(session)}</p>
        </div>
    );
}