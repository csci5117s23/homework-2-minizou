import { SignUp } from "@clerk/nextjs";
import { Center } from '@mantine/core';

const SignUpPage = () => (
  <Center maw={400} h={700} mx="auto">
    <SignUp 
      signInUrl="/signin" redirectUrl="/todos"
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
export default SignUpPage;