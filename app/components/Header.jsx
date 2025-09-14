'use client';

import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useCardContext } from './CardContext';

export default function Header({ id }) {
  const [isEditing, setIsEditing] = useState(false);
  const { boardList, setBoardList } = useCardContext();

  const boardName = boardList.find((board) => board.id === id).boardName;

  function handleBoard(e) {
    setBoardList((boardList) =>
      boardList.map((board) =>
        board.id === id ? { ...board, boardName: e.target.value } : board
      )
    );
  }

  return (
    <header className="flex items-center gap-2 max-w-20 rounded-sm text-white font-semibold">
      {isEditing ? (
        <input
          type="text"
          value={boardName}
          onChange={handleBoard}
          onBlur={() => setIsEditing(false)}
          spellCheck="false"
          autoFocus
          className="text-black border-none outline-none px-4 py-2 max-w-60"
        />
      ) : (
        <span
          className="bg-blue-300 px-4 py-2 min-w-60 min-h-10"
          onClick={() => setIsEditing(true)}
        >
          {boardName}
        </span>
      )}
      <span className="bg-blue-300 flex items-center px-3 py-1 rounded-sm min-h-10 cursor-pointer">
        <FaTrash />
      </span>
    </header>
  );
}
