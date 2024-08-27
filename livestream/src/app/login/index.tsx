"use client";

import React, { useState } from "react";
import styles from './index.module.css';

const Page: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Lógica de autenticação aqui
    console.log({ email, password });
  };

  return (
    <div className={styles.page1}>
      <div className={styles.telalogin}>
        <form onSubmit={handleSubmit}>
          <div className={styles.username}>
            <label>USERNAME:</label>
          </div>
          <div className={styles.usernamerec}>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.password}>
            <p className={styles.password1}>PASSWORD</p>
          </div>
          <div className={styles.passwordrec}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.login}>
            LOGIN
          </button>
        </form>
      </div>
      <div className={styles.createUser}>CREATE USER</div>
      <img className={styles.selolivestreamIcon} alt="" src="./seloLivestream.png" />
    </div>
  );
};

export default Page;