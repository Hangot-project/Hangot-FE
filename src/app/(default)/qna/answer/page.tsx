"use client";

import QAnswerB from "./qna-answer-before";
import QAnswerA from "./qna-answer-after";

export default function Page() {
  const contentHeader = "데이터 요청 관련 문의 드립니다.";
  const questionDate = "2024년 05월 30일"
  const answerDate = "2024년 06월 01일"
  const questionBody = "안녕하세요.\n\n하이데이터 서비스를 이용 중 데이터 관련 문제로 문의드립니다. 최근 개인 정보 보호 정책이 개정된 것으로 알고 있는데, 이에 따라 제3자와의 데이터 공유가 어떻게 변경되는지 알고 싶습니다. 또한, 수집되는 개인 정보 항목과 보관 기간에 대한 상세한 내용을 확인하고 싶습니다. 마지막으로, 개인정보 삭제 요청 시 처리 절차와 소요 시간에 대해 안내 부탁드립니다. \n\n빠른 답변 부탁드립니다. 감사합니다."
  const answerBody = "2024년 6월 1일부터 하이데이터 개인정보 처리방침이 아래와 같이 개정될 예정이니 이용에 참고하여 주시기 바랍니다.\n이번 개정은 사용자 여러분의 개인정보 보호를 강화하고, 서비스 이용 경험을 개선하기 위해 이루어집니다. \n\n주요 변경 사항은 다음과 같습니다.\n\n첫째, 개인정보 수집 항목의 추가 및 변경입니다. 서비스 제공을 위해 필요한 최소한의 정보를 수집하는 원칙을 유지하되, 일부 서비스 기능 향상을 위해 추가 정보가 요청될 수 있습니다.\n\n둘째, 개인정보 보관 기간의 명확화입니다. 개인정보는 원칙적으로 이용 목적이 달성된 후 지체 없이 파기되며, 법령에 따라 일정 기간 보관이 필요한 정보는 별도로 안전하게 관리됩니다.\n\n셋째, 제3자 제공에 관한 사항입니다. 하이데이터는 원칙적으로 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다. 다만, 새로운 서비스 연동 및 기능 확장을 위해 신뢰할 수 있는 파트너사와의 데이터 공유가 불가피한 경우, 사전에 이용자에게 명확히 고지하고 동의를 받을 예정입니다.\n\n넷째, 개인정보 보호를 위한 기술적 및 관리적 조치 강화입니다. 하이데이터는 최신 보안 기술을 적용하고, 내부 관리 체계를 개선하여 이용자의 개인정보를 안전하게 보호할 것입니다.\n\n이번 개정된 개인정보 처리방침은 하이데이터 웹사이트 및 앱을 통해 확인하실 수 있으며, 궁금하신 사항은 고객센터로 문의해 주시기 바랍니다.\n\n앞으로도 하이데이터는 더욱 안전하고 신뢰할 수 있는 서비스를 제공하기 위해 최선을 다하겠습니다."

  return (
    /* 관리자 답변 등록 전 화면 */
    <QAnswerB
      contentHeader={contentHeader} 
      questionDate={questionDate}
      questionBody={questionBody}
    />

    /* 관리자 답변 등록 후 화면 */
    /* <QAnswerA
      contentHeader={contentHeader} 
      questionDate={questionDate}
      answerDate={answerDate}
      questionBody={questionBody} 
      answerBody={answerBody}
    /> */
  );
}
