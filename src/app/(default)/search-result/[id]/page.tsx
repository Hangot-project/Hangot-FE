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
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroHeader}>
            <div className={styles.titleSection}>
              <div className={styles.titleRow}>
                <h1 className={styles.title}>{datasetDetail.title}</h1>
                {datasetDetail.type && <DatasetTypeIcon type={datasetDetail.type} />}
              </div>
              <p className={styles.description}>{datasetDetail.description}</p>
            </div>
            <div className={styles.actionSection}>
              <div className={styles.keywordSection}>
                <h3 className={styles.keywordTitle}>키워드</h3>
                <div className={styles.keywordTags}>
                  {datasetDetail.theme.map((keyword, index) => (
                    <span key={index} className={styles.keywordTag}>
                      {keyword}
                    </span>
                  ))}
                </div>
                <div className={styles.metaInfo}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>조회수</span>
                    <span className={styles.metaValue}>
                      {datasetDetail.view?.toLocaleString() || 0}
                    </span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>스크랩</span>
                    <span className={styles.metaValue}>
                      {datasetDetail.scrap?.toLocaleString() || 0}
                    </span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>파일 형식</span>
                    <span className={styles.metaValue}>
                      {datasetDetail.type?.toUpperCase() || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.scrapSection}>
                <ScrapButton datasetId={datasetId} scrap={datasetDetail.scrap} />
              </div>
            </div>
          </div>
          <div className={styles.ctaSection}>
            <a className={styles.downloadBtn} href={datasetDetail.resourceUrl}>
              <span className={styles.downloadIcon}>📥</span>
              데이터 다운로드
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className={styles.mainContent}>
        {/* Left Column - Dataset Information */}
        <div className={styles.leftColumn}>
          <div className={styles.contentSection}>
            <h2 className={styles.sectionTitle}>데이터 정보</h2>

            <div className={styles.compactInfoGrid}>
              <div className={styles.infoGroup}>
                <h3 className={styles.infoGroupTitle}>📅 공개 정보</h3>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>공개일자</span>
                  <span className={styles.infoValue}>
                    {datasetDetail.createdDate}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>최신수정일자</span>
                  <span className={styles.infoValue}>
                    {datasetDetail.updateDate || datasetDetail.createdDate}
                  </span>
                </div>
              </div>

              <div className={styles.infoGroup}>
                <h3 className={styles.infoGroupTitle}>🏢 제공 기관</h3>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>기관명</span>
                  <span className={styles.infoValue}>
                    {datasetDetail.organization}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>키워드</span>
                  <span className={styles.infoValue}>
                    {datasetDetail.theme.join(", ")}
                  </span>
                </div>
              </div>

              <div className={styles.infoGroup}>
                <h3 className={styles.infoGroupTitle}>⚖️ 라이선스</h3>
                <div className={styles.licenseInfo}>
                  <span className={styles.infoValue}>{datasetDetail.license}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Data Preview */}
        <div className={styles.rightColumn}>
          <div className={styles.contentSection}>
            <div className={styles.sheetHeader}>
              <h2 className={styles.sectionTitle}>데이터 미리보기</h2>
              <div className={styles.sheetBadge}>SHEET</div>
            </div>

            <div className={styles.previewContainer}>
              {datasetExtension === "pdf" ? (
                <div className={styles.pdfViewer}>
                  <embed
                    src={`${datasetDetail.resourceUrl}`}
                    type="application/pdf"
                    className={styles.pdfEmbed}
                  />
                </div>
              ) : (
                <div className={styles.dataViewer}>
                  <DatasetViewer
                    datasetId={datasetDetail.datasetId}
                    axisResult={axisResult}
                    title={datasetDetail.title}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
