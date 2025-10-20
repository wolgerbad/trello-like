import { headers } from 'next/headers';
import BoardList from './components/BoardList';
import CreateBoard from './components/CreateBoard';
import { auth } from './lib/auth';
import { redirect } from 'next/navigation';
import { getBoards } from './lib/helpers';

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;

  const boards = await getBoards(userId);

  if (!session?.user) redirect('/login');

  return (
    <div className="flex flex-col mt-20 max-w-[60rem] mx-auto">
      <h2 className="uppercase font-semibold text-gray-700 mb-8">
        {session?.user?.name}&apos;s Boards
      </h2>
      <div className="flex flex-wrap gap-6">
        <BoardList boards={boards} userId={userId} />
      </div>
    </div>
  );
}
