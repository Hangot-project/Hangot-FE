"use client";

import { useState } from 'react';
import styles from './my-page.module.css';
import Nickname from './Nickname';
import Password from './Password';

export default function AccountManagement() {
  const [selectedPopup, setSelectedPopup] = useState(null);

  const handleNameChangeClick = () => {
    setSelectedPopup('nickname');
  };
  
  const handlePasswordChangeClick = () => {
    setSelectedPopup('password');
  };
  
  const handleCloseModal = () => {
    setSelectedPopup(null);
  };

  return (
    <div className={styles.mainBody}>
      <div className={styles.bodyDetail}>

        {/* 이름, 이메일, 다운로드 건수, 관심 건수를 props로 전달 */}
        <div className={styles.bodyHeader}>기본정보</div>
        <div className={styles.pwInfo}>
          <div className={styles.idInfo}>
            <div>
              <p>이정민</p>
              <p>님</p>
              <p>dalnimjm@naver.com</p>
            </div>
            <div>
              <button>
                <p>다운로드</p>
                <p>2건</p>
              </button>
              <button>
                <p>관심</p>
                <p>2건</p>
              </button>
            </div>
          </div>
          <div className={styles.idInfoEditBtn}>
            <button onClick={handleNameChangeClick}>회원정보 수정</button>
          </div>
        </div>
      </div>

      {/* 비밀번호 최신 업데이트 날짜를 props로 전달 */}
      <div className={styles.bodyDetail}>
        <div className={styles.bodyHeader}>비밀번호</div>
        <div className={styles.pwInfo}>
          <div className={styles.content}>
            <div>최근 업데이트 : 0000-00-00</div>
            <div>비밀번호</div>
          </div>
          <button onClick={handlePasswordChangeClick}>비밀번호 변경</button>
        </div>
      </div>

      {/* 이메일 알림 설정 */}
      <div className={styles.bodyDetail}>
        <div className={styles.bodyHeader}>이메일 알림</div>
        <div className={styles.basicinfo}>
          <div className={styles.email}>
            <div className={styles.emailText}>
              <div className={styles.emailText1}>알림</div>
              <div className={styles.emailText2}>내 질문의 답변이 등록되면 이메일로 알림을 받겠습니다.</div>
            </div>
            <label className={styles.emailLabel}>
              <input type="checkbox"></input>
              <span className={`${styles.emailLabel1} ${styles.emailLabel2}`}></span>
            </label>
          </div>
          <div className={styles.emailDivide}></div>
          <div className={styles.email}>
            <div className={styles.emailText}>
              <div className={styles.emailText1}>마케팅 활용 동의 및 광고 수신 동의</div>
              <div className={styles.emailText2}>각종 이벤트, 회원 혜택, 할인 행사 등 마케팅 알림을 받겠습니다.</div>
            </div>
            <label className={styles.emailLabel}>
              <input type="checkbox"></input>
              <span className={`${styles.emailLabel1} ${styles.emailLabel2}`}></span>
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

      {/* 회원정보 수정, 비밀번호 변경 팝업 스크린 */}
      {selectedPopup === 'nickname' && (
        <div className={styles.overlay}>
          <Nickname onClose={handleCloseModal} />
        </div>
      )}
      {selectedPopup === 'password' && (
        <div className={styles.overlay}>
          <Password onClose={handleCloseModal} />
        </div>
      )}
    </div>
  );
}