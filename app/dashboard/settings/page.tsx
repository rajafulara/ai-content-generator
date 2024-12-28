import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function Settings() {
  return (
    <div className='flex justify-center items-center min-h-screen max-h-full bg-slate-100'>
      <UserProfile routing="hash"/>
    </div>
  )
}

export default Settings