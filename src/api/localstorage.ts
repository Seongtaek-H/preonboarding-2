import { IssueDataType } from './../type/type';

export const createIssue = (issueData: IssueDataType) => {
  localStorage.setItem(
    issueData.uniqNumber.toString(),
    JSON.stringify(issueData)
  );
};

export const getAllIssueData = () => {
  const issueLength = localStorage.length;
  const issueList = [];
  for (let i = 0; i < issueLength; i++) {
    issueList.push(
      JSON.parse(localStorage.getItem(localStorage.key(i)!) as string)
    );
  }
  return issueList.sort((a: IssueDataType, b: IssueDataType) => {
    return b.orderNumber! - a.orderNumber!;
  });
};

export const getIssueData = (uniqNumber: number): IssueDataType => {
  return JSON.parse(localStorage.getItem(uniqNumber.toString()) as string);
};

export const deleteIssue = (uniqNumber: number) => {
  localStorage.removeItem(uniqNumber.toString());
};

export const updateIssue = (issueData: IssueDataType) => {
  localStorage.setItem(
    issueData.uniqNumber.toString(),
    JSON.stringify(issueData)
  );
};
