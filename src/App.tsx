import React, { useState } from 'react';
import Board from './components/Board';
import IssueDetail from './components/IssueDetail';
import IssueForm from './components/IssueForm';

function App() {
  const [newIssue, setNewIssue] = useState(false);
  const [uniqNumber, setUniqNumber] = useState(0);
  const [openDetailModal, setOpenDetailModal] = useState(false);

  return (
    <div>
      <button onClick={() => setNewIssue(true)}>+NEW</button>
      <Board
        setUniqNumber={setUniqNumber}
        setOpenDetailModal={setOpenDetailModal}
      />
      {newIssue && <IssueForm setNewIssue={setNewIssue} />}
      {openDetailModal && <IssueDetail uniqNumber={uniqNumber} />}
    </div>
  );
}

export default App;
