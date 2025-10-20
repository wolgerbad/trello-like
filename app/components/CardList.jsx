'use client';

import { useDroppable } from '@dnd-kit/core';
import KanbanCard from './KanbanCard';

export default function CardList({
  cards,
  columnId,
  handleOptimisticCards,
  setSelectedCard,
}) {
  return (
    <div className="flex flex-col gap-2">
      {cards?.map((card, index) =>
        card.column_id === columnId ? (
          <KanbanCard
            key={card.id}
            card={card}
            setSelectedCard={setSelectedCard}
            handleOptimisticCards={handleOptimisticCards}
          />
        ) : null
      )}
    </div>
  );
}
