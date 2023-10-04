import { Header } from "../header/header";
import styles from "./layout.module.css";
import { Footer } from "../footer/footer";

export function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
}
