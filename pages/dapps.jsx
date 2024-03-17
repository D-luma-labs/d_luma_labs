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
              setLoading(true);
              const response = await fetch(`https://apis.dappradar.com/v2/dapps?page=${page}&resultsPerPage=10`,{
                headers: {"X-API-KEY": "Nctp2yNzbO8ddktOk8LTRVrxRdZmvDraFHY9Rwi3"}
              });
              const data = await response.json();
              console.log(data)
              setDapps(data.results);
              setTotalPages(data.pageCount);
              setLoading(false);
            } catch (error) {
              console.error('Error fetching dapps:', error);
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