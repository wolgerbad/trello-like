'use client';

import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';

export default function ModalAddBoard({ setIsModalOpen, onCreate }) {
  const [boardName, setBoardName] = useState('');
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [setIsModalOpen]);

  return (
    <div className="fixed top-0 left-0 flex justify-center w-screen h-screen bg-black/30 backdrop-blur-sm">
      <div className="relative bg-blue-500 w-68 h-24 px-4 py-3 rounded-sm mt-20">
        <IoClose
          className="absolute top-1 right-0 text-lg font-semibold cursor-pointer text-gray-300"
          onClick={() => setIsModalOpen(false)}
        />
        <input
          type="text"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          placeholder="Add board title"
          className="bg-blue-500 mb-3 hover:bg-sky-500 block focus:bg-sky-500 outline-none text-white font-semibold text-md px-1"
        />
        <button
          className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white text-center"
          onClick={async () => {
            if (!boardName) return;
            setIsModalOpen(false);
            setBoardName('');
            await onCreate(boardName);
          }}
        >
          Create Board
        </button>
      </div>
    </div>
  );
}
