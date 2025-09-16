'use client';

import { useCardContext } from './CardContext';
import BoardOverview from './BoardOverview';
import ModalAddBoard from './ModalAddBoard';
import { useState } from 'react';
import CreateBoard from './CreateBoard';

export default function KanbanList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { boardList, setBoardList } = useCardContext();

  function handleCreate(formData) {
    const title = formData.get('title');
    if (!title) return;
    setBoardList((boardList) => [
      ...boardList,
      { boardName: title, id: Date.now() },
    ]);
    setIsModalOpen(false);
  }

  return (
    <>
      {boardList.map((board) => (
        <BoardOverview
          key={board.id}
          href={`/${board.id}`}
          name={board.boardName}
        />
      ))}
      <CreateBoard setIsModalOpen={setIsModalOpen} />
      {isModalOpen && (
        <ModalAddBoard
          setIsModalOpen={setIsModalOpen}
          onCreate={handleCreate}
        />
      )}
    </>
  );
}
