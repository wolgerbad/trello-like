'use client';

import { startTransition, useEffect, useState } from 'react';
import { FaEdit, FaList, FaTrash } from 'react-icons/fa';
import { deleteCard, updateCard } from '../lib/actions';
import { useRouter } from 'next/navigation';
import { IoClose } from 'react-icons/io5';

export default function ModalCard({
  card,
  setIsActive,
  handleOptimisticCards,
}) {
  const router = useRouter();

  const [isEditingCardContent, setIsEditingCardContent] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [clientCardContent, setClientCardContent] = useState(
    () => card.content
  );
  const [clientCardDescription, setClientCardDescription] = useState(
    () => card.description
  );

  async function handleEdit() {
    if (
      clientCardContent !== card.content ||
      clientCardDescription !== card.description
    )
      startTransition(async () => {
        handleOptimisticCards({
          type: 'edit',
          payload: {
            id: card.id,
            content: clientCardContent,
            description: clientCardDescription,
          },
        });
        await updateCard(card.id, {
          content: clientCardContent,
          description: clientCardDescription,
        });

        router.refresh();
      });
  }

  async function handleDelete() {
    startTransition(async () => {
      setIsActive(false);
      handleOptimisticCards({ type: 'delete', payload: card.id });
      await deleteCard(card.id);
      router.refresh();
    });
  }

  return (
    <div className="fixed w-screen h-screen flex justify-center items-center bg-black/30 backdrop-blur-sm z-10000 top-0 left-0 cursor-default">
      <div className="w-[60rem] min-h-[22rem] bg-gray-100 p-4">
        <div className="flex justify-between gap-12 relative">
          <IoClose
            className="absolute top-0 right-0 text-xl cursor-pointer"
            onClick={() => setIsActive(false)}
          />
          <div className="w-2/3">
            <div className="mb-8">
              <div className="flex items-center gap-2">
                <FaEdit />
                {isEditingCardContent ? (
                  <input
                    type="text"
                    className="outline-blue-500 p-1"
                    value={clientCardContent}
                    onChange={(e) => setClientCardContent(e.target.value)}
                    autoFocus
                    onBlur={async () => {
                      setIsEditingCardContent(false);
                      await handleEdit();
                    }}
                  />
                ) : (
                  <span
                    className="p-1"
                    onClick={() => setIsEditingCardContent(true)}
                  >
                    {clientCardContent}
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
                  onBlur={async () => {
                    setIsEditingDescription(false);
                    await handleEdit();
                  }}
                  value={clientCardDescription}
                  onChange={(e) => setClientCardDescription(e.target.value)}
                />
              ) : (
                <div
                  className="ml-7 w-full h-10 bg-gray-300 p-2 transition-[height] ease duration-1000"
                  onClick={() => setIsEditingDescription(true)}
                >
                  {clientCardDescription}
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
