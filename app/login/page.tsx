"use client"

import Link from 'next/link'
import styles from './login.module.css';
import { login } from '@/lib/actions';
import { useFormState, useFormStatus } from 'react-dom';

const initialState = {
  message: '',
}

export default function Login() {
  const [state, formAction] = useFormState(login, initialState)
  const { pending } = useFormStatus()

  return (
    <div className={styles.loginPage}>
      <form className={styles.leftPanel} action={formAction}
      >
        <div className={styles.welcomeHeader}>
          <img className={styles.welcomeIcon} alt="Confetti Icon" src="/assets/images/confetti.svg" />
          <h1>Seja bem-vindo de volta!</h1>
        </div>

        <p className={styles.loginSubtitle}>
          Faça o login na nossa plataforma e aproveite o melhor da criação de conteúdo!
        </p>

        <div className={styles.fieldContainer}>
          <label className={styles.fieldLabel} htmlFor="email">Email</label>
          <div className={styles.inputWrapper}>
            <img className={styles.iconImage} alt="User Icon" src="/assets/images/user.png" />
            <input
              className={styles.input}
              id="email"
              type="text"
              name="email"
              placeholder="Digite seu email de usuário"
            />
          </div>
        </div>

        <div className={styles.fieldContainer}>
          <div className={styles.passwordLabelWrapper}>
            <label className={styles.fieldLabel} htmlFor="password">Senha</label>
          </div>
          <div className={styles.inputWrapper}>
            <img className={styles.iconImage} alt="Password Icon" src="/assets/images/key.png" />
            <input
              className={styles.input}
              id="password"
              type="password"
              name="password"
              placeholder="Digite sua senha"
            />
          </div>
        </div>

        <p aria-live="polite" style={{color: "red"}}>{state?.message}</p>
        <button className={styles.loginButton} disabled={pending} type="submit">{pending ? "Carregando..." : "Entrar"}</button>

        <div className={styles.centeredLink}>
          <Link href="/signup" passHref>
            <div className={styles.centeredTextLink}>Ainda não possuo uma conta</div>
          </Link>
        </div>
      </form>

      <div className={styles.rightPanel}>
      </div>
    </div>
  );
};