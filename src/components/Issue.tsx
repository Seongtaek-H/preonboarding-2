import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { deleteIssue, getAllIssueData } from '../api/localstorage';
import { issueData } from '../recoil/atom';
import { IssueDataType } from '../type/type';

export default function Issue({ prop }: { prop: IssueDataType }) {
  const { title, content, responsibility, date, status, uniqNumber } = prop;
  const [issueList, setIssueList] = useRecoilState<IssueDataType[]>(issueData);

  const deleteIssueData = () => {
    deleteIssue(uniqNumber);
    const res = getAllIssueData();
    if (res[0]) {
      setIssueList(res);
    } else {
      setIssueList([]);
    }
  };
  return (
    <div>
      <button
        onClick={() => {
          deleteIssueData();
        }}
      >
        삭제
      </button>
      <p>{title}</p>
      <div>
        <p>{responsibility}</p>
        <p>{date}</p>
      </div>
    </div>
  );
}
