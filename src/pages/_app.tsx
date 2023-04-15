// import '@/styles/globals.css'
// import type { AppProps } from 'next/app'

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes';
import HeaderCustom from '@/components/header';
import { useRouter } from 'next/router';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const router = useRouter();

  const showHeader = router.pathname !== "/";
  return (
    <ClerkProvider appearance={{ baseTheme: dark }} publishableKey={clerkPubKey} {...pageProps}>
      <Head>
        <title>minizou list</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colors: {
            brand: ['#BEEDCE', '#72B6A8', '#8FB99E', '#82AA93', '#769C87', '#6A8D7C', '#5E7E70', '#516F64', '#456059', '#39524D'],
          },
          primaryColor: 'brand',
          colorScheme: 'dark',
        }}
      >
        {showHeader && <HeaderCustom />}
        <Component {...pageProps} />
      </MantineProvider>
    </ClerkProvider>
  );
}