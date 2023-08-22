import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

const NextAuthWrapper = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

// TODO

export default NextAuthWrapper;
