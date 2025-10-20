export default function CreateBoard({ setIsModalOpen }) {
  return (
    <div
      onClick={() => setIsModalOpen(true)}
      className="text-gray-700 bg-gray-200 hover:bg-gray-300 flex items-center justify-center w-56 h-32 p-2 rounded-md cursor-pointer"
    >
      Create new board
    </div>
  );
}
