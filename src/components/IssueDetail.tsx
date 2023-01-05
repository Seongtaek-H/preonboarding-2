import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  getAllIssueData,
  getIssueData,
  updateIssue,
} from '../api/localstorage';
import { initailData } from '../constant/constant';
import { issueData } from '../recoil/atom';
import { IssueDataType } from '../type/type';

export default function IssueDetail({ uniqNumber }: { uniqNumber: number }) {
  const [issueList, setIssueList] = useRecoilState<IssueDataType[]>(issueData);
  const [updateIssueData, setUpdateIssueData] =
    useState<IssueDataType>(initailData);

  const onSubmitCreateIssue = () => {
    updateIssue(updateIssueData);
    const res = getAllIssueData();
    setIssueList(res);
  };

  useEffect(() => {
    const res = getIssueData(uniqNumber);
    setUpdateIssueData(res);
  }, [uniqNumber]);

  return (
    <div>
      <Form className='form' onSubmit={onSubmitCreateIssue}>
        <PropertyContainer>
          <p>제목</p>
          <input
            type='text'
            value={updateIssueData.title}
            onChange={(e) =>
              setUpdateIssueData({ ...updateIssueData, title: e.target.value })
            }
          />
        </PropertyContainer>
        <PropertyContainer>
          <p>상태</p>
          <select
            value={updateIssueData.status}
            onChange={(e) =>
              setUpdateIssueData({ ...updateIssueData, status: e.target.value })
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
            value={updateIssueData.responsibility}
            onChange={(e) =>
              setUpdateIssueData({
                ...updateIssueData,
                responsibility: e.target.value,
              })
            }
          />
        </PropertyContainer>
        <PropertyContainer>
          <p>날짜</p>
          <input
            type='datetime-local'
            value={updateIssueData.date}
            onChange={(e) =>
              setUpdateIssueData({ ...updateIssueData, date: e.target.value })
            }
          />
        </PropertyContainer>
        <PropertyContainer>
          <p>내용</p>
          <textarea
            value={updateIssueData.content}
            onChange={(e) =>
              setUpdateIssueData({
                ...updateIssueData,
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
