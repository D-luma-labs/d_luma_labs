import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { BigLogo, LoadingCircle, Logo } from "../components/Icons";
import { Button, Orbis, useOrbis } from "@orbisclub/components";
import { ArrowRight, BanIcon } from 'lucide-react';
import LandingPageHeader from '../components/LandingPageHeader';
import DappPreviewCard from '../components/DappPreviewCard';

function Home({ defaultPosts }) {
  const { orbis } = useOrbis();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [dapps, setDapps] = useState([]);
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
        <LandingPageHeader/>
        <main className="flex-grow">
          <HeroSection />
          <CategoriesSection categories={categories} loading={loading} />
          <CTASection/>
          <BenefitsSection/>
          <TestimonialsSection/>
        </main>
        <Footer />
      </div>
    </>
  );
}

const BenefitsSection = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">Benefits of Joining</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Benefit 1 */}
          <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:-translate-y-1">
            {/* Icon */}
            <Logo className="text-purple-600 w-12 h-12 mb-2" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Access to Cutting-Edge Insights</h3>
            <p className="text-gray-700 text-center">Stay ahead of the curve with exclusive access to insights, trends, and updates in the Solana ecosystem.</p>
          </div>
          {/* Benefit 2 */}
          <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:-translate-y-1">
            {/* Icon */}
            <Logo className="text-purple-600 w-12 h-12 mb-2" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Networking Opportunities</h3>
            <p className="text-gray-700 text-center">Connect with like-minded individuals, industry experts, and innovators in the Solana community.</p>
          </div>
          
          {/* Benefit 4 */}
          <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:-translate-y-1">
            {/* Icon */}
            <Logo className="text-purple-600 w-12 h-12 mb-2" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Community-Led Learning</h3>
            <p className="text-gray-700 text-center">Engage in interactive discussions, workshops, and educational resources curated by community members.</p>
          </div>
          <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:-translate-y-1">
            {/* Icon */}
            <Logo className="text-purple-600 w-12 h-12 mb-2" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Project Collaboration Opportunities</h3>
            <p className="text-gray-700 text-center">Collaborate with other members on exciting projects and initiatives to drive innovation within the Solana ecosystem.</p>
          </div>
          {/* Benefit 7 */}
          <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:-translate-y-1">
              {/* Icon */}
              <Logo className="text-purple-600 w-12 h-12 mb-2" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Support for Hackathon Projects</h3>
              <p className="text-gray-700 text-center">
                  Participate in hackathons and leverage our platform to promote and support your projects. Gain exposure to a wider audience and receive feedback and assistance from fellow competitors and community members.
              </p>
          </div>
          {/* Benefit 8 */}
          <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:-translate-y-1">
            {/* Icon */}
            <Logo className="text-purple-600 w-12 h-12 mb-2" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Opportunity to Shape the Future</h3>
            <p className="text-gray-700 text-center">Play an active role in shaping the future of the Solana ecosystem by contributing your ideas, feedback, and expertise.</p>
          </div>
        </div>
      </div>
    </section>
  );
};




const TestimonialsSection = () => {
  return (
    <section className="bg-gray-100 py-16 mt-30">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-black">Member Testimonials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">Joining this community has been an eye-opening experience for me. I&apos;ve gained valuable insights and connected with amazing individuals passionate about Solana&apos;s potential.</p>
            <p className="text-gray-500">- Hannah Mansary</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">I&apos;ve been impressed by the level of collaboration and support in this community. Together, we&apos;re pushing boundaries and driving innovation in the Solana ecosystem.</p>
            <p className="text-gray-500">- Moses Coker</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-4">Being part of this community has opened doors to exciting opportunities and allowed me to contribute meaningfully to projects shaping the future of Solana.</p>
            <p className="text-gray-500">- Iyeba Kallon</p>
          </div>
          {/* Repeat similar structure for other testimonials */}
        </div>
      </div>
    </section>
  );
};




const HeroSection = () => {
  return (
    <section className="relative overflow-hidden mt-8 mb-[-80px]">
      {/* Bg */}
      <div className="absolute inset-0 bg-opacity-60 pointer-events-none -z-10" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-6 pb-6">
          {/* Hero content */}
          <div className="relative max-w-xl mx-auto md:max-w-none text-center md:text-left flex flex-col md:flex-row">
            {/* Content */}
            <div className="flex flex-row items-center">
              {/* Copy */}
              <div className="flex flex-col md:pr-32">
                <h1 className="text-3xl font-bold text-primary pb-3">Welcome to D-Luma-Labs - Your Gateway to the Solana Ecosystem!</h1>
                <p className="text-lg text-secondary">Join our vibrant community to discuss, suggest, and vote on tools and DApps for the Solana ecosystem. Whether you&apos;re looking to share ideas, solve challenges, or contribute to the growth of Solana Ecosystem, we welcome your participation!</p>
               </div>

              {/* Image */}
              <div className="hidden md:flex left-[42rem] pr-32 justify-center">
                <BigLogo/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CategoriesSection = ({ categories, loading }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">Explore Categories</h2>
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
      <h3 className="text-xl font-semibold mb-4 text-black">{category.content.displayName}</h3>
      <p className="text-black">{category.content.description}</p>
      <Link href={`/category/${category.stream_id}`}>
        <p className="block mt-4 text-brand hover:underline">View Posts</p>
      </Link>
    </div>
  );
};

const CTASection = () => {
  return (
    <section className="bg-blue-500 py-16">
    <div className="container mx-auto text-center">
      <h2 className="text-4xl font-bold text-white mb-8">Join Our Community Today!</h2>
      <p className="text-lg text-white mb-8">Start your journey with us and become part of a vibrant community passionate about Solana. Together, we can shape the future of decentralized finance and technology!</p>
      <Link href="/community" className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-full transition duration-300 ease-in-out">
          Join Now! <ArrowRight className="inline-block ml-2" size={20} />
      </Link>
    </div>
  </section>

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
