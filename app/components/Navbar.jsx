'use client';

import Link from 'next/link';
import { FaHome, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { signOut } from '../lib/actions';
import { useFormStatus } from 'react-dom';

export default function Navbar({ user }) {
  return (
    <nav className="flex justify-between p-1 bg-sky-700 items-center">
      <Link
        className="text-white bg-sky-500 hover:bg-opacity-50 p-1.5 rounded-sm text-xl"
        href="/"
      >
        <FaHome />
      </Link>
      <Link
        className="text-blue-200 tracking-wider font-semibold text-lg"
        href="/"
      >
        TrelloLike
      </Link>
      {user ? (
        <form action={signOut}>
          <SignoutButton />
        </form>
      ) : (
        <Link
          className="text-white bg-sky-500 hover:bg-opacity-50 p-1.5 rounded-sm text-xl"
          href="/login"
        >
          <FaSignInAlt />
        </Link>
      )}
    </nav>
  );
}

function SignoutButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={`${
        pending
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-sky-500 hover:bg-opacity-50'
      } text-white p-1.5 rounded-sm font-semibold`}
    >
      {pending ? <FaSignOutAlt /> : <FaSignOutAlt />}
    </button>
  );
}
