'use client';

import Link from 'next/link';
import { signIn } from '../lib/actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';

export default function LoginClient() {
  const [error, setError] = useState('');

  const router = useRouter();

  async function handleLogin(formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    const result = await signIn(email, password);
    if (!result?.user) setError(result);
    else router.refresh();
  }

  return (
    <div className="m-10 max-w-60">
      <form className="flex flex-col gap-2" action={handleLogin}>
        <div>
          <label className="block">Email:</label>
          <input
            type="email"
            name="email"
            required
            className="border-2 border-gray-900 w-full px-2 py-0.5"
          />
        </div>
        <div>
          <label className="block">Password:</label>
          <input
            type="password"
            name="password"
            className="border-2 border-gray-900 w-full px-2 py-0.5"
          />
        </div>
        <div className="self-end mb-8">
          <LoginButton />
        </div>
      </form>
      <div className="flex justify-between">
        Have no account?{' '}
        <Link href="/signup" className="underline decoration-blue-500">
          Sign Up!
        </Link>
      </div>
      <div className="flex justify-between">
        Forgot your password?{' '}
        <Link href="reset" className="underline decoration-blue-500">
          Reset it
        </Link>
      </div>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className={`${
        pending ? 'bg-gray-200 cursor-not-allowed' : ''
      } border-2 border-gray-900 px-4 py-1`}
    >
      {pending ? 'Logging in..' : 'Log in'}
    </button>
  );
}
