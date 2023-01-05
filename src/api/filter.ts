import { IssueDataType } from './../type/type';

export const StatusFilter = (issueList: IssueDataType[], status?: string) => {
  if (status === 'in progress') {
    return issueList.filter((item) => item.status === 'in progress');
  } else if (status === 'done') {
    return issueList.filter((item) => item.status === 'done');
  } else {
    return issueList.filter((item) => item.status === 'not started');
  }
};
