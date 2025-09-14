'use client';

import { useCardContext } from './CardContext';
import BoardOverview from './BoardOverview';

export default function KanbanList() {
  const { boardList } = useCardContext();
  return (
    <>
      {boardList.map((board) => (
        <BoardOverview
          key={board.id}
          href={`/${board.id}`}
          name={board.boardName}
        />
      ))}
    </>
  );
}
