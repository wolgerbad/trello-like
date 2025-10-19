import { headers } from 'next/headers';
import { auth } from '../lib/auth';
import SignUpClient from './SignUpClient';
import { redirect } from 'next/navigation';

export default async function signupPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user) redirect('/');

  return <SignUpClient />;
}
