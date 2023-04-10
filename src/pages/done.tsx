import { SignedIn, SignedOut } from "@clerk/nextjs";
import SignInPage from "./signin";
import { HeaderSimple } from "@/components/header";

export default function Done() {
  return (
    <>
      <SignedIn>
        <HeaderSimple />
      </SignedIn>
      <SignedOut>
        <SignInPage />
      </SignedOut>
    </>
  )
}
