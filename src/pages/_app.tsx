import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileMenu from "@/components/MobileMenu";

import NProgress from "nprogress";
import "@/styles/nprogress.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

NProgress.configure({ showSpinner: false });

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteDone);
    router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteDone);
      router.events.off("routeChangeError", handleRouteDone);
    };
  }, [router.events]);

  return (
    <div
      className={`${poppins.variable} dark:bg-coolnavy font-sans dark:text-white bg-white text-coolnavy`}
    >
      <Head>
        <title>Grace City Church</title>
        <meta
          name='description'
          content='The official website of Grace City Church'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ThemeProvider attribute='class'>
        <Header />
        <MobileMenu />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </ThemeProvider>
    </div>
  );
}
