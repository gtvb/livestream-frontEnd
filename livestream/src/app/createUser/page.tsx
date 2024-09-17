"use client"; // Adicione esta linha

import type { NextPage } from 'next';
import Link from 'next/link'; // Importa o Link
import { useState } from 'react';
import styles from './register.module.css';

const RegisterPage: NextPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
      } else {
        setError('Erro ao cadastrar');
      }
    } catch (error) {
      setError('Erro ao processar o cadastro');
    }
  };

  return (
    <div className={styles.page1}>
      <div className={styles.telalogin}>
        <div className={styles.cadastrarUsuario}>Cadastrar Usuário</div>

        <input
          className={styles.inputField}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuário"
        />

        <input
          className={styles.inputField}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          className={styles.inputField}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />

        <input
          className={styles.inputField}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmar Senha"
        />

        {error && <div className={styles.error}>{error}</div>}

        <button className={styles.cadastrar} onClick={handleRegister}>
          Cadastrar
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

export default RegisterPage;
