"use client";

import { useState, useEffect } from 'react';
import styles from './my-page.module.css';
import MenuList from './MenuList';
import AccountManagement from './AccountManagement';
import DataDownloadList from './DataDownloadList';
import DataInterestList from './DataInterestList';
import DataRequestList from './DataRequestList';
import QA from './QA';

export default function MyPage() {
  const [selectedMenu, setSelectedMenu] = useState('계정 관리');

  useEffect(() => {
    setSelectedMenu('계정 관리');
  }, []);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  return (
    <div className={styles.container}>
      <MenuList onMenuClick={handleMenuClick} />
      <div className={styles.mainWrapper}>
        <div className={styles.mainHeader}>{selectedMenu}</div>
        {selectedMenu === '계정 관리' && <AccountManagement />}
        {selectedMenu === '데이터 다운로드 목록' && <DataDownloadList />}
        {selectedMenu === '데이터 관심 목록' && <DataInterestList />}
        {selectedMenu === '데이터 요청 목록' && <DataRequestList />}
        {selectedMenu === 'Q&A' && <QA />}
      </div>
    </div>
  );
}
