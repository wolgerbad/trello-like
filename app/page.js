import BoardList from './components/BoardList';
import CreateBoard from './components/CreateBoard';

export default function Home() {
  return (
    <div className="flex flex-col mt-20 max-w-[60rem] mx-auto">
      <h2 className="uppercase font-semibold text-gray-700 mb-8">
        Your Boards
      </h2>
      <div className="flex flex-wrap gap-6">
        <BoardList />
      </div>
    </div>
  );
}
