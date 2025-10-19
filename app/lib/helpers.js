import { supabase } from './supabase';

export async function getBoards(userId) {
  let { data: board, error } = await supabase
    .from('board')
    .select('*')
    .eq('user_id', userId);

  if (error) console.error(error.message);

  return board;
}

export async function getBoardById(id) {
  let { data: board, error } = await supabase
    .from('board')
    .select('*')
    .eq('id', id);

  if (error) console.error(error.message);

  return board;
}

export async function getColumnsById(boardId) {
  let { data, error } = await supabase
    .from('column')
    .select('*')
    .eq('board_id', boardId);

  if (error) console.error(error.message);

  return data;
}

export async function getCards(boardId) {
  let { data, error } = await supabase
    .from('card')
    .select('*')
    .eq('board_id', boardId);

  if (error) console.error(error.message);

  return data;
}

export async function getCardsById(columnId) {
  let { data, error } = await supabase
    .from('card')
    .select('*')
    .eq('column_id', columnId);

  if (error) console.error(error.message);

  return data;
}
