export default function Button({ type, onClick, children, className = '' }) {
  const baseClasses =
    'px-2 py-1 rounded-sm font-medium transition-colors text-white';

  const typeClasses = {
    add: 'bg-blue-700 hover:bg-blue-800 text-white',
    delete: 'bg-red-600 hover:bg-red-700 text-white',
  };

  return (
    <button
      type={type === 'add' ? 'submit' : 'button'}
      onClick={onClick}
      className={`${baseClasses} ${typeClasses[type]} ${className} h-8`}
    >
      {children}
    </button>
  );
}
