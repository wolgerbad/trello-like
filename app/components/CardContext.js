'use client';

import { createContext, useContext, useState } from 'react';

const CardContext = createContext();

export default function CardContextProvider({ children }) {
  const [boardList, setBoardList] = useState([
    {
      boardName: 'Kanban',
      id: 1,
    },
  ]);

  const [columns, setColumns] = useState([
    {
      id: 1,
      columnName: 'Todo',
      cards: ['clean up', 'do fish'],
    },
    {
      id: 1,
      columnName: 'In progress',
      cards: ['hunt frog', 'training'],
    },
    {
      id: 2,
      columnName: 'Done',
      cards: ['Eat a lion', 'Drink water'],
    },
  ]);

  return (
    <CardContext.Provider
      value={{
        boardList,
        columns,
        setBoardList,
        setColumns,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}

export function useCardContext() {
  const context = useContext(CardContext);
  return context;
}
