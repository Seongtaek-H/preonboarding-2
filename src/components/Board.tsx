import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { getAllIssueData, updateIssue } from '../api/localstorage';
import { issueData } from '../recoil/atom';
import Issue from './Issue';
import { StatusFilter } from '../api/filter';
import { IssueDataType } from '../type/type';

const status = ['not started', 'in progress', 'done'];

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
  }, [setIssueList]);

  const dragedItem = useRef<IssueDataType | null>(null);
  const dropPointStatus = useRef<string | null>(null);
  const dropPointOrderNumber = useRef<number | null>(null);

  const dragStart = (issue: IssueDataType) => {
    dragedItem.current = issue;
  };

  const dragOverStatus = (e: React.DragEvent<HTMLDivElement>, item: string) => {
    dropPointStatus.current = item;
    console.log(item);
  };

  const dragOverOrderNumber = (
    e: React.DragEvent<HTMLDivElement>,
    item: number
  ) => {
    e.preventDefault();
    dropPointOrderNumber.current = item;
  };

  const drop = () => {
    const copy = {
      ...dragedItem.current!,
      orderNumber: dropPointOrderNumber.current
        ? dropPointOrderNumber.current - 1
        : dragedItem.current!.orderNumber,
      status: dropPointStatus.current!,
    };
    updateIssue(copy);
    const res = getAllIssueData();
    setIssueList(res);
  };

  return (
    <Container>
      {status.map((item, index) => {
        return (
          <BoradContainer
            key={item}
            onDragEnter={(e) => dragOverStatus(e, item)}
            onDragOver={(e) => dragOverStatus(e, item)}
          >
            <p>{item}</p>
            {issueList[0] !== null &&
              StatusFilter(issueList, item).map((issue, index) => (
                <IssueContainer
                  key={index}
                  onClick={() => {
                    setUniqNumber(issue.uniqNumber);
                    setOpenDetailModal((prev) => !prev);
                  }}
                  draggable={true}
                  onDragStart={() => dragStart(issue)}
                  onDragOver={(e) => dragOverOrderNumber(e, issue.orderNumber)}
                  onDrop={() => drop()}
                >
                  <Issue prop={issue} />
                </IssueContainer>
              ))}
          </BoradContainer>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  background-color: aliceblue;
  display: flex;
`;

const BoradContainer = styled.div`
  width: 30%;
  padding: 15px;
  background-color: orange;
  border: 1px solid black;
`;

const IssueContainer = styled.div`
  width: 70%;
  background-color: beige;
  border: 1px solid black;
  margin: 10px;
  cursor: pointer;
`;
