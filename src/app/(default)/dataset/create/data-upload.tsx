"use client";

import {
  FormEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./data-upload.module.css";
import { useSession } from "next-auth/react";
import { getRole } from "../../../../utils/jwt/get-role";
import { useRouter } from "next/navigation";
import { DATA_TYPES } from "../../../../constants";
import styled from "@emotion/styled";
import { createDataset } from "../../../../shared/api/dataset/createDataset";
import { SearchModal } from "../../../../page-src/dataset/create/search-modal";
import { getOrganizations } from "../../../../shared/api/category/getOrganizations";

const FileAccept = DATA_TYPES.map((value) => `.${value}`).join(", ");

interface Props {
  themeList: string[];
  licenseList: string[];
  organizationList: string[];
}

export default function DataUpload({
  themeList,
  licenseList,
  organizationList,
}: Props) {
  const { data: session } = useSession();

  const router = useRouter();

  //? 제목
  const [title, setTitle] = useState<string>("");
  //? 상세내용
  const [description, setDescription] = useState<string>("");
  //? 주제
  const themeSelectorRef = useRef<HTMLSelectElement[]>([]);
  const [themeSelectorCount, setThemeSelectorCount] = useState<number>(1);
  //? 기관
  const [organization, setOrganization] = useState<string>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>();
  const [organizationResult, setOrganizationResult] =
    useState<string[]>(organizationList);
  //? 라이센스
  const [license, setLicense] = useState<string>(null);
  //? 파일
  const [file, setFile] = useState<File>(null);
  const fileRef = useRef<HTMLInputElement>();

  const handleAddTheme = useCallback(() => {
    if (themeSelectorCount >= themeList.length) {
      alert(`주제는 최대 ${themeList.length}개까지 추가할 수 있습니다.`);
      return;
    }
    setThemeSelectorCount((prev) => prev + 1);
  }, [themeSelectorCount]);

  const handleDeleteTheme = useCallback(() => {
    themeSelectorRef.current.pop();
    setThemeSelectorCount((prev) => prev - 1);
  }, [themeSelectorCount]);

  const handleOrganizationClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(true);
  }, []);

  const handleSearchSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const result = await getOrganizations(keyword);
      if (result !== null) {
        setOrganizationResult(result);
      }
    },
    [keyword],
  );

  const handleLabelClick = useCallback((value: string) => {
    setOrganization(value);
    setIsOpen(false);
  }, []);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!title) {
      alert(`제목을 작성해주세요.`);
      return;
    }

    if (!description) {
      alert(`설명을 작성해주세요.`);
      return;
    }

    if (!organization) {
      alert(`제공 기관을 입력해주세요.`);
      return;
    }

    if (!license) {
      alert(`라이선스를 선택해주세요.`);
      return;
    }

    if (!file) {
      alert(`파일이 입력되지 않았습니다.`);
      return;
    }

    const selectedThemeList = themeSelectorRef.current
      .filter((el) => el.value)
      .map((el) => el.value);

    if (selectedThemeList.length === 0) {
      const submit = confirm(
        `주제가 선택되지 않았습니다.\n이대로 제출하시겠습니까?`,
      );
      if (!submit) return;
    }

    const response = await createDataset({
      grantType: session.user.grantType,
      token: session.user.accessToken,
      body: {
        title,
        description,
        organization,
        license,
        theme: selectedThemeList,
      },
      file,
    });

    if (response.ok) {
      alert(`등록되었습니다.`);
      router.push("/search-result");
    }

    alert(`죄송합니다, 오류가 발생하여 등록에 실패했습니다. 다시 시도해주세요.`);
  };

  const handleCancel = useCallback(() => {
    const close = confirm(
      `작성을 취소하시겠습니까?\n현재까지 작성한 내용은 저장되지 않습니다.`,
    );
    if (close) router.back();
  }, []);

  useEffect(() => {
    if (!(session && getRole(session.user.accessToken) === "ROLE_ADMIN")) {
      alert(`잘못된 접근입니다.`);
      router.push("/");
    }
  }, []);

  return (
    <section className={styles.Container}>
      <div className={styles.main}>
        <header className={styles.header}>
          <h2>공공데이터 등록</h2>
        </header>

        {/* 공공데이터 등록 양식 */}
        <form>
          <div className={styles.body}>
            <div className={styles.contentHeader}>공공데이터 정보</div>
            <div className={styles.content}>
              <div className={styles.rowTable}>
                <table>
                  <tbody>
                    {/* 공공데이터 명 */}
                    <tr>
                      <th scope="row">
                        <label
                          htmlFor="inputDataName"
                          className={`${styles.required} ${styles.label}`}
                        >
                          공공데이터 명
                        </label>
                      </th>
                      <td>
                        <div className={styles.inputType}>
                          <input
                            type="text"
                            title="공공데이터 명칭 입력"
                            placeholder="공공데이터의 명칭을 구체적으로 명시하여 기재합니다."
                            id="inputDataName"
                            className={styles.inputText}
                            maxLength={100}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>
                      </td>
                    </tr>

                    {/* 공공데이터 상세 내용 */}
                    <tr>
                      <th scope="row">
                        <label
                          htmlFor="inputDetail"
                          className={`${styles.required} ${styles.label}`}
                        >
                          공공데이터 세부 내용
                        </label>
                      </th>
                      <td>
                        <textarea
                          title="공공데이터 상세 내용 입력"
                          placeholder="공공데이터의 구체적인 내용을 상세하게 기재해주시기 바랍니다."
                          id="inputDetail"
                          className={`${styles.inputTextArea}`}
                          maxLength={4000}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className={styles.charCount}>
                          {description.length} / 4000
                        </div>
                      </td>
                    </tr>

                    {/* 공공데이터 주제 */}
                    <tr>
                      <th scope="row">
                        <label
                          htmlFor="inputDataTitle"
                          className={`${styles.required} ${styles.label}`}
                        >
                          공공데이터 주제
                        </label>
                      </th>
                      <td>
                        <ThemeSelectContainer>
                          <div>
                            {new Array(themeSelectorCount)
                              .fill(0)
                              .map((_, index) => (
                                <select
                                  key={index}
                                  ref={(el) => {
                                    themeSelectorRef.current[index] = el;
                                  }}
                                  id="inputDataTitle"
                                  title="주제"
                                  className={styles.selection}
                                  style={{
                                    marginTop: index === 0 ? 0 : "1rem",
                                  }}
                                >
                                  <option label="선택해주세요" value={null} />
                                  {themeList?.map((theme) => (
                                    <option value={theme}>{theme}</option>
                                  ))}
                                </select>
                              ))}
                          </div>
                          <div
                            id="insttSearchBtn"
                            className={`${styles.button} ${styles.white} ${styles.insttSearchBtn}`}
                            style={{ marginLeft: "1rem" }}
                            onClick={handleAddTheme}
                          >
                            주제 추가
                          </div>
                          {themeSelectorCount > 1 && (
                            <div
                              id="insttSearchBtn"
                              className={`${styles.button} ${styles.white} ${styles.insttSearchBtn}`}
                              style={{ marginLeft: "1rem" }}
                              onClick={handleDeleteTheme}
                            >
                              주제 삭제
                            </div>
                          )}
                        </ThemeSelectContainer>
                      </td>
                    </tr>

                    {/* 공공데이터 제공 기관 */}
                    <tr>
                      <th scope="row">
                        <label
                          htmlFor="inputInsttName"
                          className={`${styles.required} ${styles.label}`}
                        >
                          공공데이터 제공 기관
                        </label>
                      </th>
                      <td>
                        <div
                          className={`${styles.inputType} ${styles.inputInsttName}`}
                        >
                          <input
                            type="text"
                            title="기관명 입력"
                            value={organization}
                            defaultValue={"기관 검색 버튼을 클릭해주세요."}
                            disabled
                            id="inputInsttName"
                            className={`${styles.inputText}`}
                          />
                        </div>
                        <button
                          id="insttSearchBtn"
                          className={`${styles.button} ${styles.white} ${styles.insttSearchBtn}`}
                          onClick={(e) => handleOrganizationClick(e)}
                        >
                          기관검색
                        </button>
                      </td>
                    </tr>

                    {/* 공공데이터 라이선스 */}
                    <tr>
                      <th scope="row">
                        <label
                          htmlFor="inputLicense"
                          className={`${styles.required} ${styles.label}`}
                        >
                          라이선스
                        </label>
                      </th>
                      <td>
                        <select
                          id="inputLicense"
                          title="라이선스"
                          className={styles.selection}
                          onChange={(e) => setLicense(e.target.value)}
                        >
                          <option label="선택해주세요" value={null} />
                          {licenseList?.map((license) => (
                            <option value={license}>{license}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 공공데이터 파일 등록 */}
            <div className={styles.contentHeader}>공공데이터 파일 등록</div>
            <div className={styles.content}>
              <div className={styles.rowTable}>
                <table>
                  <colgroup>
                    <col></col>
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <label
                          htmlFor="inputFile"
                          className={`${styles.required} ${styles.label}`}
                        >
                          공공데이터 파일
                        </label>
                      </th>
                      <td>
                        <div>
                          <input
                            type="file"
                            ref={fileRef}
                            accept={FileAccept}
                            id="inputFile"
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                          <button
                            type="button"
                            onClick={() => fileRef.current.click()}
                            className={`${styles.button} ${styles.white} ${styles.insttSearchBtn}`}
                            style={{ marginLeft: 0 }}
                          >
                            파일 찾기
                          </button>
                          {file && (
                            <div className={styles.fileContainer}>
                              <button onClick={() => setFile(null)}>x</button>
                              <span className={styles.fileName}>{file.name}</span>
                            </div>
                          )}
                          <FileAcceptText>
                            <AcceptList>{FileAccept}</AcceptList> 형식의 파일만
                            지원합니다.
                          </FileAcceptText>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.requestBtn}>
              <button
                type="button"
                id="cancelBtn"
                className={`${styles.button} ${styles.gray}`}
                onClick={handleCancel}
              >
                취소
              </button>
              <button
                type="submit"
                id="saveBtn"
                className={`${styles.button} ${styles.blue}`}
                onClick={(e) => handleSubmit(e)}
              >
                등록
              </button>
            </div>
          </div>
        </form>
      </div>

      {isOpen && (
        <ModalContainer>
          <SearchModal title="기관 검색" onClose={() => setIsOpen(false)}>
            <Row onSubmit={(e) => handleSearchSubmit(e)}>
              <ModalInput
                type="text"
                placeholder="기관명을 입력하세요."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button type="submit">검색</Button>
            </Row>
            {organizationResult.map((value) => (
              <>
                <OrganizationLabel onClick={() => handleLabelClick(value)}>
                  {value}
                </OrganizationLabel>
                <Division />
              </>
            ))}
          </SearchModal>
        </ModalContainer>
      )}
    </section>
  );
}

const ThemeSelectContainer = styled.div`
  display: flex;
`;

const FileAcceptText = styled.p`
  margin-top: 1rem;
`;

const AcceptList = styled.span`
  color: red;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
`;

const Row = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 1rem;
`;

const ModalInput = styled.input`
  width: 65%;
  padding: 1rem;
  color: #263747;
  background-color: #fbfbfd;
  border: #e6eef5 solid 2px;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 30%;
  padding: 1rem;
  background-color: #0078ff;
  color: white;
  border-radius: 5px;
`;

const OrganizationLabel = styled.div`
  cursor: pointer;
  padding: 1.5rem 0;
`;

const Division = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d8d8d8;
`;
