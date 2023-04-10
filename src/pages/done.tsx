import { SignedIn, SignedOut } from "@clerk/nextjs";
import SignInPage from "./signin";
import HeaderCustom from "@/components/header";

export default function Done() {
  return (
    <>
      <SignedIn>
        <HeaderCustom />
      </SignedIn>
      <SignedOut>
        <SignInPage />
      </SignedOut>
    </>
  )
}
