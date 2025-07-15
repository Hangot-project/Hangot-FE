import styles from "../../styles/layout.module.css";
import "../../styles/globals.css";
import Providers from "../../components/providers/providers";
import { Suspense } from "react";
import { Loading } from "../../components";
import { Header } from "../../page-src/layout/header/header";
import { Footer } from "../../page-src/layout/footer/footer";

export const metadata = {
  title: "한양대학교 데이터 포털",
};

export default function Layout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Suspense fallback={<Loading />}>
          <Providers>
            <div className={styles.container}>
              <Header />
              <div className={styles.child}>{children}</div>
              <Footer />
            </div>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
