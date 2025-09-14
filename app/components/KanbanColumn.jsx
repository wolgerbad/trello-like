'use client';

import { useEffect, useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useCardContext } from './CardContext';
import Button from './Button';
import ModalCard from './ModalCard';

export default function KanbanColumn({ columnName, cards, id }) {
  const { columns, setColumns } = useCardContext();

  const [isEditing, setIsEditing] = useState(false);
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  function handleChange(e) {
    setColumns((columns) =>
      columns.map((column) =>
        column.columnName === columnName
          ? { columnName: e.target.value, cards: column.cards, id: column.id }
          : column
      )
    );
  }

  function handleAddCard(formData) {
    const card = formData.get('card');
    setColumns((columns) =>
      columns.map((column) =>
        column.columnName === columnName
          ? { ...column, cards: [...column.cards, card] }
          : column
      )
    );
  }

  function handleDelete() {
    setColumns((columns) =>
      columns.filter((column) => column.columnName !== columnName)
    );
  }

  function handleBlur(e) {
    if (!e.target.value) setIsAddingTodo(false);
  }

  function handleModalClose(cardName) {
    console.log(selectedCard, cardName);
    setColumns((columns) =>
      columns.map((column) => {
        return {
          id: column.id,
          columnName: column.columnName,
          cards: column.cards.map((card) =>
            card === selectedCard ? cardName : card
          ),
        };
      })
    );
    setSelectedCard(null);
  }

  return (
    <>
      <div className="bg-gray-200 w-[20rem] h-fit flex flex-col gap-4 rounded-sm p-2 cursor-move">
        <div className="flex justify-between items-center gap-2">
          <div className="w-full">
            {isEditing ? (
              <input
                type="text"
                value={columnName}
                onChange={handleChange}
                onBlur={() => setIsEditing(false)}
                spellCheck="false"
                autoFocus
                className="text-black border-none outline-none px-2 py-1 w-full"
              />
            ) : (
              <span className="px-2" onClick={() => setIsEditing(true)}>
                {columnName}
              </span>
            )}
          </div>
          <span
            onClick={handleDelete}
            className="bg-gray-300 hover:bg-gray-400  text-gray-700 cursor-pointer rounded-md p-2"
          >
            <FaTrash />
          </span>
        </div>
        {cards?.map((card) => (
          <div
            key={card}
            className="bg-white border-1 border-black px-2 py-1 hover:bg-gray-100 cursor-pointer"
            onClick={() => setSelectedCard(card)}
          >
            {card}
          </div>
        ))}
        {isAddingTodo ? (
          <form action={handleAddCard} className="flex flex-col gap-1">
            <textarea
              name="card"
              placeholder="Enter a title for this card.."
              className="p-2"
              autoFocus
              onBlur={handleBlur}
              cols={5}
              rows={3}
            />
            <span className="flex gap-1 items-center">
              <Button type="add">Add card</Button>
              <Button type="delete">
                <FaTrash />
              </Button>
            </span>
          </form>
        ) : (
          <button
            onClick={() => setIsAddingTodo(true)}
            className="text-gray-700 hover:bg-gray-300 px-2 py-1"
          >
            <span className="flex items-center gap-0.5">
              <FaPlus />
              Add a card
            </span>
          </button>
        )}
      </div>
      {selectedCard && (
        <ModalCard
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          columnName={columnName}
          onClose={handleModalClose}
        />
      )}
    </>
  );
}
