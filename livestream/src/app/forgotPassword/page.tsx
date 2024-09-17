"use client"; // Adicione esta linha

import type { NextPage } from 'next';
import Link from 'next/link'; // Importa o Link
import { useState } from 'react';
import styles from './forgotPassword.module.css';

const ForgotPasswordPage: NextPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePasswordReset = async () => {
    if (!email) {
      setError('E-mail é obrigatório');
      return;
    }

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccess('Instruções de recuperação enviadas para o e-mail.');
      } else {
        setError('Falha ao enviar instruções.');
      }
    } catch (error) {
      setError('Erro ao tentar recuperar a senha.');
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2 className={styles.title}>Problemas para efetuar login?</h2>

        <div className={styles.inputField}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
            className={styles.input}
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        <button className={styles.resetButton} onClick={handlePasswordReset}>
          Recuperar senha
        </button>

        <div className={styles.backToLogin}>
          {/* Link para a página de login */}
          <Link href="/login" legacyBehavior>
            <a>Voltar para login</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
