import Head from 'next/head';
import Editor from "../components/Editor";
import Header from '../components/Header';
import Hero from '../components/Hero';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { useOrbis, User } from "@orbisclub/components";

export default function Create() {
  const { orbis, user, setConnectModalVis } = useOrbis();

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
              <Hero title="Sharing a new post on our forum" description="You are about to share a new post in the forum. Make sure to read our rules before doing so." image />

              {/* Page content */}
              <section>
                <div className="max-w-6xl mx-auto px-4 sm:px-6">

                  <div className="md:flex md:justify-between md:divide-x md:divide-slate-200">

                    {/* Show post editor or connect button */}
                    <div className="md:grow pt-0 pb-12 pr-10">
                      {user ?
                        <Editor />
                      :
                        <div className="w-full text-center bg-[#F9FAFB] rounded border border-slate-200 p-6">
                          <p className="text-base text-secondary mb-2">You must be connected to share a post in this forum.</p>
                          <button className="btn-sm py-1.5 bg-main bg-main-hover" onClick={() => setConnectModalVis(true)}>Connect</button>
                        </div>
                      }
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
