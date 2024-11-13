import { fetchLivestreams } from "@/src/app/lib/actions";
import styles from "./index.module.css";
import LivestreamNavigator from "../ui/slider";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Dashboard() {
    const session = await auth()
    const livestreams = await fetchLivestreams();

    if (!session) {
        redirect("/login")
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.feedNav}>
                <div className={styles.feedNavSection}>
                    <div className={styles.navGreeting}>
                        <p>
                            { /* @ts-ignore */ }
                            Olá, <Link href={`/profile`}>{session.user["username"]}</Link>
                        </p>
                    </div>
                    <div className={styles.navActions}>
                        <Link href={"/dashboard"} className={"nav-btn"}>Seguindo</Link>
                        <Link href={"/dashboard"} className={"nav-btn"}>Explorar</Link>
                    </div>
                    <div className={styles.navCreate}>
                        <Link href={"/live/create"} className={"btn"} style={{borderRadius: "8px"}}>Criar Live</Link>
                    </div>
                </div>
            </div>
            <LivestreamNavigator livestreams={livestreams} />
        </div>
    );
}