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
          content='The official website of Grace City Church. Proclaiming Christ, equipping the saints, making disciples of all nations.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta
          name='og:image'
          content='https://sqvuqvilgpdrocmzrsvw.supabase.co/storage/v1/object/public/gcc-sermons/thumbnails/og-image.jpg?t=2023-04-04T07%3A08%3A20.487Z'
        />

        <link
          rel='apple-touch-icon'
          sizes='57x57'
          href='/apple-icon-57x57.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='60x60'
          href='/apple-icon-60x60.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='72x72'
          href='/apple-icon-72x72.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='76x76'
          href='/apple-icon-76x76.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='114x114'
          href='/apple-icon-114x114.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='120x120'
          href='/apple-icon-120x120.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='144x144'
          href='/apple-icon-144x144.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='152x152'
          href='/apple-icon-152x152.png'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-icon-180x180.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='192x192'
          href='/android-icon-192x192.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='96x96'
          href='/favicon-96x96.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/manifest.json' />
        <meta name='msapplication-TileColor' content='#0F172A' />
        <meta name='msapplication-TileImage' content='/ms-icon-144x144.png' />
        <meta name='theme-color' content='#0F172A' />
      </Head>
      <ThemeProvider attribute='class'>
        <div className='flex flex-col min-h-screen'>
          <Header />
          <MobileMenu />
          <main className='flex-1 pb-16'>
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </div>
  );
}
