import { DatasetTypeIcon, DatasetViewer, ScrapButton } from "../../../../components";
import { getDatasetAxis } from "../../../../shared/api/dataset-visual/getDatasetAxis";
import { getDatasetDetail } from "../../../../shared/api/dataset/getDatasetDetail";
import styles from "./detail.module.css";

export default async function Page({ params }: { params: { id: string } }) {
  const datasetId = parseInt(params.id);
  const datasetDetail = await getDatasetDetail(datasetId);
  const axisResult = await getDatasetAxis(datasetId);

  return (
    <div className={styles.root}>
      <header className={styles.heroSection}>
        <div className={styles.titleSection}>
          <div className={styles.titleContent}>
            <h1 className={styles.title}>{datasetDetail.title}</h1>
            {datasetDetail.type && <DatasetTypeIcon type={datasetDetail.type} />}
          </div>
        </div>

        <div className={styles.descriptionSection}>
          <p className={styles.description}>{datasetDetail.description}</p>
        </div>

        <div className={styles.metaSection}>
          <div className={styles.keywordTags}>
            {datasetDetail.tag.map((keyword, index) => (
              <span key={index} className={styles.keywordTag}>
                {keyword}
              </span>
            ))}
          </div>
          <div className={styles.stats}>
            <span>조회수 {datasetDetail.view?.toLocaleString() || 0}</span>
            <div className={styles.scrapStats}>
              <span>스크랩 수 {datasetDetail.scrap?.toLocaleString() || 0}</span>
              <ScrapButton datasetId={datasetId} scrap={datasetDetail.scrap} />
            </div>
          </div>
        </div>

        <div className={styles.detailMetaSection}>
          <div className={styles.metaItem}>
            <span>공개일자</span>
            <span>{datasetDetail.createdDate}</span>
          </div>
          <div className={styles.metaItem}>
            <span>수정일자</span>
            <span>{datasetDetail.updateDate || datasetDetail.createdDate}</span>
          </div>
          <div className={styles.metaItem}>
            <span>제공기관</span>
            <span>{datasetDetail.organization}</span>
          </div>
          <div className={styles.metaItem}>
            <span>라이센스</span>
            <span>{datasetDetail.license}</span>
          </div>
          <div className={styles.metaItem}>
            <span>제공사이트</span>
            <span>{datasetDetail.source}</span>
          </div>
          <div className={styles.metaItem}>
            <span>출처</span>
            <a
              href={datasetDetail.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.infoLink}
            >
              사이트 바로가기
            </a>
          </div>
        </div>

        <div className={styles.downloadSection}>
          <span className={styles.fileName}>{datasetDetail.resourceName}</span>
          <a className={styles.downloadBtn} href={datasetDetail.resourceUrl}>
            ⬇
          </a>
        </div>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.previewSection}>
          <DatasetViewer
            datasetId={datasetDetail.datasetId}
            axisResult={axisResult}
            title={datasetDetail.title}
          />
        </section>
      </main>
    </div>
  );
}
