'use client';

import { useState } from 'react';
import ModalCard from './ModalCard';
import { useDraggable } from '@dnd-kit/core';

export default function KanbanCard({ card, handleOptimisticCards }) {
  const { setNodeRef, transform, listeners, attributes } = useDraggable({
    id: card.id,
  });
  const [isActive, setIsActive] = useState(false);

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <>
      <div
        {...listeners}
        {...attributes}
        ref={setNodeRef}
        style={style}
        className="bg-white border-1 border-black px-2 py-1 hover:bg-gray-100 cursor-pointer"
        key={card.id}
        onClick={() => setIsActive(true)}
      >
        {card.content}
      </div>
      {isActive && (
        <ModalCard
          card={card}
          setIsActive={setIsActive}
          handleOptimisticCards={handleOptimisticCards}
          // onClose={handleModalClose}
        />
      )}
    </>
  );
}
