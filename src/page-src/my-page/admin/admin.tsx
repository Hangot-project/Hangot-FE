import styled from "@emotion/styled";

import { useRef, useState } from "react";
import styles from "./admin.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { setPassword } from "../../../shared/api/user/setPassword";

export function Admin() {
  const [passwordInput, setPasswordInput] = useState<string>("");
  const pwRef = useRef<HTMLInputElement>();

  const { data: session, status } = useSession();

  const router = useRouter();

  const handleChangePWClick = async () => {
    if (status === "unauthenticated") {
      alert(`로그인 후 이용해주세요.`);
      router.push("/login");
      return;
    }

    if (passwordInput === "") {
      alert(`비밀번호가 입력되지 않았습니다.`);
      return;
    }

    if (pwRef.current.value !== passwordInput) {
      alert(`비밀번호가 일치하지 않습니다.`);
      return;
    }

    const response = await setPassword({
      password: passwordInput,
      grantType: session.user.grantType,
      token: session.user.accessToken,
    });

    if (!response.success) {
      alert(`[SERVER ERROR] 비밀번호 변경에 실패했습니다. 다시 시도해주세요.`);
      return;
    }

    alert(`비밀번호가 변경되었습니다.`);
  };

  return (
    <div className="mainBody">
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
            <PasswordInput
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="변경할 비밀번호 입력"
            />
            <PasswordInput
              ref={pwRef}
              style={{
                marginTop: "4px",
              }}
              type="password"
              placeholder="변경할 비밀번호 재입력"
            />
          </div>
          <ChangePasswordBtn onClick={handleChangePWClick}>
            비밀번호 변경
          </ChangePasswordBtn>
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
          <ChangePasswordBtn>계정 탈퇴</ChangePasswordBtn>
        </div>
      </div>
    </div>
  );
}

const PasswordInput = styled.input`
  border: solid 1px #d7e2eb;
  border-radius: 4px;

  width: 30rem;
  padding: 0.5rem;
`;

const ChangePasswordBtn = styled.button`
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
