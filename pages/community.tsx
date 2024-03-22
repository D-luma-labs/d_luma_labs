import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Sidebar from '../components/Sidebar';
import PostItem from '../components/PostItem';
import Footer from '../components/Footer';
import { BigLogo, HeroOrbisIcon , LoadingCircle, Logo } from "../components/Icons";
import { Orbis, useOrbis } from "@orbisclub/components";

function Community({defaultPosts}) {
  const { orbis, user } = useOrbis();
  const [nav, setNav] = useState("all");
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState(defaultPosts);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  /** Load all of the categories (sub-contexts) available in this forum */
  useEffect(() => {
    loadContexts();

    /** Load all categories / contexts under the global forum context */
    async function loadContexts() {
      let { data, error } = await orbis.api.from("orbis_contexts").select().eq('context', global.orbis_context).order('created_at', { ascending: false });
      setCategories(data);
    }
  }, []);

  /** Will re-load list of posts when navigation is updated */
  useEffect(() => {
    /** Reset page */
    setPage(0);

    /** Load posts */
    if(nav == "all") {
      loadPosts(global.orbis_context, true, 0);
    } else {
      loadPosts(nav, true, 0);
    }
  }, [nav]);

  /** Will re-load the posts when page is updated */
  useEffect(() => {
    if(nav == "all") {
      loadPosts(global.orbis_context, true, page);
    } else {
      loadPosts(nav, true, page);
    }
  }, [page]);

  /** Load list of posts using the Orbis SDK */
  async function loadPosts(context, include_child_contexts, _page) {
    setLoading(true);
    let { data, error } = await orbis.getPosts({
      context: context,
      only_master: true,
      include_child_contexts: include_child_contexts,
    }, _page, 25);

    /** Save data in posts state */
    if(data) {
      console.log(data)
      setPosts(data);
    }

    /** Disable loading state */
    setLoading(false);
  }

  return (
    <>
      <Head>
        {/** Title */}
        <title key="title">D-Luma-Labs | Let&apos;s build solana community together</title>
        <meta property="og:title" content="D-Luma-Labs | Let&apos;s build solana community together" key="og_title" />

        {/** Description */}
        <meta name="description" content="Discuss the future of Solana community and experience the power of Open Social on our D-Luma-Labs Forum." key="description"></meta>
        <meta property="og:description" content="Discuss the future of Solana community and experience the power of Open Social on our D-Luma-Labs forum." key="og_description"/>
        <link rel="icon" href="data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 226 142' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M86.6383 0.853462C70.5776 9.70521 58.1567 22.249 50.9464 36.8987C43.736 51.5484 42.0601 67.6459 46.1304 83.1556C50.2007 98.6654 59.8345 112.891 73.8135 124.033C87.7925 135.175 123.374 64.1761 142.55 67.195C161.726 70.2139 163.635 147.115 181.545 140.993C199.454 134.871 214.674 124.559 225.281 111.359C235.887 98.1603 1.10166 70.6457 0.829916 54.8181C0.558175 38.9905 234.812 35.5609 223.754 22.4397L142.55 67.195L86.6383 0.853462Z' fill='url(%23paint0_linear_5_137)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_5_137' x1='216.951' y1='21.0613' x2='113.582' y2='70.2837' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%237931D4'/%3E%3Cstop offset='0.512705' stop-color='%239227AD'/%3E%3Cstop offset='1' stop-color='%233F196E'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E" />
      </Head>
      <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
        <div className="antialiased">
          <div className="min-h-screen flex">

            {/*  Page content */}
            <main className="grow overflow-hidden">
              {/*  Site header */}
              <Header />

              {/*  Page sections */}
              <Hero title="Welcome to D-Luma-Labs Community" description="Respectful and good-faith discussion should be the cornerstone of any decision-making process. In trying to enact change, please keep this principle in mind." image={<BigLogo />} />

              {/* Page content */}
              <section>
                <div className="max-w-6xl mx-auto px-4 sm:px-6">

                  <div className="md:flex md:justify-between md:divide-x md:divide-slate-200">

                    {/* Main content */}
                    <div className="md:grow pt-3 pb-12 md:pb-20">
                      <div className="md:pr-6 lg:pr-10">
                        <CategoriesNavigation categories={categories} nav={nav} setNav={setNav} />
                        {/** Show loading state or list of posts */}
                        {loading ?
                          <div className="flex w-full justify-center p-3 text-gray-900">
                            <LoadingCircle />
                          </div>
                        :
                          <>
                            {/* Display posts if any */}
                            {(posts && posts.length > 0) ?
                              <>
                                <div className="mb-12">
                                  <div className="flex flex-col space-y-3 mb-8">
                                    {posts.map((post) => {
                                      return (
                                        <PostItem post={post} key={post.stream_id} />
                                      );
                                    })}
                                  </div>

                                  {/* Handle pagination */}
                                  {posts && posts.length >= 25 &&
                                    <div className="text-right">
                                      <button className="btn-sm py-1.5 h-8 btn-secondary btn-secondary-hover" onClick={() => setPage(page + 1)}>
                                        Next page <span className="tracking-normal ml-1">-&gt;</span>
                                      </button>
                                    </div>
                                  }

                                </div>
                              </>
                            :
                              <div className="w-full text-center bg-[#F9FAFB] rounded border border-slate-200 p-6">
                                <p className="text-sm text-secondary">There aren&apos;t any posts shared here.</p>
                              </div>
                            }
                          </>
                        }
                      </div>
                    </div>
                    <Sidebar />
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>

        {/*  Site footer */}
        <Footer />
      </div>
    </>
  );
}

const CategoriesNavigation = ({ categories, nav, setNav }) => {
  return(
    <div className="border-b border-slate-200 pb-6 mb-6">
      <div className="text-center md:text-left md:flex justify-between items-center">
        {/* Right: Button */}
        <div className="mb-4 md:mb-0 md:order-1 md:ml-6">
          <Link className="btn-sm py-1.5 btn-brand" href="/create">Create Post</Link>
        </div>

        {/* Left: Links */}
        <ul className="grow inline-flex flex-wrap text-sm font-medium -mx-3 -my-1">
          <NavItem selected={nav} category={{stream_id: "all", content: {displayName: "All"}}} onClick={setNav} />
          {categories.map((category, key) => {
            return (
              <NavItem key={key} selected={nav} category={category} onClick={setNav} />
            );
          })}
        </ul>
      </div>
    </div>
  )
}

const NavItem = ({selected, category, onClick}) => {
  return(
    <li className="px-3 py-1">
      <span className={`relative transition duration-150 ease-in-out ${selected == category.stream_id ? "text-brand underline underline-offset-4" : "cursor-pointer text-secondary hover:text-[#333]"}`} onClick={() => onClick(category.stream_id)}>{category.content.displayName}</span>
    </li>
  )
}

/** Load blog articles */
Community.getInitialProps = async (context) => {
  let orbis_server = new Orbis({
    useLit: false
  });
  let { data, error } = await orbis_server.getPosts({
    context: global.orbis_context,
    only_master: true,
    include_child_contexts: true
  });

  /** Return results */
  return {
    defaultPosts: data
  };
}

export default Community;
