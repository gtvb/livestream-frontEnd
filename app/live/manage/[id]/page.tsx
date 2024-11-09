import { liveStreamSchema } from "@/app/lib/zod";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import  ToggleButton  from "./toggleButton";
import Player from "@/app/ui/player";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session) {
        redirect("/login");
    }

    const id = (await params).id;
    const response = await fetch(`http://localhost:3333/livestreams/info/${id}`);
    const data = await response.json();

    const livestream = await liveStreamSchema.parseAsync(data["livestream"]);
    if (livestream.publisher_id !== session.user?.id) {
        redirect("/dashboard");
    }

    return (
        <div>
            <p>Id: {livestream.id}</p>
            <p>Name: {livestream.name}</p>
            <p>Stream Key: {livestream.stream_key}</p>
            <p>Status: {livestream.live_stream_status ? "On" : "Off"}</p>

            <ToggleButton serverAction={async () => {
                "use server"
                await fetch(`http://localhost:3333/livestreams/update/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ live_stream_status: !livestream.live_stream_status }),
                });
            }} status={livestream.live_stream_status} />

            {livestream.live_stream_status ? (
                <Player techOrder={["html5"]} autoplay={true} controls={true} sources={[{ src: `http://localhost:8000/hls/${livestream.id}.m3u8`, type: "application/x-mpegURL" }]} />
            ) : (
                <p>No video. Start a stream on OBS to get some video and start the stream</p>
            )}
        </div>
    );
}