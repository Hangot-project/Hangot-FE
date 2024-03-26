import { Header, Footer } from "../components";
import styles from "../styles/layout.module.css";
import "../styles/globals.css";
import ReduxProvider from "@/lib/provider";

export const metadata = {
  title: "한양대학교 데이터 포털",
};

export default function Layout({ children }) {
  return (
    <html lang="ko">
      <body>
        <div className={styles.container}>
          <Header />
          <div className={styles.content}>
            <ReduxProvider>{children}</ReduxProvider>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
