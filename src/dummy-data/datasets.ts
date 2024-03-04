interface Dataset {
  labelName: string;
  labelList: string[];
  dataName: string[];
  dataList: Array<string[]>;
}

export const dataset: Dataset = {
  labelName: "공시연도",
  labelList: ["2019", "2020", "2021", "2022"],
  dataName: ["재학생수", "총 실수", "수용가능인원", "기숙사수용률"],
  dataList: [
    ["10049", "10207", "10133", "10387"],
    ["1399", "1399", "1399", "1403"],
    ["2744", "2744", "2744", "2743"],
    ["27.3", "26.9", "27.1", "26.4"],
  ],
};
