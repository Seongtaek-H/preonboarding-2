import { issueData } from './../recoil/atom';
import { IssueDataType } from './../type/type';

export const createIssue = (issueData: IssueDataType) => {
  localStorage.setItem(
    `issue-${issueData.uniqNumber}`,
    JSON.stringify(issueData)
  );
};

export const getAllIssueData = () => {
  const IssueLength = localStorage.length;
  const IssueList = [];
  for (let i = 0; i < IssueLength; i++) {
    IssueList.push(JSON.parse(localStorage.getItem(`issue-${i}`) as string));
  }
  return IssueList;
};

export const getIssueData = (uniqNumber: number): IssueDataType => {
  return JSON.parse(localStorage.getItem(`issue-${uniqNumber}`) as string);
};

export const deleteIssue = (uniqNumber: number) => {
  localStorage.removeItem(`issue-${uniqNumber}`);
};

export const updateIssue = (issueData: IssueDataType) => {
  localStorage.setItem(
    `issue-${issueData.uniqNumber}`,
    JSON.stringify(issueData)
  );
};
