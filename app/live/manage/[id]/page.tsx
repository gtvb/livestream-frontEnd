"use client"

import { setLive } from "@/app/lib/actions"
import { liveStreamSchema } from "@/app/lib/zod"
import Player from "@/app/ui/player"
import { useEffect, useState } from "react"

export default function Page({ params }: { params: { id: string } }) {
    const [isLive, setIsLive] = useState<boolean>(false)
    const [livestream, setLivestream] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        async function fetchLiveStream() {
            try {
                const response = await fetch(`http://localhost:3333/livestreams/info/${params.id}`)
                const data = await response.json()
                const parsedData = await liveStreamSchema.parseAsync(data["livestream"])
                setLivestream(parsedData)
            } catch (error) {
                console.error("Failed to fetch livestream data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchLiveStream()
    }, [params.id])

    if (loading) return <p>Loading...</p>
    if (!livestream) return <p>Failed to load livestream data</p>

    return (
        <div>
            <p>Live {params.id}</p>
            {livestream.live_stream_status ? (
                <Player
                    autoplay={true}
                    techOrder={["html5"]}
                    controls={true}
                    sources={[
                        { src: `http://localhost:8000/hls/${livestream.id}.m3u8`, type: "application/x-mpegURL" }
                    ]}
                />
            ) : (
                <p>Go live in OBS to watch the video!</p>
            )}

            <div>
                <p>Stream Name: {livestream.name}</p>
                <p>Stream status: {livestream.live_stream_status ? "On" : "Off"}</p>
                <p>Stream ID: {livestream.id}</p>
                <p>Stream Key: {livestream.stream_key}</p>
            </div>

            <button onClick={() => {
                setLive(livestream.id, !isLive)
                setIsLive(!isLive)
            }}>
                {isLive ? "End Live" : "Go live!"}
            </button>
        </div>
    )
}
