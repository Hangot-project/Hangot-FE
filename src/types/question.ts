export interface Question {
  questionId: number;
  title: string;
  date: string;
  content: string;
  view: number;
  answerStatus: string;
  userName: string;
}

export interface QuestionSimple {
  questionId: number;
  title: string;
  createDate: string;
  view: number;
  answerStatus: string;
  userName: string;
}
