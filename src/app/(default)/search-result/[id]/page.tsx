import { getDatasetDetail } from "../../../../api/dataset/getDatasetDetail";
import { DatasetTypeIcon, DatasetViewer, ScrapButton } from "../../../../components";
import { dataset as _dataset } from "../../../../dummy-data/datasets";
import styles from "./detail.module.css";

// export async function generateStaticParams() {
//   const datasets = await getAllDatasets();

//   return datasets.map((dataset) => ({
//     id: dataset.datasetId.toString(),
//   }));
// }

export default async function Page({ params }: { params: { id: string } }) {
  const datasetId = parseInt(params.id);
  const datasetDetail = await getDatasetDetail(datasetId);
  // TODO: 데이터셋 시각화 api 연결
  const dataset = { ..._dataset };

  return (
    <div className={styles.root}>
      {/* //? 기본 정보 표시 */}
      <div className={`noLayoutPadding ${styles.mainInfoContainer}`}>
        <div className={styles.basicInfoContainer}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>{datasetDetail.title}</h1>
            <DatasetTypeIcon type="XLSX" />
          </div>
          <ScrapButton datasetId={datasetId} scrap={datasetDetail.scrap} />
        </div>

        <p className={styles.description}>{datasetDetail.description}</p>
        <a className={styles.downloadBtn} href={datasetDetail.resourceUrl}>
          데이터 다운로드
        </a>
      </div>

      {/* //? 데이터 정보 표시 */}
      <h2
        style={{
          marginTop: "3.75rem",
        }}
        className={styles.subtitle}
      >
        데이터 정보
      </h2>

      <table
        style={{
          marginTop: "1.125rem",
        }}
        className={styles.table}
      >
        <colgroup>
          <col width={"10%"} />
          <col width={"40%"} />
          <col width={"10%"} />
          <col width={"40%"} />
        </colgroup>
        {/* 1번 행 */}
        <tr>
          <th>공개일자</th>
          <td>{datasetDetail.createdDate}</td>
          <th>최신수정일자</th>
          <td>
            {datasetDetail.updateDate
              ? datasetDetail.updateDate
              : datasetDetail.createdDate}
          </td>
        </tr>
        {/* 2번 행 */}
        <tr>
          <th>주제</th>
          <td>{datasetDetail.theme.join(", ")}</td>
          <th>제공기관</th>
          <td>{datasetDetail.organization}</td>
        </tr>
        {/* 3번 행 */}
        <tr>
          <th>원본형태</th>
          <td>DB</td>
          <th>제3제작권자</th>
          <td>없음</td>
        </tr>
        {/* 4번 행 */}
        <tr>
          <th>라이선스</th>
          <td colSpan={3}>
            저작권자표시(BY) : 이용이나 변경 및 2차적 저작물의 작성을 포함한
            자유이용을 허락합니다.
          </td>
        </tr>
      </table>

      {/* //? 시트 영역 */}
      <h2
        style={{
          marginTop: "5rem",
        }}
        className={styles.sheetTitle}
      >
        SHEET
      </h2>

      <div className={styles.divisionLine} />
      {dataset && datasetDetail && (
        <DatasetViewer
          title={datasetDetail.title}
          dataset={dataset}
          style={{
            marginTop: "3rem",
          }}
        />
      )}
    </div>
  );
}
