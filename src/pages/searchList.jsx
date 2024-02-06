import Head from "next/head";
import Image from "next/image";
import styles from "../styles/searchList.module.css";
import { Layout, SearchBox } from "../components";
import { DataType, DataOrganization } from "../../public/svgs";
import { DataBoxDummy } from "../dummy-data/searchResult";
import Link from "next/link";

export default function searchList( {listDataDummy} ) {
  return (
    <Layout>
      <Head>
        <title>데이터 찾기</title>
      </Head>
      <section>
        <div className={styles.main}>
          <SearchBox />
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const listDataDummy = DataBoxDummy;

  return {
    props: { listDataDummy },
  };
};