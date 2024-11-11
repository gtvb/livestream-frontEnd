import { auth, signOut } from "@/auth"
import { fetchLivestreams } from "@/src/app/lib/actions"
import Link from "next/link"
import Slider from "../ui/slider"
import styles from "./index.module.css"

export default async function Dashboard() {
    const session = await auth()
    const livestreams = await fetchLivestreams()

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h2 className={styles.title}>Bem-vindo ao seu Dashboard</h2>
                <form action={async () => {
                    "use server"
                    await signOut({ redirectTo: "/login" });
                }}>
                    <button className={styles.signOutButton}>Sair</button>
                </form>
            </div>

            <div className={styles.content}>
                <Link href={"/profile"} className={styles.link}>
                    Acessar Perfil
                </Link>

                <div className={styles.sliderContainer}>
                    <h3 className={styles.sliderTitle}>Suas Lives</h3>
                    <Slider livestreams={livestreams} />
                </div>
            </div>
        </div>
    )
}
