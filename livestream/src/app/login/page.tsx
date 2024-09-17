"use client"; // Adicione esta linha

import type { NextPage } from 'next';
import Link from 'next/link'; // Importa o componente Link para navegação
import { useState } from 'react';
import styles from './index.module.css';

const Page: NextPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Usuário e senha são obrigatórios');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert('Login realizado com sucesso!');
      } else {
        setError('Credenciais inválidas');
      }
    } catch (error) {
      setError('Erro ao efetuar login');
    }
  };

  return (
    <div className={styles.page1}>
      <div className={styles.telalogin}>
        <div className={styles.entrarEmLivestream}>
          <img className={styles.fire1Icon} alt="" src="icon.svg" />
          Entrar em Livestream
        </div>

        <input
          className={styles.inputField}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuário"
        />

        <input
          className={styles.inputField}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />

        {error && <div className={styles.error}>{error}</div>}

        <button className={styles.entrar} onClick={handleLogin}>
          Entrar
        </button>

        {/* Link para a página de problemas para login */}
        <Link href="/forgotPassword" passHref>
          <div className={styles.problemasParaEfetuar}>
            Problemas para efetuar login?
          </div>
        </Link>

        {/* Link para a página de cadastro */}
        <Link href="/createUser" passHref>
          <div className={styles.aindaNoPossui}>
            Ainda não possui uma conta? Cadastrar-se
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Page;
