import Head from "next/head";
import Container from "@/components/Container";

function GospelPage() {
  return (
    <div>
      <Head>
        <title>Grace City Church - Gospel</title>
      </Head>
      <Container>
        <div className='py-10'>
          <h1 className='text-2xl font-bold'>The Gospel of Jesus Christ</h1>
        </div>
      </Container>
    </div>
  );
}

export default GospelPage;
