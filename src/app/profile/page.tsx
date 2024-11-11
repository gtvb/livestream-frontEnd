import { auth } from "@/auth"
import { Session } from "next-auth"
import { liveStreamsArraySchema, userSchema } from "../lib/zod"
import styles from "./index.module.css"

export default async function Page() {
    const session = await auth() as Session

    const userResponse = await fetch(`http://localhost:3333/user/${session.user?.id}`)
    const userData = await userResponse.json()
    const userProfile = await userSchema.parseAsync(userData["user"])

    const streamResponse = await fetch(`http://localhost:3333/livestreams/${session.user?.id}`)
    const streamData = await streamResponse.json()
    const streams = streamData["livestreams"] === null ? [] : await liveStreamsArraySchema.parseAsync(streamData["livestreams"])

    return (
        <div className={styles.profileContainer}>
            <div className={styles.userInfo}>
                <h2 className={styles.sectionTitle}>Perfil do Usuário</h2>
                <p><strong>Id:</strong> {userProfile.id}</p>
                <p><strong>Username:</strong> {userProfile.username}</p>
                <p><strong>Email:</strong> {userProfile.email}</p>
                <p><strong>Criado em:</strong> {userProfile.created_at.toLocaleDateString()}</p>
                <p><strong>Atualizado em:</strong> {userProfile.updated_at.toLocaleDateString()}</p>
            </div>

            <div className={styles.streamSection}>
                <h2 className={styles.sectionTitle}>Transmissões</h2>
                <ul className={styles.streamList}>
                    {streams.map((stream) => (
                        <li key={stream.id} className={styles.streamItem}>
                            <img src={stream.thumbnail} alt={stream.name} className={styles.thumbnail} />
                            <div className={styles.streamInfo}>
                                <p><strong>Id:</strong> {stream.id}</p>
                                <p><strong>Nome:</strong> {stream.name}</p>
                                <p><strong>Stream Key:</strong> {stream.stream_key}</p>
                                <p><strong>Contagem de Visualizações:</strong> {stream.viewer_count}</p>
                                <p><strong>Status:</strong> {stream.live_stream_status ? "On" : "Off"}</p>
                                <a href={`/live/manage/${stream.id}`} className={styles.manageLink}>Gerenciar</a>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
