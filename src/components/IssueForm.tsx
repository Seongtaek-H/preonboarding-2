import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { createIssue } from '../api/localstorage';
import { issueData } from '../recoil/atom';
import { IssueDataType } from '../type/type';

export default function IssueForm({
  setNewIssue,
}: {
  setNewIssue: Dispatch<SetStateAction<boolean>>;
}) {
  const issueListNumber = localStorage.length;
  const [createIssueData, setCreateIssueData] = useState<IssueDataType>({
    title: '',
    content: '',
    responsibility: '',
    date: '',
    status: 'not started',
    uniqNumber: issueListNumber,
    orderNumber: 0,
  });
  const [issueList, setIssueList] = useRecoilState<IssueDataType[]>(issueData);
  const onSubmitCreateIssue = () => {
    createIssue(createIssueData);
    setIssueList([...issueList, createIssueData]);
  };
  return (
    <div>
      <button onClick={() => setNewIssue(false)}>닫기</button>
      <Form className='form' onSubmit={onSubmitCreateIssue}>
        <PropertyContainer>
          <p>제목</p>
          <input
            type='text'
            value={createIssueData.title}
            onChange={(e) =>
              setCreateIssueData({ ...createIssueData, title: e.target.value })
            }
          />
        </PropertyContainer>
        <PropertyContainer>
          <p>상태</p>
          <select
            value={createIssueData.status}
            onChange={(e) =>
              setCreateIssueData({ ...createIssueData, status: e.target.value })
            }
          >
            <option value='not started'>not started</option>
            <option value='in progress'>in progress</option>
            <option value='done'>done</option>
          </select>
        </PropertyContainer>
        <PropertyContainer>
          <p>담당자</p>
          <input
            type='text'
            value={createIssueData.responsibility}
            onChange={(e) =>
              setCreateIssueData({
                ...createIssueData,
                responsibility: e.target.value,
              })
            }
          />
        </PropertyContainer>
        <PropertyContainer>
          <p>날짜</p>
          <input
            type='datetime-local'
            value={createIssueData.date}
            onChange={(e) =>
              setCreateIssueData({ ...createIssueData, date: e.target.value })
            }
          />
        </PropertyContainer>
        <PropertyContainer>
          <p>내용</p>
          <textarea
            value={createIssueData.content}
            onChange={(e) =>
              setCreateIssueData({
                ...createIssueData,
                content: e.target.value,
              })
            }
          />
        </PropertyContainer>
        <button>저장</button>
      </Form>
    </div>
  );
}

const Form = styled.form`
  width: 80%;
`;

const PropertyContainer = styled.div`
  display: flex;
  p {
    width: 30%;
  }
`;
