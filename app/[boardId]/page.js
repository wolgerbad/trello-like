import { headers } from 'next/headers';
import Header from '../components/Header';
import KanbanList from '../components/KanbanList';
import { auth } from '../lib/auth';
import {
  getBoardById,
  getBoards,
  getCards,
  getColumnsById,
} from '../lib/helpers';
import { redirect } from 'next/navigation';

export default async function KanbanPage({ params }) {
  const session = await auth?.api?.getSession({ headers: await headers() });
  const userId = session?.session?.userId;
  const id = +params.boardId;

  const board = await getBoardById(id);

  const columns = await getColumnsById(id);

  const cards = await getCards(id);

  if (!board) redirect('/');
  if (!session?.user) redirect('/login');

  return (
    <div className="min-h-screen min-w-screen bg-sky-600 p-4">
      <Header board={board.at(0)} />
      <KanbanList columns={columns} cards={cards} />
    </div>
  );
}
