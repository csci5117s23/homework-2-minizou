import { SignIn } from "@clerk/nextjs";
import { Center } from '@mantine/core';

const SignInPage = () => (
  <Center maw={400} h={700} mx="auto">
    <SignIn 
      appearance={{
        layout: {
          socialButtonsPlacement: 'bottom',
        },
        variables: {
          colorPrimary: '#F4B32D',
          colorBackground: '#2B2C2F',
        }
      }}
    />
  </Center>
);
export default SignInPage;