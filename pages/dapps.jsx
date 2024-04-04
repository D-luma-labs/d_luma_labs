import React, { useEffect, useState } from "react";
import { useOrbis, User } from "@orbisclub/components";
import Head from 'next/head';
import Editor from "../components/Editor";
import Header from '../components/Header';
import Hero from '../components/Hero';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Card from "../components/Card";
import ReactPaginate from 'react-paginate';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

export default function Dapps(){

    const { orbis, user, setConnectModalVis } = useOrbis();
    const [dapps, setDapps] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const fetchDapps = async () => {
          try {
            // Set loading state to true to indicate data fetching is in progress
            setLoading(true);
        
            // Perform a fetch request to the specified URL
            const response = await fetch(`https://apis.dappradar.com/v2/dapps?page=${page}&resultsPerPage=10`, {
                // Set custom header with X-API-KEY using the value from process.env.DAPP_API
                headers: {"X-API-KEY": "Nctp2yNzbO8ddktOk8LTRVrxRdZmvDraFHY9Rwi3"}
            });
        
            // Parse the response body as JSON
            const data = await response.json();
         console.log("this is the results", data.results)
            // Extract required data from the response and update state
            setDapps(data.results);
            setTotalPages(data.pageCount);
        
            // Set loading state to false to indicate data fetching is complete
            setLoading(false);
        } catch (error) {
            // Handle any errors that occur during the fetch operation
            console.error('Error fetching dapps:', error);
        
            // Set loading state to false to indicate data fetching encountered an error
            setLoading(false);
        }
        
          };
          fetchDapps();
    }, [page])

    const handlePageChange = (newPage) => {
        setPage(newPage);
      };

    return (
        <>
        <Head>
        {/** Title */}
        <title key="title">D-Luma-Labs | Let&apos;s build solana community together</title>
        <meta property="og:title" content="D-Luma-Labs | Let&apos;s build solana community together" key="og_title" />

        {/** Description */}
        <meta name="description" content="These are the lists of most Popular D-apps in web3 and mostly Solana Ecosystem." key="description"></meta>
        <meta property="og:description" content="These are the lists of most Popular D-apps in web3 and mostly Solana Ecosystem." key="og_description"/>
        <link rel="icon" href="data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 226 142' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M86.6383 0.853462C70.5776 9.70521 58.1567 22.249 50.9464 36.8987C43.736 51.5484 42.0601 67.6459 46.1304 83.1556C50.2007 98.6654 59.8345 112.891 73.8135 124.033C87.7925 135.175 123.374 64.1761 142.55 67.195C161.726 70.2139 163.635 147.115 181.545 140.993C199.454 134.871 214.674 124.559 225.281 111.359C235.887 98.1603 1.10166 70.6457 0.829916 54.8181C0.558175 38.9905 234.812 35.5609 223.754 22.4397L142.55 67.195L86.6383 0.853462Z' fill='url(%23paint0_linear_5_137)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_5_137' x1='216.951' y1='21.0613' x2='113.582' y2='70.2837' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%237931D4'/%3E%3Cstop offset='0.512705' stop-color='%239227AD'/%3E%3Cstop offset='1' stop-color='%233F196E'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E" />
      </Head>
        <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
            <div className="antialiased">
                <div className="min-h-screen flex">

                    {/*  Page content */}
                    <main className="grow overflow-hidden">
                        {/*  Site header */}
                        <Header />
                        <Hero title="List of most Popular Dapps in the Ecosystem" description="Discover and explore the most popular decentralized applications (DApps) in the ecosystem." image />
                        <div className="container mx-auto px-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {loading ? (
                              <>
                               <Skeleton height={300}/>
                               <Skeleton height={300}/>
                               <Skeleton height={300}/>
                               <Skeleton height={300}/>
                               <Skeleton height={300}/>
                               <Skeleton height={300}/>
                               </>
                            ) : (
                                dapps.map((dapp) => <Card key={dapp.dappId} dapp={dapp} />)
                            )}
                            </div>
                            <div className="flex justify-center mt-8">
                            {/* Pagination buttons */}
                            {/* Implement pagination logic here */}
                            <div className="mb-10 sm:w-50">
                             <ResponsivePagination
                              current={page}
                                total={totalPages}
                                onPageChange={handlePageChange}
                                />
                            </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
         </div>
        </>
    )
}