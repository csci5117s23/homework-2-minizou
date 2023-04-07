import { Inter } from 'next/font/google'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Link href="/todos">todos</Link> <br />
      <Link href="/done">done</Link>
    </>
  )
}