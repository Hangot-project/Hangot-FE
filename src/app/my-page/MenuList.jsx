"use client";
import styles from './my-page.module.css';

export default function MenuList({ onMenuClick }) {
  return (
    <div className={styles.listWrapper}>
      <div className={styles.list}>
        <ol>
          <li className={styles.detailList}>
            <h3>내 정보 관리</h3>
            <ol>
              <li onClick={() => onMenuClick('계정 관리')}>계정 관리</li>
            </ol>
          </li>
          <li className={styles.detailList}>
            <h3>데이터 관리</h3>
            <ol>
              <li onClick={() => onMenuClick('데이터 다운로드 목록')}>데이터 다운로드 목록</li>
              <li onClick={() => onMenuClick('데이터 관심 목록')}>데이터 관심 목록</li>
              <li onClick={() => onMenuClick('데이터 요청 목록')}>데이터 요청 목록</li>
            </ol>
          </li>
          <li className={styles.detailList}>
            <h3>문의</h3>
            <ol>
              <li onClick={() => onMenuClick('Q&A')}>Q&A</li>
            </ol>
          </li>
        </ol>
      </div>
    </div>
  );
}