'use client';

import { startTransition, useEffect, useOptimistic, useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Button from './Button';
import ModalCard from './ModalCard';
import {
  addNewCard,
  deleteColumn,
  updateCard,
  updateColumn,
} from '../lib/actions';
import KanbanCard from './KanbanCard';
import CardList from './CardList';
import { DndContext, useDroppable } from '@dnd-kit/core';

export default function KanbanColumn({
  column,
  cards,
  handleColumns,
  optimisticCards,
  handleOptimisticCards,
}) {
  const { name: columnName, id: columnId, board_id: boardId } = column;

  const [clientColumnName, setClientColumnName] = useState(() => columnName);
  const [cardContent, setCardContent] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);

  async function handleColumnBlur() {
    setIsEditing(false);

    if (columnName !== clientColumnName && clientColumnName.length > 0)
      await updateColumn({
        id: columnId,
        newColumnName: clientColumnName,
        boardId,
      });
    else console.log('huuh');
  }

  async function handleAddCard() {
    const randomId = Math.floor(Math.random() * 10000);
    const newCard = {
      id: randomId,
      content: cardContent,
      description: '',
      column_id: columnId,
      board_id: boardId,
    };

    if (!cardContent) {
      setIsAddingCard(false);
      return;
    }

    handleOptimisticCards({ type: 'add', payload: newCard });
    setIsAddingCard(false);
    setCardContent('');
    await addNewCard(newCard, boardId);
  }

  async function handleDelete() {
    handleColumns({ type: 'delete', payload: columnId });
    await deleteColumn({ id: columnId, boardId });
  }

  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div
      className="bg-gray-200 w-[20rem] h-fit flex flex-col gap-4 rounded-sm p-2 cursor-move"
      ref={setNodeRef}
    >
      <div className="flex justify-between items-center gap-2">
        <div className="w-full">
          {isEditing ? (
            <input
              type="text"
              value={clientColumnName}
              onChange={(e) =>
                startTransition(() => setClientColumnName(e.target.value))
              }
              onBlur={handleColumnBlur}
              spellCheck="false"
              autoFocus
              className="text-black border-none outline-none px-2 py-1 w-full"
            />
          ) : (
            <span className="px-2" onClick={() => setIsEditing(true)}>
              {clientColumnName}
            </span>
          )}
        </div>
        <button
          onClick={handleDelete}
          className="bg-gray-300 hover:bg-gray-400  text-gray-700 cursor-pointer rounded-md p-2"
        >
          <FaTrash />
        </button>
      </div>
      <div>
        <CardList
          cards={optimisticCards}
          columnId={columnId}
          handleOptimisticCards={handleOptimisticCards}
        />
      </div>

      {isAddingCard ? (
        <div className="flex flex-col gap-1">
          <textarea
            value={cardContent}
            onChange={(e) => setCardContent(e.target.value)}
            placeholder="Enter a title for this card.."
            className="p-2"
            autoFocus
            cols={5}
            rows={3}
          />
          <span className="flex gap-1 items-center">
            <button
              onClick={handleAddCard}
              className="px-2 py-1 rounded-sm font-medium transition-colors bg-sky-700 hover:bg-sky-800 text-white"
            >
              Add card
            </button>
            <Button
              type="delete"
              onClick={() => {
                setCardContent('');
                setIsAddingCard(false);
              }}
            >
              <FaTrash />
            </Button>
          </span>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingCard(true)}
          className="text-gray-700 hover:bg-gray-300 px-2 py-1 "
        >
          <span className="flex items-center gap-0.5">
            <FaPlus />
            Add a card
          </span>
        </button>
      )}
    </div>
  );
}
