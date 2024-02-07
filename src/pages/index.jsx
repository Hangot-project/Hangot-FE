import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Layout, ListBoard, MainServiceCard } from "../components";
import {
  ServiceAI,
  ServiceDaily,
  ServiceLife,
  ServicePopluar,
  ServiceTop,
} from "../../public/svgs";
import { currentOpenDataDummy } from "../dummy-data/main-datas";

const MAIN_SERVICES = [
  {
    src: ServiceAI,
    title: "AI학습데이터",
    subtitle: "인공지능 학습데이터로 제작한 공공데이터를 제공합니다.",
  },
  {
    src: ServiceLife,
    title: "학교 생활이동",
    subtitle: "학교 안 또는 밖으로 오고 간 모든 생활이동 정보를 제공합니다.",
  },
  {
    src: ServiceDaily,
    title: "한양인의 하루",
    subtitle: "숫자로 읽어보는 한양인의 하루는 어떨까요?",
  },
  {
    src: ServicePopluar,
    title: "한양대의 인기통계",
    subtitle: "인기통계와 최신통계를 제일 먼저 확인해 보세요.",
  },
  {
    src: ServiceTop,
    title: "한양대의 100대 통계",
    subtitle: "100 가지 주제로 한양대를 알려드립니다.",
  },
];

export default function Home({ listDataDummy }) {
  return (
    <Layout>
      <Head>
        <title>HYU Data Portal with CKAN</title>
      </Head>
      <main className={styles.main}>
        {/* //* section1 - 검색 */}

        {/* //* section2 - 데이터 정보 및 배너 */}

        {/* //* section3 - 유형별 데이터 목록 */}
        <section>
          <div className={styles.listboardGrid}>
            {/* //? 유형 1 */}
            <ListBoard
              title="새로 개방한 데이터"
              dataList={listDataDummy}
              // TODO: url 변경
              url={"search-result"}
            />

            {/* //? 유형 2 */}
            <ListBoard
              title="데이터 소식"
              dataList={listDataDummy}
              // TODO: url 변경
              url={"search-result"}
            />

            {/* //? 유형 3 */}
            <ListBoard
              title="통계분석"
              dataList={listDataDummy}
              // TODO: url 변경
              url={"search-result"}
            />
          </div>
        </section>

        {/* //* section4 - 주요 서비스 */}
        <section style={{ marginTop: "1.5rem" }}>
          <h1 className={styles.serviceTitle}>주요 서비스</h1>
          <div className={styles.serviceGrid}>
            {MAIN_SERVICES.map((service) => (
              <MainServiceCard
                image={service.src}
                title={service.title}
                subtitle={service.subtitle}
              />
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}

// ! 메인 페이지는 유형별 데이터 리스트에 의존성을 가짐 - section3 (유형별 데이터 리스트)
// ? -> 따라서 NextJS가 메인 페이지를 Pre-Rendering 하기 전에, 'listData(Dummy)를 먼저 fetch 해야함'을 알려준다.
export const getStaticProps = async () => {
  const listDataDummy = currentOpenDataDummy;

  return {
    props: { listDataDummy },
  };
};
