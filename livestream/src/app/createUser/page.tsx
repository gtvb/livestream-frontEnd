"use client";
import { useCallback } from 'react';
import styles from './register.module.css';

const SignUp = () => {
  
  const onJPossuoUmaClick = useCallback(() => {
    // Adicione a lógica para "Já possuo uma conta"
  }, []);
  
  return (
    <div className={styles.signUp}>
      <div className={styles.image}></div>
      <div className={styles.frameParent}>
        <div className={styles.boldDuotoneFacesEmotionsParent}>
          <img className={styles.boldDuotoneFacesEmotions} alt="" src="../../../publics/assets/Sticker Smile Circle.svg" />
          <h2 className={styles.crieSuaConta}>Crie sua conta no livestream</h2>
          <p className={styles.entreComSeu}>Entre com seu nome, email e senha e aproveite o máximo que uma plataforma de lives pode oferecer!</p>
        </div>
        <div className={styles.frameGroup}>
          <div className={styles.usurioParent}>
            <label className={styles.usurio}>Usuário</label>
            <div className={styles.userParent}>
              <img className={styles.userIcon} alt="" src="../../../publics/User.svg" />
              <input className={styles.digiteSeuNome} placeholder="Digite seu nome de usuário" />
            </div>
          </div>
          <div className={styles.usurioParent}>
            <label className={styles.usurio}>Email</label>
            <div className={styles.userParent}>
              <img className={styles.userIcon} alt="" src="../../../publics/assets/Envelope.svg" />
              <input className={styles.digiteSeuNome} placeholder="Digite seu melhor email" />
            </div>
          </div>
          <div className={styles.usurioParent}>
            <label className={styles.usurio}>Senha</label>
            <div className={styles.userParent}>
              <img className={styles.userIcon} alt="" src="../../../publics/Key.svg" />
              <input className={styles.digiteSeuNome} type="password" placeholder="Digite sua senha mais segura" />
            </div>
          </div>
          <div className={styles.usurioParent}>
            <label className={styles.usurio}>Confirme sua senha</label>
            <div className={styles.userParent}>
              <img className={styles.userIcon} alt="" src="../../../publics/assets/ShieldCheck.svg" />
              <input className={styles.digiteSeuNome} type="password" placeholder="Digite sua senha novamente" />
            </div>
          </div>
        </div>
        <div className={styles.criarContaWrapper}>
          <b className={styles.digiteSeuNome}>Criar conta</b>
        </div>
        <b className={styles.jPossuoUma} onClick={onJPossuoUmaClick}>Já possuo uma conta</b>
      </div>
    </div>
  );
};

export default SignUp;
