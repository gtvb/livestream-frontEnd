import styles from './index.module.css';

const Page = () => {
  	return (
    		<div className={styles.page1}>
      			<div className={styles.telalogin} />
      			<div className={styles.password}>
        				<p className={styles.password1}>PASSWORD</p>
      			</div>
      			<div className={styles.passwordrec} />
      			<div className={styles.usernamerec} />
      			<div className={styles.login}>LOGIN</div>
      			<div className={styles.createUser}>CREATE USER</div>
      			<img className={styles.selolivestreamIcon} alt="" src="./seloLivestream.png" />
      			<div className={styles.username}>USERNAME</div>
    		</div>);
};

export default Page;
