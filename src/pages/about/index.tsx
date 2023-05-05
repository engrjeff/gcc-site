import Head from "next/head";
import Container from "@/components/Container";

function AboutPage() {
  return (
    <div>
      <Head>
        <title>Grace City Church - About</title>
      </Head>
      <Container>
        <div className='py-10'>
          <h1 className='text-2xl font-bold'>About Grace City Church</h1>
        </div>
      </Container>
    </div>
  );
}

export default AboutPage;
