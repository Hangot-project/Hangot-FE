"use client";

import { Header, Footer } from "../components";
import styles from "../styles/layout.module.css";
import "../styles/globals.css";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";

const metadata = {
  title: "한양대학교 데이터 포털",
};

export default function Layout({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <html lang="ko">
      <body>
        <div className={styles.container}>
          <Header />
          <Provider store={storeRef.current}>
            <div className={styles.content}>{children}</div>
          </Provider>
          <Footer />
        </div>
      </body>
    </html>
  );
}
