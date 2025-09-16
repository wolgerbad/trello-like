'use client';

import { useEffect, useState } from 'react';
import { FaEdit, FaList, FaTrash } from 'react-icons/fa';
import { useCardContext } from './CardContext';

export default function ModalCard({ selectedCard, setSelectedCard, onClose }) {
  const [isEditingCardName, setIsEditingCardName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [tempCardName, setTempCardName] = useState(() => selectedCard.content);
  const [tempDescription, setTempDescription] = useState(
    () => selectedCard.description
  );

  const { columns, setColumns } = useCardContext();

  console.log(tempCardName, tempDescription);

  function handleDelete() {
    setColumns((columns) =>
      columns.map((column) => {
        return {
          id: column.id,
          columnName: column.columnName,
          cards: column.cards.filter((card) => card.id !== selectedCard.id),
        };
      })
    );
    setSelectedCard(null);
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && tempCardName) {
        onClose(tempCardName, tempDescription);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [tempCardName, tempDescription]);

  return (
    <div className="fixed w-screen h-screen flex justify-center items-center bg-black/30 backdrop-blur-sm z-10000 top-0 left-0 cursor-default">
      <div className="w-[60rem] min-h-[22rem] bg-gray-100 p-4">
        <div className="flex justify-between gap-12">
          <div className="w-2/3">
            <div className="mb-8">
              <div className="flex items-center gap-2">
                <FaEdit />
                {isEditingCardName ? (
                  <input
                    type="text"
                    className="outline-blue-500 p-1"
                    value={tempCardName}
                    onChange={(e) => setTempCardName(e.target.value)}
                    autoFocus
                    onBlur={() => setIsEditingCardName(false)}
                  />
                ) : (
                  <span
                    className="p-1"
                    onClick={() => setIsEditingCardName(true)}
                  >
                    {tempCardName}
                  </span>
                )}
              </div>
              <p className="text-gray-400 ml-7 ">Done</p>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <FaList />
                <span className="p-1">Description</span>
              </div>

              {isEditingDescription ? (
                <textarea
                  className="ml-7 p-1 w-full outline-blue-600 transition-[height] ease duration-1000"
                  rows={5}
                  autoFocus
                  onBlur={() => setIsEditingDescription(false)}
                  value={tempDescription}
                  onChange={(e) => setTempDescription(e.target.value)}
                />
              ) : (
                <div
                  className="ml-7 w-full h-10 bg-gray-300 p-2 transition-[height] ease duration-1000"
                  onClick={() => setIsEditingDescription(true)}
                >
                  {tempDescription}
                </div>
              )}
            </div>
          </div>
          <div className="w-1/3 self-center">
            <p className="uppercase text-gray-400">Actions</p>
            <button
              className="flex gap-2 items-center bg-red-600 w-full px-2 py-1 text-white mt-1"
              onClick={handleDelete}
            >
              <FaTrash />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
