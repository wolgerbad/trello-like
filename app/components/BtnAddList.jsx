'use client';

import { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import Button from './Button';

export default function BtnAddList({ isAdding, setIsAdding, onSubmit }) {
  return (
    <div>
      {isAdding ? (
        <form action={onSubmit} className="bg-gray-200 p-2 min-w-[17rem]">
          <input
            type="text"
            className=" w-full outline-blue-500 p-1"
            name="columnName"
            autoFocus
          />
          <div className="flex gap-1 mt-1">
            <Button type="add">Add a list</Button>
            <Button onClick={() => setIsAdding(false)} type="delete">
              <FaTimes />
            </Button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="text-white self-start bg-blue-300 hover:bg-blue-400  min-w-[17rem] p-2"
        >
          <span className="flex items-center gap-1">
            <FaPlus />
            Add a list
          </span>
        </button>
      )}
    </div>
  );
}
