'use client';

import BtnAddList from './BtnAddList';
import { useState } from 'react';
import KanbanColumn from './KanbanColumn';
import { useCardContext } from './CardContext';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function KanbanList({ id }) {
  const [isAdding, setIsAdding] = useState(false);

  const { columns, setColumns } = useCardContext();

  const columnNameList = columns.map((column) => column.columnName);

  function handleDragEnd(result) {
    console.log('Drag ended:', result);
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'COLUMN') {
      const boardColumns = columns.filter((col) => col.id === id);
      const otherColumns = columns.filter((col) => col.id !== id);

      const newBoardColumns = Array.from(boardColumns);
      const [reorderedColumn] = newBoardColumns.splice(source.index, 1);
      newBoardColumns.splice(destination.index, 0, reorderedColumn);

      setColumns([...otherColumns, ...newBoardColumns]);
      return;
    }

    const sourceColumn = columns.find(
      (col) => col.columnName === source.droppableId
    );
    const destColumn = columns.find(
      (col) => col.columnName === destination.droppableId
    );

    const card = sourceColumn.cards.find((card) => card.id === draggableId);

    if (!card) return;

    const newColumns = columns.map((column) => {
      if (column.columnName === source.droppableId) {
        const newCards = Array.from(column.cards);
        newCards.splice(source.index, 1);
        return { ...column, cards: newCards };
      }

      if (column.columnName === destination.droppableId) {
        const newCards = Array.from(column.cards);
        newCards.splice(destination.index, 0, card);
        return { ...column, cards: newCards };
      }

      return column;
    });

    setColumns(newColumns);
  }

  function handleSubmit(formData) {
    const columnName = formData.get('columnName');

    const isColumnExist = columnNameList.some(
      (column) => column.toLowerCase() === columnName.toLowerCase()
    );

    if (!columnName || isColumnExist) return;
    setColumns((columns) => [
      ...columns,
      {
        id,
        columnId: `column-${Date.now()}`,
        columnName,
        cards: [],
      },
    ]);
    setIsAdding(false);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-wrap gap-2 mt-2"
          >
            {columns?.map((column, index) =>
              column.id === id ? (
                <Draggable
                  key={column.columnId}
                  draggableId={column.columnId}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`${snapshot.isDragging ? 'shadow-lg' : ''}`}
                    >
                      <KanbanColumn
                        columnName={column.columnName}
                        cards={column.cards}
                        column={column}
                        id={column.id}
                      />
                    </div>
                  )}
                </Draggable>
              ) : null
            )}
            {provided.placeholder}
            <BtnAddList
              isAdding={isAdding}
              setIsAdding={setIsAdding}
              onSubmit={handleSubmit}
            />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
