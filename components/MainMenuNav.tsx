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
    <div className='sm:hidden'>
        <Menu 
        onClick={toggleOpen} 
        className='relative z-50 h-5 w-5 text-zinc-700'
        />
        {isOpen ? (
            <div className='fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-0 w-full'>
                <ul className='absolute bg-white border-b border-zinc-200 shadow-xl grid w-full gap-3 px-10 pt-20 pb-8'>
                    {true ? (
                       <>
                        <li>
                            <Link 
                            onClick={() => closeOnCurrent('/community')}
                            href='/community'
                            className='flex items-center w-full font-semibold text-purple-600'
                            >
                                Community <ArrowRight className='ml-2 h-5 w-5'/>
                            </Link>
                        </li>

                        <li className='my-3 h-px w-full bg-gray-300'/>
                        <li>
                            <Link 
                            onClick={() => closeOnCurrent('/dapps')}
                            href='/dapps'
                            className='flex items-center w-full font-semibold'
                            >
                               Dapp Store 
                            </Link>
                        </li>
                        <li className='my-3 h-px w-full bg-gray-300'/>
                        <li>
                            <Link 
                            onClick={() => closeOnCurrent('/tool-store')}
                            href='/tool-store'
                            className='flex items-center w-full font-semibold'
                            >
                               Tools Store
                            </Link>
                        </li>
                        <li className='my-3 h-px w-full bg-gray-300'/>
                        <li>
                            <Link 
                            onClick={() => closeOnCurrent('/about')}
                            href='/about'
                            className='flex items-center w-full font-semibold'
                            >
                               About
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