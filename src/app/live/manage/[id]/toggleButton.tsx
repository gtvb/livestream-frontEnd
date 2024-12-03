"use client"

import { useRouter } from "next/navigation";


export default function ToggleButton({ serverAction, status }: { serverAction: () => void; status: boolean}) {
    const router = useRouter()

    return (
        <button className={"btn"} style={{borderRadius: "8px", margin: "5px"}} onClick={() => {
            serverAction();
        }}>
            {status ? "Stop" : "Start"}
        </button>
    );
}