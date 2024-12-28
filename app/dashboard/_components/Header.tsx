import { UserButton } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className='p-5 shadow-sm border-b-2 flex justify-between items-center bg-white'>
        <div className='flex w-full justify-between'>
          <Link href={'/dashboard/billing'}>
            <h2 className='bg-primary p-1 rounded-full text-xs text-white px-2'>🔥 Join Membership just for $9/Month</h2>
          </Link>
            <UserButton/>
        </div>
    </div>
  )
}

export default Header