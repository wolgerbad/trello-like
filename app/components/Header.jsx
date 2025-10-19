'use client';

import { startTransition, useOptimistic, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useCardContext } from './CardContext';
import { deleteBoard, updateBoard } from '../lib/actions';
import { usePathname, useRouter } from 'next/navigation';
import { useOptimisticContext } from './OptimisticContextProvider';

export default function Header({ board }) {
  const router = useRouter();
  const boardId = +usePathname().slice(1);

  const { handleOptimisticBoards } = useOptimisticContext();

  const [optimisticBoardName, setOptimisticBoardName] = useOptimistic(
    board.name,
    (state, newBoardName) => newBoardName
  );

  const [isEditing, setIsEditing] = useState(false);
  const [clientBoardName, setClientBoardName] = useState(
    () => optimisticBoardName
  );

  async function handleBoard() {
    setIsEditing(false);
    if (clientBoardName === optimisticBoardName || !clientBoardName) return;
    setOptimisticBoardName(clientBoardName);
    await updateBoard({ id: boardId, newBoardName: clientBoardName });
  }

  async function handleDelete() {
    router.push('/');
    startTransition(() => {
      handleOptimisticBoards({ type: 'delete', payload: boardId });
    });
    await deleteBoard(boardId);
    router.refresh();
  }

  return (
    <header className="flex items-center gap-2 max-w-20 rounded-sm text-white font-semibold">
      {isEditing ? (
        <input
          type="text"
          value={clientBoardName}
          onChange={(e) => setClientBoardName(e.target.value)}
          onBlur={handleBoard}
          spellCheck="false"
          autoFocus
          className="text-black border-none outline-none px-4 py-2 max-w-60"
        />
      ) : (
        <span
          className="bg-sky-400 hover:bg-sky-500 px-4 py-2 min-w-60 min-h-10 rounded-md cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          {optimisticBoardName}
        </span>
      )}
      <button
        className="bg-sky-400 hover:bg-sky-500 rounded-md flex items-center px-3 py-1 min-h-10 cursor-pointer"
        onClick={handleDelete}
      >
        <FaTrash />
      </button>
    </header>
  );
}
