import { auth } from "@/auth";
import { Session } from "next-auth";
import { liveStreamsArraySchema, userSchema } from "../lib/zod";

export default async function Page() {
    const session = await auth() as Session;

    const userResponse = await fetch(`http://localhost:3333/user/${session.user?.id}`);
    const userData = await userResponse.json();
    const userProfile = await userSchema.parseAsync(userData["user"]);

    const streamResponse = await fetch(`http://localhost:3333/livestreams/${session.user?.id}`);
    const streamData = await streamResponse.json();
    const streams = streamData["livestreams"] === null ? [] : await liveStreamsArraySchema.parseAsync(streamData["livestreams"]);

    return (
        <div>
            <p>Id: {userProfile.id}</p>
            <p>Username: {userProfile.username}</p>
            <p>Email: {userProfile.email}</p>
            <p>Created At: {userProfile.created_at.toLocaleDateString()}</p>
            <p>Updated At: {userProfile.updated_at.toLocaleDateString()}</p>

            <h1>Streams</h1>
            <ul>
                {streams.map((stream) => (
                    <>
                        <img src={stream.thumbnail} alt={stream.name} style={{ width: '100%' }} />
                        <li key={stream.id}>
                            <p>Id: {stream.id}</p>
                            <p>Name: {stream.name}</p>
                            <p>Stream Key: {stream.stream_key}</p>
                            <p>Viewer Count: {stream.viewer_count}</p>
                            <p>Status: {stream.live_stream_status ? "On" : "Off"}</p>
                            <a href={`/live/manage/${stream.id}`}>Manage</a>
                        </li>
                    </>
                ))}
            </ul>
        </div>
    )
}