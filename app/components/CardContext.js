'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const CardContext = createContext();

export default function CardContextProvider({ children }) {
  const [boardList, setBoardList] = useState(() => {
    const storedBoardList = JSON.parse(localStorage.getItem('boardList')) || [
      {
        boardName: 'Kanban',
        id: 1,
      },
    ];
    return storedBoardList;
  });

  const [columns, setColumns] = useState(() => {
    const storedColumns = JSON.parse(localStorage.getItem('columns')) || [
      {
        id: 1,
        columnId: 'column-1',
        columnName: 'Todo',
        cards: [
          { id: 'card-1', content: 'clean up', description: '' },
          { id: 'card-2', content: 'do fish', description: '' },
        ],
      },
      {
        id: 1,
        columnId: 'column-2',
        columnName: 'In progress',
        cards: [
          { id: 'card-3', content: 'hunt frog', description: '' },
          { id: 'card-4', content: 'training', description: '' },
        ],
      },
      {
        id: 1,
        columnId: 'column-3',
        columnName: 'Done',
        cards: [
          { id: 'card-5', content: 'Eat a lion', description: '' },
          { id: 'card-6', content: 'Drink water', description: '' },
        ],
      },
    ];

    return storedColumns;
  });

  useEffect(
    function () {
      localStorage.setItem('boardList', JSON.stringify(boardList));
      localStorage.setItem('columns', JSON.stringify(columns));
    },
    [boardList, columns]
  );

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
