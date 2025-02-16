import Head from "next/head";
import { AuthContainer } from "../components/auth/AuthContainer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Marketplace - Buy & Sell</title>
        <meta
          name="description"
          content="A marketplace for buyers and sellers"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to our Marketplace
        </h1>
        <AuthContainer />
      </main>
    </div>
  );
}
