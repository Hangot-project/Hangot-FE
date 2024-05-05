import { Header, Footer } from "../components";
import styles from "../styles/layout.module.css";
import "../styles/globals.css";
import Providers from "../components/providers/providers";
import { Suspense } from "react";
import Loading from "./loading";

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
              <div className="layoutPadding">{children}</div>
            </div>
            <Footer />
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
