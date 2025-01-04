"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { FileClock, Home, Settings, WalletCards } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import UsageTrack from './UsageTrack'
import Link from 'next/link'

function SideNav() {

    const router=useRouter()

const MenuList=[
    {
        name:'Home',
        icon:Home,
        path:'/dashboard'
    },
    {
        name:'History',
        icon:FileClock,
        path:'/dashboard/history'
    },
    {
        name:'Billing',
        icon:WalletCards,
        path:'/dashboard/billing'
    },
    {
        name:'Setting',
        icon:Settings,
        path:'/dashboard/settings'
    },
]

const path=usePathname();

  return (
    <div className='relative h-screen p-5 shadow-sm border bg-white'>
        <div className='flex gap-2 justify-center'>
            <Image src={'/logo.svg'} alt='logo' width={40} height={40}/>
            <h2 className='font-bold'>AI Content Generator</h2>
        </div>
        <hr className='my-6 border'/>
        <div className='mt-3'>
            {MenuList.map((menu,index)=>(
                <Link key={index} href={menu.path}>
                <div className={`flex gap-2 mb-2 p-3
                hover:bg-primary hover:text-white rounded-lg cursor-pointer items-center
                ${path==menu.path&&'bg-primary text-white'}
                `}>
                    <menu.icon className='h-6 w-6'/>
                    <h2 className='lext-lg'>{menu.name}</h2>
                </div>
                </Link>
            ))}
        </div>
        <div className='absolute bottom-10 left-0  w-full'>
            <UsageTrack/>
        </div>
    </div>
  )
}

export default SideNav