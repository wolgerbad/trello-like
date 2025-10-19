'use client';

import KanbanCard from './KanbanCard';

export default function CardList({
  cards,
  columnId,
  handleOptimisticCards,
  setSelectedCard,
}) {
  return (
    <>
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
    </>
  );
}
