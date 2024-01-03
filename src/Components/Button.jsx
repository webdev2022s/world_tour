import styles from "./Button.module.css";
export default function Button({
  label = "click",
  clickFunction,
  type,
  children,
}) {
  return (
    <>
      <button
        onClick={clickFunction}
        className={`${styles.btn} ${styles[type]}`}
      >
        {children}
        {label}
      </button>
    </>
  );
}
