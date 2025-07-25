import styles from "../../styles/layout.module.css";
import "../../styles/globals.css";
import Providers from "../../components/providers/providers";
import { Suspense } from "react";
import { Loading } from "../../components";
import { Header } from "../../page-src/layout/header/header";
import { Footer } from "../../page-src/layout/footer/footer";

export const metadata = {
  title: "한 곳 - 모든 공공데이터를 한 곳에",
  description:
    "한국의 모든 공공데이터를 한 곳에서 쉽게 찾고 활용하세요. 정부, 지자체의 다양한 데이터셋을 검색하고 분석할 수 있습니다.",
  keywords:
    "공공데이터, 오픈데이터, 정부데이터, 지자체데이터, 데이터포털, 빅데이터, 통계, 공공정보",
  robots: "index, follow",
  authors: [{ name: "한 곳 팀" }],
  icons: {
    icon: "/images/favicon.png",
  },
};

export const viewport = "width=device-width, initial-scale=1";

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
