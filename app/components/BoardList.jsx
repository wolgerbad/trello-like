'use client';

import BoardOverview from './BoardOverview';
import ModalAddBoard from './ModalAddBoard';
import { useState } from 'react';
import CreateBoard from './CreateBoard';
import { useOptimisticContext } from './OptimisticContextProvider';
import { addNewBoard } from '../lib/actions';

export default function BoardList({ userId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { optimisticBoards, handleOptimisticBoards } = useOptimisticContext();

  async function handleCreate(boardName) {
    const randomId = Math.floor(Math.random() * 10000);
    const newBoard = { name: boardName, user_id: userId, id: randomId };
    if (!boardName) return;
    handleOptimisticBoards({ type: 'add', payload: newBoard });

    await addNewBoard(newBoard);
  }

  return (
    <>
      {optimisticBoards?.map((board) => (
        <BoardOverview key={board.id} href={`/${board.id}`} name={board.name} />
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
