"use client"
import { ArrowRight, Gem, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface Props {}

const MobileNav = ({ isAuth, isSubscribed }: {isAuth: boolean, isSubscribed: boolean}) => {

    const [isOpen, setOpen] = useState<boolean>(false)

    const pathname = usePathname()

    const toggleOpen = () => setOpen((prev) => !prev)

    useEffect(() => {
        if(isOpen) toggleOpen()
    }, [pathname])
    
    const closeOnCurrent = (href: string) => {
        if(pathname === href){
            toggleOpen()
        }
    }
  return (
    <div className='block'>
        <Menu 
        onClick={toggleOpen} 
        className='relative z-50 h-10 w-10 text-zinc-700'
        
        />
        {isOpen ? (
            <div className='fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-40 w-full'>
                <ul className='absolute bg-white bg-opacity-200  border-b border-zinc-200 shadow-xl grid w-full gap-3 px-10 pt-20 pb-8'>
                    {true ? (
                       <>
                        <li>
                            <Link 
                            onClick={() => closeOnCurrent('/')}
                            href='/'
                            className='flex items-center w-full font-semibold text-purple-600'
                            >
                                Home <ArrowRight className='ml-2 h-5 w-5'/>
                            </Link>
                        </li>
                        <li className='my-3 h-px w-full bg-gray-300'/>
                        <li>
                            <Link 
                            onClick={() => closeOnCurrent('/community')}
                            href='/community'
                            className='flex items-center w-full font-semibold text-black'
                            >
                               Community
                            </Link>
                        </li>
                        <li className='my-3 h-px w-full bg-gray-300'/>
                        <li>
                            <Link 
                            onClick={() => closeOnCurrent('/create')}
                            href='/create'
                            className='flex items-center w-full font-semibold text-black'
                            >
                               Create Post
                            </Link>
                        </li>

                        <li className='my-3 h-px w-full bg-gray-300'/>
                        <li>
                            <Link 
                            onClick={() => closeOnCurrent('/dapps')}
                            href='/dapps'
                            className='flex items-center w-full font-semibold text-black'
                            >
                               Dapp Store 
                            </Link>
                        </li>
                        <li className='my-3 h-px w-full bg-gray-300'/>
                        <li>
                            <Link 
                            onClick={() => closeOnCurrent('/tool-store')}
                            href='/tool-store'
                            className='flex items-center w-full font-semibold text-black'
                            >
                               Tools Store
                            </Link>
                        </li>
                        
                       </>
                    ) : null}
                </ul>
            </div>
        ): null}
    </div>
  )
}

export default MobileNav