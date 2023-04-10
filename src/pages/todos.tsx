import { SignedIn, SignedOut, UserButton, useAuth } from '@clerk/nextjs';
import { HeaderSimple } from '../components/header';
import Link from 'next/link';
import SignInPage from './signin';
import Head from 'next/head';

// a text box and a submit button to create a new to-do item
// a list of to-do items that have not been marked “done”; sorted by most-recently created, and hyperlinked to /todo/:id. Each of these to-do items must have:
//     a summary of the to-do item’s contents (if the to-do item is too long to display, show a preview limited to one line)
//     a button or checkbox that allows you to mark a to-do item as “done”
// a link to visit /done


export default function Todos() {
  // const { isLoaded, userId, sessionId, getToken } = useAuth();
  return (<>
    <SignedIn>
      <HeaderSimple />
    </SignedIn>
    <SignedOut>
      <SignInPage />
    </SignedOut>
  </>)
}