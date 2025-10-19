import Link from 'next/link';

export default function KanbanOverview({ href, name }) {
  return (
    <Link href={href}>
      <div className="text-white font-semibold bg-sky-600 w-56 h-32 p-2 rounded-md cursor-pointer">
        {name}
      </div>
    </Link>
  );
}
