"use client"

import { createLiveStream } from "@/src/app/lib/actions"
import { useFormState } from "react-dom"
import styles from "./index.module.css"

const initialState = {
    message: ""
}

export default function Page() {
    const [state, formAction] = useFormState(createLiveStream, initialState)

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.titleSection}>
                    <h2 className={styles.title}>Criar uma nova Live</h2>
                    <p className={styles.subtitle}>Compartilhe conteúdo em tempo real com seus seguidores</p>
                </div>

                <form action={formAction} className={styles.form}>
                    <div className={styles.inputContainer}>
                        <label className={styles.label} htmlFor="name">Nome da LiveStream</label>
                        <input 
                            id="name" 
                            name="name" 
                            placeholder="Digite o nome da sua LiveStream" 
                            className={styles.inputField} 
                        />
                    </div>

                    <div className={styles.inputContainer}>
                        <label className={styles.label} htmlFor="thumbnail">Thumbnail da Live</label>
                        <input 
                            id="thumbnail" 
                            type="file" 
                            name="thumbnail" 
                            accept="image/*" 
                            className={styles.fileInput} 
                        />
                    </div>

                    <p aria-live="polite" className={styles.message}>{state?.message}</p>

                    <button type="submit" className={styles.submitButton}>Criar</button>
                </form>
            </div>
        </div>
    )
}
