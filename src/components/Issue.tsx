import React, { useState } from 'react';
import { SetterOrUpdater } from 'recoil';
import styled from 'styled-components';
import { deleteIssue, getAllIssueData } from '../api/localstorage';
import { IssueDataType } from '../type/type';
import IssueDetail from './IssueDetail';

export default function Issue({
  prop,
  setIssueList,
}: {
  prop: IssueDataType;
  setIssueList: SetterOrUpdater<IssueDataType[]>;
}) {
  const { title, content, responsibility, date, status, uniqNumber } = prop;

  return (
    <IssueContainer>
      <button
        onClick={() => {
          deleteIssue(uniqNumber);
          const res = getAllIssueData();
          setIssueList(() => res);
        }}
      >
        삭제
      </button>
      <p>{title}</p>
      <div>
        <p>{responsibility}</p>
        <p>{date}</p>
      </div>
    </IssueContainer>
  );
}

const IssueContainer = styled.div`
  width: 200px;
  height: 100px;
  background-color: beige;
  border: 1px solid black;
  p {
    margin: 0;
  }
`;
