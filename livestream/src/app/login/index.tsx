import type { NextPage } from 'next';
import styles from './index.module.css';


const Page:NextPage = () => {
  	return (
    		<div className={styles.page1}>
      			<div className={styles.telalogin} />
      			<div className={styles.passwordrec} />
      			<div className={styles.entrarEmLivestream}>Entrar em Livestream</div>
      			<div className={styles.senha}>Senha</div>
      			<div className={styles.passwordrec1} />
      			<div className={styles.usernamerec} />
      			<div className={styles.aindaNoPossui}>Ainda não possui uma conta? Cadastrar-se</div>
        				<div className={styles.problemasParaEfetuar}>Problemas para efetuar login?</div>
          					<div className={styles.usurio}>Usuário</div>
          					<div className={styles.entrar}>Entrar</div>
          					<img className={styles.fire1Icon} alt="" src="fire 1.svg" />
          					</div>);
        				};
        				
        				export default Page;
        				