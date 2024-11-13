import { liveStreamSchema } from "@/src/app/lib/zod"
import Player from "@/src/app/ui/player"
import Link from "next/link"
import styles from "./index.module.css"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id

  const response = await fetch(`http://localhost:3333/livestreams/info/${id}`)
  const data = await response.json()
  const livestream = await liveStreamSchema.parseAsync(data["livestream"])

  return (
    <div className={styles.liveContainer}>
      <h2 className={styles.liveTitle}>{livestream.name}</h2>
      <div className={styles.playerContainer}>
        <Player
          autoplay={true}
          techOrder={["html5"]}
          controls={false}
          sources={[
            { src: `http://localhost:8000/hls/${livestream.id}.m3u8`, type: "application/x-mpegURL" },
          ]}
        />
      </div>
      <Link href={"/dashboard"}>
        <button className={styles.backButton}>Voltar ao Dashboard</button>
      </Link>
    </div>
  )
}
