"use client"
import React, { useContext, useState } from 'react'
import SideNav from './_components/SideNav';
import Header from './_components/Header';
import { TotalUsageContext } from '../(context)/TotalUsageContext';
import { UserSubscriptionContext } from '../(context)/UserSubscriptionContext';
import { UpdateCreditUsageContext } from '../(context)/UpdateCreditUsageContext';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

const [totalUsage,setTotalUsage]=useState<Number>(0)
const [userSubscription,setUserSubscription]=useState<boolean>(false);
const [updateCreditUsage,setUpdateCreditUsage]= useState<any>()

  return (

    <TotalUsageContext.Provider value={{totalUsage,setTotalUsage}}>

    <UserSubscriptionContext.Provider value={{userSubscription,setUserSubscription}}>

      <UpdateCreditUsageContext.Provider value={{updateCreditUsage,setUpdateCreditUsage}}>
      <PayPalScriptProvider options={{ clientId:process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID??''}}>

    <div className='bg-slate-100 min-h-screen max-h-full'>
      <div className='md:w-64 hidden md:block fixed'>
        <SideNav/>
      </div>
      <div className='md:ml-64'>
        <Header/>
        {children}
      </div>
    </div>
    </PayPalScriptProvider>
    </UpdateCreditUsageContext.Provider>
    </UserSubscriptionContext.Provider>
    </TotalUsageContext.Provider>
  )
}

export default layout