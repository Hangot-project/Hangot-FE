"use client";

import styles from "./password.module.css";
import Image from "next/image";
import { ScreenClose } from "../../../../../public/svgs";
import { setPassword } from "../../../../shared/api/user/setPassword";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Password({ onClose }) {
  const [passwordInput, setPasswordInput] = useState<string>("");

  const [newPasswordInput, setNewPasswordInput] = useState<string>("");
  const pwAgainRef = useRef<HTMLInputElement>();

  const { data: session, status } = useSession();

  const router = useRouter();

  const handleChangePWClick = async () => {
    if (status === "unauthenticated") {
      alert(`로그인 후 이용해주세요.`);
      router.push("/login");
      return;
    }

    if (newPasswordInput === "") {
      alert(`비밀번호가 입력되지 않았습니다.`);
      return;
    }

    if (pwAgainRef.current.value !== newPasswordInput) {
      alert(`비밀번호가 일치하지 않습니다.`);
      return;
    }

    const response = await setPassword({
      password: newPasswordInput,
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
    <div className={styles.container}>
      {/* 비밀번호 변경 헤더 */}
      <div className={styles.header}>
        <div>비밀번호 변경</div>
        <Image alt="닫기" src={ScreenClose} onClick={onClose} />
      </div>

      {/* 비밀번호 변경 양식 (현재 비밀번호, 비밀번호, 비밀번호 확인) */}
      <form className={styles.mainForm}>
        {/* 현재 비밀번호 입력란 */}
        {/* <div>
          <label>현재 비밀번호</label>
          <div>
            <input
              className={styles.formInput}
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              type="password"
            />
            <div className={styles.infoTxt}>
              비밀번호를 잊으셨나요?
              <Link href={"/"}>비밀번호 재설정</Link>
            </div>
          </div>
        </div> */}

        {/* 새 비밀번호 입력란 */}
        <div>
          <label>새로운 비밀번호</label>
          <div>
            <input
              className={styles.formInput}
              value={newPasswordInput}
              onChange={(e) => setNewPasswordInput(e.target.value)}
              type="password"
            />
            <div className={styles.infoTxt}>
              비밀번호 (영문자, 숫자, 특수문자 포함 최소 8~20자)
            </div>
          </div>
        </div>

        {/* 비밀번호 확인란 */}
        <div>
          <label>비밀번호 확인</label>
          <div>
            <input ref={pwAgainRef} className={styles.formInput} type="password" />
          </div>
        </div>
      </form>

      {/* 비밀번호 변경 취소, 저장 버튼 */}
      <div className={styles.submit}>
        <button onClick={onClose}>취소</button>
        <button onClick={handleChangePWClick}>저장</button>
      </div>
    </div>
  );
}
