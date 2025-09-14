import Header from '../components/Header';
import KanbanList from '../components/KanbanList';

export default function KanbanPage({ params }) {
  const id = +params.boardId;

  return (
    <div className="min-h-screen min-w-screen bg-blue-500 p-4">
      <Header id={id} />
      <KanbanList id={id} />
    </div>
  );
}
