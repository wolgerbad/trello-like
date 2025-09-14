'use client';

import BtnAddList from './BtnAddList';
import { useState } from 'react';
import KanbanColumn from './KanbanColumn';
import { useCardContext } from './CardContext';

export default function KanbanList({ id }) {
  const [isAdding, setIsAdding] = useState(false);

  const { columns, setColumns } = useCardContext();

  const columnNameList = columns.map((column) => column.columnName);

  function handleSubmit(formData) {
    const columnName = formData.get('columnName');

    const isColumnExist = columnNameList.some(
      (column) => column.toLowerCase() === columnName.toLowerCase()
    );

    if (!columnName || isColumnExist) return;
    setColumns((columns) => [
      ...columns,
      {
        columnName,
        cards: [],
        id,
      },
    ]);
    setIsAdding(false);
  }

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {columns?.map(
        (column) =>
          column.id === id && (
            <KanbanColumn
              key={column.cards}
              columnName={column.columnName}
              cards={column.cards}
              column={column}
              id={column.id}
            />
          )
      )}
      <BtnAddList
        isAdding={isAdding}
        setIsAdding={setIsAdding}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
