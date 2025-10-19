'use client';

import { useState } from 'react';
import ModalCard from './ModalCard';

export default function KanbanCard({ card, handleOptimisticCards }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div
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
