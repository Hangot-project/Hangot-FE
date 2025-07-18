import { DatasetTypeIcon, DatasetViewer, ScrapButton } from "../../../../components";
import { getDatasetAxis } from "../../../../shared/api/dataset-visual/getDatasetAxis";
import { getDatasetDetail } from "../../../../shared/api/dataset/getDatasetDetail";
import styles from "./detail.module.css";

export default async function Page({ params }: { params: { id: string } }) {
  const datasetId = parseInt(params.id);
  const datasetDetail = await getDatasetDetail(datasetId);
  const axisResult = await getDatasetAxis(datasetId);

  const datasetExtension = datasetDetail.type;

  return (
    <div className={styles.root}>
      <header className={styles.heroSection}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{datasetDetail.title}</h1>
          {datasetDetail.type && <DatasetTypeIcon type={datasetDetail.type} />}
        </div>
        
        <p className={styles.description}>{datasetDetail.description}</p>
        
        <div className={styles.metaSection}>
          <div className={styles.leftMeta}>
            <div className={styles.keywordTags}>
              {datasetDetail.theme.map((keyword, index) => (
                <span key={index} className={styles.keywordTag}>
                  {keyword}
                </span>
              ))}
            </div>
            <div className={styles.stats}>
              <span>조회수 {datasetDetail.view?.toLocaleString() || 0}</span>
              <span>스크랩 {datasetDetail.scrap?.toLocaleString() || 0}</span>
              <span>{datasetDetail.type?.toUpperCase()}</span>
            </div>
          </div>
          <div className={styles.actions}>
            <ScrapButton datasetId={datasetId} scrap={datasetDetail.scrap} />
            <a className={styles.downloadBtn} href={datasetDetail.resourceUrl}>
              데이터 다운로드
            </a>
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>
        <section className={styles.infoSection}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span>공개일자</span>
              <span>{datasetDetail.createdDate}</span>
            </div>
            <div className={styles.infoItem}>
              <span>수정일자</span>
              <span>{datasetDetail.updateDate || datasetDetail.createdDate}</span>
            </div>
            <div className={styles.infoItem}>
              <span>기관명</span>
              <span>{datasetDetail.organization}</span>
            </div>
            <div className={styles.infoItem}>
              <span>라이센스</span>
              <span>{datasetDetail.license}</span>
            </div>
            <div className={styles.infoItem}>
              <span>제공사이트</span>
              <span>{datasetDetail.source}</span>
            </div>
            <div className={styles.infoItem}>
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
        </section>

        <section className={styles.previewSection}>
          <div className={styles.previewHeader}>
            <span className={styles.badge}>SHEET</span>
          </div>
          <div className={styles.previewContent}>
            {datasetExtension === "pdf" ? (
              <embed
                src={datasetDetail.resourceUrl}
                type="application/pdf"
                className={styles.pdfEmbed}
              />
            ) : (
              <DatasetViewer
                datasetId={datasetDetail.datasetId}
                axisResult={axisResult}
                title={datasetDetail.title}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
