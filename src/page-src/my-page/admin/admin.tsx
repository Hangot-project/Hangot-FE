import styled from "@emotion/styled";

import { Dispatch, SetStateAction, useState } from "react";
import styles from "./admin.module.css";
import Nickname from "./nickname/nickname";
import Password from "./password/password";
import { useSession } from "next-auth/react";

interface Props {
  setMenu?: Dispatch<SetStateAction<string>>;
}

export function Admin({ setMenu }: Props) {
  const { data: session } = useSession();

  const [selectedPopup, setSelectedPopup] = useState(null);

  const handleNameChangeClick = () => {
    setSelectedPopup("nickname");
  };

  const handlePasswordChangeClick = () => {
    setSelectedPopup("password");
  };

  const handleCloseModal = () => {
    setSelectedPopup(null);
  };

  return (
    <div className="mainBody">
      {/* 기본 정보 */}
      <div className={styles.bodyDetail}>
        <div className={styles.bodyHeader}>기본정보</div>
        <div className={styles.pwInfo}>
          <div className={styles.idInfo}>
            <div>
              <p>{session.user.name}</p>
            </div>
            <div>
              <button onClick={() => setMenu("데이터 다운로드 목록")}>
                <p>다운로드</p>
                <p>2건</p>
              </button>
              <button onClick={() => setMenu("데이터 관심 목록")}>
                <p>관심</p>
                <p>2건</p>
              </button>
            </div>
          </div>
          <ChangeSubmitBtn onClick={handleNameChangeClick}>
            회원정보 수정
          </ChangeSubmitBtn>
        </div>
      </div>

      {/* 비밀번호 */}
      <div className={styles.bodyDetail}>
        <div className={styles.bodyHeader}>비밀번호</div>

        <div className={styles.pwInfo}>
          <div className={styles.content}></div>
          <ChangeSubmitBtn onClick={handlePasswordChangeClick}>
            비밀번호 변경
          </ChangeSubmitBtn>
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
              <span className={`${styles.emailLabel1} ${styles.emailLabel2}`}></span>
            </label>
          </div>

          <div className={styles.emailDivide}></div>

          <div className={styles.email}>
            <div className={styles.emailText}>
              <div className={styles.emailText1}>
                마케팅 활용 동의 및 광고 수신 동의
              </div>
              <div className={styles.emailText2}>
                각종 이벤트, 회원 혜택, 할인 행사 등 마케팅 알림을 받겠습니다.
              </div>
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
          <ChangeSubmitBtn>계정 탈퇴</ChangeSubmitBtn>
        </div>
      </div>

      {/* 회원정보 수정, 비밀번호 변경 팝업 스크린 */}
      {selectedPopup === "nickname" && (
        <div className={styles.overlay}>
          <Nickname onClose={handleCloseModal} />
        </div>
      )}
      {selectedPopup === "password" && (
        <div className={styles.overlay}>
          <Password onClose={handleCloseModal} />
        </div>
      )}
    </div>
  );
}

const PasswordInput = styled.input`
  border: solid 1px #d7e2eb;
  border-radius: 4px;

  width: 30rem;
  padding: 0.5rem;
`;

const ChangeSubmitBtn = styled.button`
  width: 8.125rem;
  height: 2.875rem;
  padding: 0;
  border: #d7e2eb solid 1px;
  margin: auto 0;

  border-radius: 4px;
  background-color: #fbfbfd;
  color: #263747;
  font-weight: 700;
  text-align: center;

  &:hover {
    background-color: #0078ff;
    color: white;
  }
`;
