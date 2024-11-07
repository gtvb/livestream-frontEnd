import { liveStreamSchema } from "@/app/lib/zod"
import Player from "@/app/ui/player"

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
    <div>
      <p>Live</p>
      <Player
        autoplay={true}
        techOrder={["html5"]}
        controls={true}
        sources={
          [{ src: `http://localhost:8000/hls/${livestream.id}.m3u8`, type: "application/x-mpegURL" }]
        }
      />
    </div>
  )
}