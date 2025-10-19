'use client';

import BtnAddList from './BtnAddList';
import { useOptimistic, useState } from 'react';
import KanbanColumn from './KanbanColumn';
import { useCardContext } from './CardContext';
import { addNewColumn } from '../lib/actions';
import { usePathname } from 'next/navigation';

export default function KanbanList({ columns, cards, boards }) {
  const pathname = +usePathname().slice('1');

  const [listName, setListName] = useState('');

  const [isAdding, setIsAdding] = useState(false);

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

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {optimisticColumns?.map((column) => (
        <KanbanColumn
          key={column.id}
          cards={cards}
          column={column}
          handleColumns={handleOptimisticColumns}
        />
      ))}

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
