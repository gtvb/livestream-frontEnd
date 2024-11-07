import { signOut } from "@/auth";
import { fetchLivestreams } from "@/app/lib/actions";
import Slider from "../ui/slider";

export default async function Dashboard() {
    const livestreams = await fetchLivestreams()

    return (
        <div>
            <form action={async () => {
                "use server"
                await signOut({redirectTo: "/login"})
            }}>
                <button>Sign out</button>
            </form>

            <Slider livestreams={livestreams}></Slider>
        </div>
    );
}