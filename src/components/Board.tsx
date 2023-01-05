import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { getAllIssueData } from '../api/localstorage';
import { issueData } from '../recoil/atom';
import Issue from './Issue';
import { StatusFilter } from '../api/filter';
import { IssueDataType } from '../type/type';
import IssueDetail from './IssueDetail';

export default function Borad({
  setUniqNumber,
  setOpenDetailModal,
}: {
  setUniqNumber: Dispatch<SetStateAction<number>>;
  setOpenDetailModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [issueList, setIssueList] = useRecoilState<IssueDataType[]>(issueData);

  useEffect(() => {
    setIssueList(() => getAllIssueData());
  }, []);

  return (
    <Container>
      <BoradContainer>
        <p>할 일</p>
        {issueList[0] !== null &&
          StatusFilter(issueList).map((issue, index) => (
            <div
              key={index}
              onClick={() => {
                setUniqNumber(issue.uniqNumber);
                setOpenDetailModal(true);
              }}
            >
              <Issue prop={issue} setIssueList={setIssueList} />
            </div>
          ))}
      </BoradContainer>
      <BoradContainer>
        <p>진행중</p>
        {issueList[0] !== null &&
          StatusFilter(issueList, 'in progress').map((issue, index) => (
            <div
              key={index}
              onClick={() => {
                setUniqNumber(issue.uniqNumber);
                setOpenDetailModal(true);
              }}
            >
              <Issue prop={issue} setIssueList={setIssueList} />
            </div>
          ))}
      </BoradContainer>
      <BoradContainer>
        <p>완료</p>
        {issueList[0] !== null &&
          StatusFilter(issueList, 'done').map((issue, index) => (
            <div
              key={index}
              onClick={() => {
                setUniqNumber(issue.uniqNumber);
                setOpenDetailModal(true);
              }}
            >
              <Issue prop={issue} setIssueList={setIssueList} />
            </div>
          ))}
      </BoradContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 80%;
  background-color: aliceblue;
  display: flex;
  padding: 10px;
`;

const BoradContainer = styled.div`
  width: 30%;
  div {
    cursor: pointer;
  }
`;
