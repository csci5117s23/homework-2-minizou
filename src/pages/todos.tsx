import { SignedIn, SignedOut, UserButton, useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import SignInPage from './signin';

export default function Todos() {
  // const { isLoaded, userId, sessionId, getToken } = useAuth();
  return (<>
    <SignedIn>
      cool!
      <UserButton 
      appearance={{
        variables: {
          colorPrimary: '#F4B32D',
          colorBackground: '#2B2C2F',
        }
      }}
      afterSignOutUrl="/"/>
    </SignedIn>
    <SignedOut>
      <SignInPage />
    </SignedOut>
  </>)
}
