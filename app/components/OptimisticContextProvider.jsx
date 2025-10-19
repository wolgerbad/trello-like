'use client';

const { createContext, useOptimistic, useContext } = require('react');

const OptimisticContext = createContext();

export default function OptimistContextProvider({ children, boards }) {
  const [optimisticBoards, handleOptimisticBoards] = useOptimistic(
    boards,
    (state, action) => {
      switch (action.type) {
        case 'delete':
          return state.filter((b) => b.id !== action.payload);

        case 'editName':
          return state.map((board) =>
            board.id === action.payload.id
              ? { ...board, name: action.payload.name }
              : board
          );

        case 'add':
          return [...state, action.payload];
      }
    }
  );

  console.log('optimistic boards:', optimisticBoards);

  return (
    <OptimisticContext.Provider
      value={{ optimisticBoards, handleOptimisticBoards }}
    >
      {children}
    </OptimisticContext.Provider>
  );
}

export function useOptimisticContext() {
  const ctx = useContext(OptimisticContext);
  if (!ctx)
    throw new Error('oops.. you probably used context outside of its scope');

  return ctx;
}
