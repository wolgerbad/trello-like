'use client';

import { useEffect } from 'react';

export default function ModalAddBoard({ setIsModalOpen, onCreate }) {
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
    <div className="fixed top-0 left-0 flex justify-center w-screen h-screen bg-black/30 backdrop-blur-sm ">
      <form
        action={onCreate}
        className="bg-blue-500 w-64 h-20 p-2 rounded-sm mt-20"
      >
        <input
          type="text"
          name="title"
          placeholder="Add board title"
          className="bg-blue-500 mb-2 hover:bg-blue-300 focus:bg-blue-300 text-gray-900 font-semibold"
        />
        <button className="px-2 py-1 bg-green-500 text-white text-center">
          Create Board
        </button>
      </form>
    </div>
  );
}
