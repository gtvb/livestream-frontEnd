"use client"

import { createLiveStream } from "@/app/lib/actions"
import { useFormState } from "react-dom"

const initialState = {
    message: ""
}

export default function Page() {
    const [state, formAction] = useFormState(createLiveStream, initialState)

    return (
        <div>
            <h2>Criar uma nova Live</h2>
            <form action={formAction}>
                <input name="name" placeholder="Nome da sua LiveStream" />

                <p aria-live="polite" style={{ color: "red" }}>{state?.message}</p>
                <button type="submit">Criar</button>
            </form>
        </div>
    )
}