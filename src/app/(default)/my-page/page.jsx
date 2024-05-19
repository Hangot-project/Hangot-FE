"use client";

import { useState, useEffect } from "react";
import styles from "./my-page.module.css";
import Image from "next/image";
import { SearchSymbol } from "../../../../public/svgs";

export default function MyPage() {
  const [selectedMenu, setSelectedMenu] = useState("계정 관리");

  useEffect(() => {
    setSelectedMenu("계정 관리");
  }, []);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <>
      <div className={`noLayoutPadding ${styles.container}`}>
        {/* 마이페이지 메뉴 목록 (내 정보 관리, 데이터 관리, 문의) */}
        <div className={styles.listWrapper}>
          <div className={styles.list}>
            <ol>
              {/* 마이페이지 메뉴 1 : 내 정보 관리 */}
              <li className={styles.detailList}>
                <h3>내 정보 관리</h3>
                <ol>
                  <li onClick={() => handleMenuClick("계정 관리")}>계정 관리</li>
                  <li onClick={() => handleMenuClick("세부 메뉴 2")}>세부 메뉴 2</li>
                  <li onClick={() => handleMenuClick("세부 메뉴 3")}>세부 메뉴 3</li>
                </ol>
              </li>

              {/* 마이페이지 메뉴 2 : 데이터 관리 */}
              <li className={styles.detailList}>
                <h3>데이터 관리</h3>
                <ol>
                  <li onClick={() => handleMenuClick("데이터 다운로드 목록")}>
                    데이터 다운로드 목록
                  </li>
                  <li onClick={() => handleMenuClick("데이터 관심 목록")}>
                    데이터 관심 목록
                  </li>
                  <li onClick={() => handleMenuClick("데이터 요청 목록")}>
                    데이터 요청 목록
                  </li>
                  <li onClick={() => handleMenuClick("세부 메뉴 4")}>세부 메뉴 4</li>
                </ol>
              </li>

              {/* 마이페이지 메뉴 3 : 문의 */}
              <li className={styles.detailList}>
                <h3>문의</h3>
                <ol>
                  <li onClick={() => handleMenuClick("Q&A")}>Q&A</li>
                  <li onClick={() => handleMenuClick("세부 메뉴 5")}>세부 메뉴 5</li>
                  <li onClick={() => handleMenuClick("세부 메뉴 6")}>세부 메뉴 6</li>
                  <li onClick={() => handleMenuClick("세부 메뉴 7")}>세부 메뉴 7</li>
                </ol>
              </li>
            </ol>
          </div>
        </div>

        <div className={styles.mainWrapper}>
          {/* 선택된 메뉴에 따라 다른 섹션 렌더링 */}
          {/* TODO : 렌더링 부분 코드 간소화 */}
          <div className={styles.mainHeader}>{selectedMenu}</div>

          {/* 각 메뉴에 따른 섹션 조건부 렌더링 */}

          {/* 계정 관리에 해당하는 섹션 */}
          {selectedMenu === "계정 관리" && (
            <div className={styles.mainBody}>
              {/* 기본 정보 */}
              <div className={styles.bodyDetail}>
                <div className={styles.bodyHeader}>기본정보</div>

                <div className={styles.basicinfo}></div>
              </div>

              {/* 비밀번호 */}
              <div className={styles.bodyDetail}>
                <div className={styles.bodyHeader}>비밀번호</div>

                <div className={styles.pwInfo}>
                  <div className={styles.content}>
                    <div>최근 업데이트 : 0000-00-00</div>
                    <div>비밀번호</div>
                  </div>
                  <button>비밀번호 변경</button>
                </div>
              </div>

              {/* 이메일 알림 */}
              {/* TODO : 이메일 알림 설정 토글 버튼 컴포넌트로 구현 */}
              <div className={styles.bodyDetail}>
                <div className={styles.bodyHeader}>이메일 알림</div>

                <div className={styles.basicinfo}>
                  <div className={styles.email}>
                    <div className={styles.emailText}>
                      <div className={styles.emailText1}>알림</div>
                      <div className={styles.emailText2}>
                        내 질문의 답변이 등록되면 이메일로 알림을 받겠습니다.
                      </div>
                    </div>
                    <label className={styles.emailLabel}>
                      <input type="checkbox"></input>
                      <span
                        className={`${styles.emailLabel1} ${styles.emailLabel2}`}
                      ></span>
                    </label>
                  </div>

                  <div className={styles.emailDivide}></div>

                  <div className={styles.email}>
                    <div className={styles.emailText}>
                      <div className={styles.emailText1}>
                        마케팅 활용 동의 및 광고 수신 동의
                      </div>
                      <div className={styles.emailText2}>
                        각종 이벤트, 회원 혜택, 할인 행사 등 마케팅 알림을
                        받겠습니다.
                      </div>
                    </div>
                    <label className={styles.emailLabel}>
                      <input type="checkbox"></input>
                      <span
                        className={`${styles.emailLabel1} ${styles.emailLabel2}`}
                      ></span>
                    </label>
                  </div>
                </div>
              </div>

              {/* 계정 탈퇴 */}
              <div className={styles.bodyDetail}>
                <div className={styles.bodyHeader}>계정 탈퇴</div>
                <div className={styles.pwInfo}>
                  <div className={styles.content}>
                    <div>계정을 탈퇴합니다.</div>
                  </div>
                  <button>계정 탈퇴</button>
                </div>
              </div>
            </div>
          )}

          {/* 데이터 다운로드 목록에 해당하는 섹션 */}
          {selectedMenu === "데이터 다운로드 목록" && (
            <div className={styles.mainBody}>
              {/* 기관명, 기간, 키워드 필터 섹션 */}
              {/* TODO : 드롭다운, 검색창 컴포넌트로 구현 */}
              <div className={styles.filterWrapper}>
                {/* 기관명, 기간 드롭다운 컴포넌트 */}
                <div className={styles.dropdownFilter}>
                  <div>
                    <div disabled="false" id="menu_button1">
                      <div className={`${styles.filter1} ${styles.filter2}`}>
                        <button
                          className={`${styles.button1} ${styles.button2}`}
                          variant="light"
                        >
                          <div className={styles.buttonText}>기관명</div>
                        </button>
                      </div>
                    </div>
                    <div disabled="false" id="menu_button2">
                      <div className={`${styles.filter1} ${styles.filter2}`}>
                        <button
                          className={`${styles.button1} ${styles.button2}`}
                          variant="light"
                        >
                          <div className={styles.buttonText}>기간</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 데이터명 키워드 검색창 컴포넌트 */}
                <div className={styles.searchFilter}>
                  <div className={styles.searchBox} id="search">
                    <div>
                      <div className={styles.searchBoxInner}>
                        <input
                          type="text"
                          aria-invalid="false"
                          placeholder="데이터명을 검색해보세요."
                          className={`${styles.searchText1} ${styles.searchText2}`}
                        />
                      </div>
                    </div>
                    <button className={styles.searchButton}>
                      <Image src={SearchSymbol} width={14} height={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* 데이터 검색 결과 개수 */}
              <div className={styles.resultNum}>
                <div className={styles.resultNumText}>0개의 데이터</div>
              </div>

              {/* 데이터 검색 결과 */}
              {/* TODO : 데이터 검색 결과 불러오기 */}
              <div className={styles.searchResult}>
                <div className={styles.searchResultBody}>
                  <table>
                    <thead>
                      <tr>
                        <th className={styles.gridCol3}>제목</th>
                        <th className={styles.gridCol4}>데이터유형</th>
                        <th className={styles.gridCol5}>데이터명</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>첫 번째 데이터 제목</td>
                        <td>데이터 유형 A</td>
                        <td>데이터명 A</td>
                      </tr>
                      <tr>
                        <td>두 번째 데이터 제목</td>
                        <td>데이터 유형 B</td>
                        <td>데이터명 B</td>
                      </tr>
                      <tr>
                        <td>세 번째 데이터 제목</td>
                        <td>데이터 유형 C</td>
                        <td>데이터명 C</td>
                      </tr>
                      <tr>
                        <td>네 번째 데이터 제목</td>
                        <td>데이터 유형 D</td>
                        <td>데이터명 D</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 데이터 관심 목록에 해당하는 섹션 */}
          {selectedMenu === "데이터 관심 목록" && (
            <div className={styles.mainBody}>
              {/* 데이터 검색 결과 개수 */}
              <div className={styles.resultNum}>
                <div className={styles.resultNumText}>0개의 데이터</div>
              </div>

              {/* 데이터 검색 결과 */}
              {/* TODO : 데이터 검색 결과 불러오기 */}
              <div className={styles.searchResult}>
                <div className={styles.searchResultBody}>
                  <table>
                    <thead>
                      <tr>
                        <th className={styles.gridCol1}>처리상태</th>
                        <th className={styles.gridCol2}>데이터명</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={2}>
                          데이터가 없습니다. 다른 검색 조건을 선택해주세요.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Q&A에 해당하는 섹션 */}
          {selectedMenu === "Q&A" && (
            <div className={styles.mainBody}>
              {/* 데이터 검색 결과 개수 */}
              <div className={styles.resultNum}>
                <div className={styles.resultNumText}>0개의 데이터</div>
              </div>

              {/* 데이터 검색 결과 */}
              {/* TODO : 데이터 검색 결과 불러오기 */}
              <div className={styles.searchResult}>
                <div className={styles.searchResultBody}>
                  <table>
                    <colgroup>
                      <col
                        style={{ width: "5.5%" }}
                        className={styles.tableCol}
                      ></col>
                      <col style={{ width: "15%" }}></col>
                      <col></col>
                      <col style={{ width: "10%" }}></col>
                      <col style={{ width: "10%" }}></col>
                      <col style={{ width: "10%" }}></col>
                    </colgroup>
                    <thead>
                      <tr>
                        <th scope="col" className={styles.tableCol}>
                          NO.
                        </th>
                        <th scope="col">문의유형</th>
                        <th scope="col">제목</th>
                        <th scope="col">등록자</th>
                        <th scope="col">등록일</th>
                        <th scope="col">답변현황</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={6}>
                          데이터가 없습니다. 다른 검색 조건을 선택해주세요.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
