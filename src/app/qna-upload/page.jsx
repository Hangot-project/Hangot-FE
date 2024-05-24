"use client"; //? client componet - NextJS 13

import { useState } from "react";
import styles from "./qna-upload.module.css";

export default function QNAUpload() {
  const [detailText, setDetailText] = useState('');
  const [file, setFile] = useState(null);
  
  const handleDetailChange = (event) => {
    setDetailText(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleFileButtonClick = () => {
    document.getElementById('inputFile').click();
  };

  const handleFileDelete = () => {
    setFile(null);
  };
      
  return (
    <section className={styles.Container}>
      <div className={styles.main}>
        <header className={styles.header}>
          <h2 className={styles.title}>Q&A</h2>
        </header>
        <div className={styles.body}>
          <div className={styles.contentHeader}>1:1 문의 내용</div>

          <form>
            <div className={styles.content}>
              <div className={styles.rowTable}>
                <table>
                  <colgroup>
                    <col />
                  </colgroup>
                  <tbody>
                    {/* 문의 유형 */}
                    <tr>
                      <th scope="row">
                        <label for="inputType" className={`${styles.required} ${styles.label}`}>문의 유형</label>
                      </th>
                      <td>
                        <select id="inputType" title="유형" className={styles.selection}>
                          <option value>선택해주세요</option>
                          <option value>계정 관리</option>
                          <option value>서비스 이용</option>
                          <option value>문제 해결</option>
                          <option value>데이터 라이선스</option>
                          <option value>기타</option>
                        </select>
                      </td>
                    </tr>

                    {/* 문의 제목 */}
                    <tr>
                      <th scope="row">
                        <label for="inputTitle" className={`${styles.required} ${styles.label}`}>제목</label>
                      </th>
                      <td>
                        <div className={styles.inputType}>
                          <input
                            type="text"
                            title="공공데이터 명칭 입력"
                            placeholder="50자 이내 입력 가능"
                            id="inputTitle"
                            className={styles.inputText}
                            maxLength={50} 
                          /> 
                        </div>
                      </td>
                    </tr>

                    {/* 문의 상세 내용 */}
                    <tr>
                      <th scope="row">
                        <label for="inputDetail" className={`${styles.required} ${styles.label}`}>세부 내용</label>
                      </th>
                      <td>
                        <textarea rows="5" cols="10"
                          title="공공데이터 활용 목적 상세 입력" 
                          placeholder="문의 내용을 상세히 적어주시기 바랍니다."
                          id="inputDetail"
                          className={`${styles.inputTextArea} ${styles.dataContPlaceholder}`}
                          style={{height: 160}}
                          maxLength={4000}
                          value={detailText}
                          onChange={handleDetailChange}
                        />
                        <div className={styles.charCount}>
                          {detailText.length} / 4000
                        </div>
                      </td>
                    </tr>

                    {/* 첨부 파일 */}
                    <tr>
                      <th scope="row">
                        <label for="inputFile" className={styles.label}>첨부 파일</label>
                      </th>
                      <td>  
                        <div className={styles.insttSearchList}>
                          <input
                            type="file"
                            id="inputFile"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                          />
                          <button 
                            type="button" 
                            onClick={handleFileButtonClick}
                            className={`${styles.button} ${styles.white} ${styles.insttSearchBtn}`}
                            style={{marginLeft: 0}}>
                            파일 찾기
                          </button>
                          {file && (
                            <div className={styles.fileContainer}>
                              <button onClick={handleFileDelete}>x</button>
                              <span className={styles.fileName}>{file.name}</span>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>

                    {/* 비공개 설정 여부 */}
                    <tr>
                      <th scope="row">
                        <label for="labelCheck" className={styles.label}>게시물 공개 여부</label>
                      </th>
                      <td>
                        <input type="checkbox" id="labelCheck" className={styles.checkBox} />
                        <label htmlFor="labelCheck" className={styles.checkboxLabel}>비공개 글로 설정</label> <br />
                        <span className={styles.smallText}>• 비공개 글로 설정 시 마이페이지에서 확인 가능합니다.</span>
                      </td>
                    </tr> 

                    {/* 이메일 알림 설정 */}
                    <tr>
                      <th scope="row">
                        <label for="labelEmail" className={styles.label}>이메일 주소</label>
                      </th>
                      <td>
                        <div className={styles.inputExText}>
                          <input 
                            id="labelEmail"
                            name="registerEmail"
                            title="이메일주소"
                            type="text"
                            className={`${styles.inputText} ${styles.inputDisabled}`}
                            value='dalnimjm@naver.com'
                            readOnly
                          />
                          <span className={styles.exText}>
                            <input type="checkbox" id="agreeEmail" />
                            <label for="agreeEmail">이메일 답변 받기</label>
                          </span>
                        </div>
                        <span className={styles.smallText}>
                          • 신청 및 제안 해주신 내용에 대한 처리결과를 이메일로 알려 드리고 있으니, 처리 결과 알림을 제공 받기 위해서 이메일을 확인해주시기 바랍니다.
                        </span>
                      </td>
                    </tr>  
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className={styles.requestBtn}>
              <button type="button" id="cancelBtn" className={`${styles.button} ${styles.gray}`}>취소</button>
              <button type="submit" id="saveBtn" className={`${styles.button} ${styles.blue}`}>등록</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}