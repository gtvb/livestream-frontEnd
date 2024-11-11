"use client"

import { useRouter } from "next/navigation";


export default function ToggleButton({ serverAction, status }: { serverAction: () => void; status: boolean}) {
    const router = useRouter()

    return (
        <button onClick={() => {
            serverAction();
        }}>
            {status ? "Stop" : "Start"}
        </button>
    );
}