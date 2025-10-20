'use client';

import BtnAddList from './BtnAddList';
import { startTransition, useOptimistic, useState } from 'react';
import KanbanColumn from './KanbanColumn';
import { useCardContext } from './CardContext';
import { addNewColumn, updateCard } from '../lib/actions';
import { usePathname } from 'next/navigation';
import { DndContext } from '@dnd-kit/core';

export default function KanbanList({ columns, cards, boards }) {
  const pathname = +usePathname().slice('1');

  const [listName, setListName] = useState('');

  const [isAdding, setIsAdding] = useState(false);

  const [optimisticCards, handleOptimisticCards] = useOptimistic(
    cards,
    (state, action) => {
      switch (action.type) {
        case 'add':
          return [...state, action.payload];

        case 'delete':
          return state.filter((c) => c.id !== action.payload);

        case 'edit':
          return state.map((c) =>
            c.id === action.payload.id
              ? {
                  ...c,
                  content: action.payload.content,
                  description: action.payload.description,
                }
              : c
          );
        case 'drag':
          console.log('dragevent');
          return state.map((card) =>
            card.id === action.payload.cardId
              ? { ...card, column_id: action.payload.column_id }
              : card
          );
      }
    }
  );
  console.log('optimisticCards:', optimisticCards);

  const [optimisticColumns, handleOptimisticColumns] = useOptimistic(
    columns,
    (state, action) => {
      switch (action.type) {
        case 'add':
          return [...state, action.payload];

        case 'delete':
          return state.filter((column) => column.id !== action.payload);
      }
    }
  );

  const columnNameList = columns.map((column) => column.name);

  async function handleSubmit() {
    setIsAdding(false);
    const randomId = Math.floor(Math.random() * 10000);
    const columnName = listName;

    const isColumnExist = columnNameList.some(
      (column) => column.toLowerCase() === columnName.toLowerCase()
    );

    const newColumn = { id: randomId, name: columnName, board_id: pathname };

    if (!columnName || isColumnExist) return;

    setListName('');

    handleOptimisticColumns({ type: 'add', payload: newColumn });

    await addNewColumn(newColumn);
  }

  async function handleDragEnd(event) {
    const { over, active } = event;
    console.log('over:', over);
    console.log('active:', active);
    if (!over) return;

    const cardId = active.id;
    const newColumnId = over.id;
    console.log(cardId, newColumnId);

    if (!cardId || !newColumnId) return;

    startTransition(() =>
      handleOptimisticCards({
        type: 'drag',
        payload: { cardId, column_id: newColumnId },
      })
    );

    await updateCard(cardId, { column_id: newColumnId });
  }

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      <DndContext onDragEnd={handleDragEnd}>
        {optimisticColumns?.map((column) => (
          <KanbanColumn
            key={column.id}
            cards={cards}
            column={column}
            handleColumns={handleOptimisticColumns}
            optimisticCards={optimisticCards}
            handleOptimisticCards={handleOptimisticCards}
          />
        ))}
      </DndContext>

      <BtnAddList
        isAdding={isAdding}
        setIsAdding={setIsAdding}
        onSubmit={handleSubmit}
        listName={listName}
        setListName={setListName}
      />
    </div>
  );
}
