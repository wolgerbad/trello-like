'use server';

import { revalidatePath } from 'next/cache';
import { auth } from './auth';
import { headers } from 'next/headers';
import { supabase } from './supabase';
export async function signIn(email, password) {
  try {
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: await headers(),
    });
    revalidatePath('/');
    revalidatePath('/login');
    return result;
  } catch (error) {
    return error.message;
  }
}

export async function signUp(name, email, password) {
  const result = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });

  return result;
}

export async function signOut() {
  await auth.api.signOut({ headers: await headers() });
  revalidatePath('/');
}

// **********************BOARD OPERATIONS*********************

export async function addNewBoard(newBoard) {
  const { data, error } = await supabase
    .from('board')
    .insert([newBoard])
    .select();

  revalidatePath('/');
}

export async function updateBoard({ id, newBoardName }) {
  const { data, error } = await supabase
    .from('board')
    .update({ name: newBoardName })
    .eq('id', id)
    .select();

  revalidatePath('/');
}

export async function deleteBoard(id) {
  const { error } = await supabase.from('board').delete().eq('id', id);

  console.log('delete error:', error);

  revalidatePath('/');
}

// *************COLUMN OPERATIONS**************

export async function addNewColumn(newColumn) {
  const { data, error } = await supabase
    .from('column')
    .insert([newColumn])
    .select();

  revalidatePath(`/${newColumn.board_id}`);
}

export async function updateColumn({ id, newColumnName, boardId }) {
  const { data, error } = await supabase
    .from('column')
    .update({ name: newColumnName })
    .eq('id', id)
    .select();

  revalidatePath(`/${boardId}`);
}

export async function deleteColumn({ id, boardId }) {
  const { error } = await supabase.from('column').delete().eq('id', id);

  revalidatePath(`/${boardId}`);
}

//************** CARD OPERATIONS ******************

export async function addNewCard(newCard, boardId) {
  const { data, error } = await supabase
    .from('card')
    .insert([newCard])
    .select();

  revalidatePath(`/${boardId}`);
}

export async function deleteCard(id) {
  const { error } = await supabase.from('card').delete().eq('id', id);
}

export async function updateCard(id, updatedCard) {
  const { data, error } = await supabase
    .from('card')
    .update(updatedCard)
    .eq('id', id)
    .select();
}
