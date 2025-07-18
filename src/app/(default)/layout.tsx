import styles from "../../styles/layout.module.css";
import "../../styles/globals.css";
import Providers from "../../components/providers/providers";
import { Suspense } from "react";
import { Loading } from "../../components";
import { Header } from "../../page-src/layout/header/header";
import { Footer } from "../../page-src/layout/footer/footer";

export const metadata = {
  title: "한 곳 - 모든 공공데이터를 한 곳에",
  icons: {
    icon: "/images/favicon.png",
  },
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
