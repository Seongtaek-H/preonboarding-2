import { IssueDataType } from './../type/type';
import { atom } from 'recoil';

export const issueData = atom<IssueDataType[]>({
  key: 'issueData',
  default: [],
});
