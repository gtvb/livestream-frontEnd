import styles from './index.module.css';


const Page = () => {
  	return (
    		<div className={styles.page2}>
      			<div className={styles.telacreate} />
      			<div className={styles.email}>EMAIL</div>
      			<div className={styles.password2}>
        				<p className={styles.password}>PASSWORD</p>
      			</div>
      			<div className={styles.passwordrec} />
      			<div className={styles.emailrec} />
      			<div className={styles.password1}>
        				<p className={styles.password}>PASSWORD</p>
      			</div>
      			<div className={styles.password2rec} />
      			<div className={styles.usernamerec} />
      			<div className={styles.createUser}>CREATE USER</div>
      			<div className={styles.username}>USERNAME</div>
    		</div>);
};

export default Page;
