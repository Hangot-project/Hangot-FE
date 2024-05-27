import { getAllQuestionList } from "../../../shared/api/question/getAllQuestionList";
import { QuestionList } from "./question-list";

async function Page({ searchParams }) {
  const page = searchParams["page"] ? parseInt(searchParams["page"]) : 0;
  const category = searchParams["category"];
  const answerStatus = searchParams["answerStatus"];

  const response = await getAllQuestionList({
    page,
    category,
    answerStatus,
  });

  return <QuestionList result={response} initPage={page} />;
}

export default Page;
