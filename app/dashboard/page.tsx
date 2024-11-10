import { fetchLivestreams } from "@/app/lib/actions";
import Slider from "../ui/slider";
import { auth, signOut } from "@/auth";
import Link from "next/link";

export default async function Dashboard() {
    const session = await auth();
    const livestreams = await fetchLivestreams()

    return (
        <div>
            {JSON.stringify(session)}
            <form action={async () => {
                "use server"
                await signOut({redirectTo: "/login"});
            }}>
                <button>Sign out</button>
            </form>

            <Link href={"/profile"}>Go to profile</Link>
            <Slider livestreams={livestreams}></Slider>
        </div>
    );
}