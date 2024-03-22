import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LoadingCircle } from "../components/Icons";
import { Orbis, useOrbis } from "@orbisclub/components";

function Home({ defaultPosts }) {
  const { orbis } = useOrbis();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadContexts();

    async function loadContexts() {
      let { data, error } = await orbis.api.from("orbis_contexts").select().eq('context', global.orbis_context).order('created_at', { ascending: false });
      setCategories(data);
    }
  }, []);

  return (
    <>
      <Head>
        <title key="title">Solana Community Forum | Discuss, Suggest, and Vote</title>
        <meta name="description" content="Welcome to the Solana Community Forum. Discuss, suggest, and vote on tools and DApps for the Solana ecosystem." key="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header />
        <main className="flex-grow">
          <HeroSection />
          <CategoriesSection categories={categories} loading={loading} />
        </main>
        <Footer />
      </div>
    </>
  );
}

const HeroSection = () => {
  return (
    <section className="h-screen bg-hero-pattern bg-cover flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to the Solana Community Forum</h1>
        <p className="text-lg mb-8">Discuss, suggest, and vote on tools and DApps for the Solana ecosystem.</p>
        <Link href="/create">
          <p className="btn-primary py-3 px-6 text-lg rounded-md bg-brand hover:bg-opacity-90 transition duration-300 ease-in-out">Create Post</p>
        </Link>
      </div>
    </section>
  );
};

const CategoriesSection = ({ categories, loading }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Explore Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <LoadingCircle />
          ) : (
            categories.map((category) => (
              <CategoryCard key={category.stream_id} category={category} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

const CategoryCard = ({ category }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:-translate-y-1">
      <h3 className="text-xl font-semibold mb-4">{category.content.displayName}</h3>
      <p className="text-gray-600">{category.content.description}</p>
      <Link href={`/category/${category.stream_id}`}>
        <p className="block mt-4 text-brand hover:underline">View Posts</p>
      </Link>
    </div>
  );
};

Home.getInitialProps = async (context) => {
  let orbis_server = new Orbis({
    useLit: false
  });
  let { data, error } = await orbis_server.getPosts({
    context: global.orbis_context,
    only_master: true,
    include_child_contexts: true
  });
  return {
    defaultPosts: data
  };
};

export default Home;
