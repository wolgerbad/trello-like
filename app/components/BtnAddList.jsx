'use client';

import { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import Button from './Button';

export default function BtnAddList({
  isAdding,
  setIsAdding,
  onSubmit,
  listName,
  setListName,
}) {
  return (
    <div>
      {isAdding ? (
        <div className="bg-gray-200 p-2 min-w-[17rem]">
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            className=" w-full outline-blue-500 p-1"
            autoFocus
          />
          <div className="flex gap-1 mt-1">
            <button
              onClick={onSubmit}
              className="px-2 py-1 rounded-sm font-medium transition-colors bg-sky-700 hover:bg-sky-800 text-white"
            >
              Add a list
            </button>
            <Button onClick={() => setIsAdding(false)} type="delete">
              <FaTimes />
            </Button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="text-white self-start bg-sky-400 hover:bg-sky-500 rounded-sm min-w-[17rem] p-2"
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
