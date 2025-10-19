'use client';

import Link from 'next/link';
import { signUp } from '../lib/actions';
import { useFormStatus } from 'react-dom';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpClient() {
  const [error, setError] = useState('');

  const router = useRouter();

  async function handleSignUp(formData) {
    setError('');
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    const result = await signUp(name, email, password);

    if (!result?.user) setError(result);
    else router.refresh();
  }

  return (
    <div className="m-10 max-w-60">
      <form className="flex flex-col gap-2" action={handleSignUp}>
        <div>
          <label className="block">Name:</label>
          <input
            name="name"
            type="text"
            className="border-2 border-gray-900 w-full px-2 py-0.5"
          />
        </div>
        <div>
          <label className="block">Email:</label>
          <input
            name="email"
            type="email"
            className="border-2 border-gray-900 w-full px-2 py-0.5"
          />
        </div>
        <div>
          <label className="block">Password</label>
          <input
            name="password"
            type="password"
            className="border-2 border-gray-900 w-full px-2 py-0.5"
          />
        </div>
        <div className="self-end mb-4">
          <SignUpButton />
        </div>
      </form>
      <div>
        Already have an account?{' '}
        <Link href="/login" className="underline decoration-blue-600">
          Log In!
        </Link>
      </div>
    </div>
  );
}

function SignUpButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={`${
        pending ? 'bg-gray-200 cursor-not-allowed' : ''
      } border-2 border-gray-900 px-3 py-1`}
    >
      {pending ? 'Signing up..' : 'Sign Up'}
    </button>
  );
}
