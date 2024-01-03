import styles from "./Message.module.css";
export default function Message({ children }) {
  return (
    <>
      <p className={styles.message}>
        <span role="img">⚠️</span>
        {children}
      </p>
    </>
  );
}
