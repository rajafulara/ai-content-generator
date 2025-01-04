"use client"
import React, { useContext, useState } from 'react'
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Templates from '@/app/(data)/Templates'
import { chatSession } from '@/utils/AiModel'
import { db } from '@/utils/db'
import { AIOutput, UserSubscription } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'; 
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { useRouter } from 'next/navigation'
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext'
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext'

interface PROPS{
    params:{
        'template-slug':string
    }
}

function CreateNewContent(props:PROPS) { 

    const selectedTemplate:TEMPLATE|undefined=Templates?.find((item)=>item.slug==props.params['template-slug'])

    const [loading,setLoading]=useState(false);

    const [aiOutput,setAiOutput]=useState<string>('')
    
    const {user}=useUser();

    const router=useRouter()

    const {totalUsage,setTotalUsage}=useContext(TotalUsageContext)

    const {userSubscription,setUserSubscription}=useContext(UserSubscriptionContext);
    const {updateCreditUsage,setUpdateCreditUsage}=useContext(UpdateCreditUsageContext)
    /**
     * Used to Generate Content from AI
     * @param FormData
     * @returns 
     */ 
    const GenerateAIContent=async(FormData:any)=>{
      if((totalUsage>=10000&&!userSubscription)||(totalUsage>=1000000&&userSubscription)){
        router.push('/dashboard/billing')
        return ;
      }
      setLoading(true);
      const SelectedPrompt=selectedTemplate?.aiPrompt;

      const FinalAIPrompt= JSON.stringify(FormData)+", "+SelectedPrompt;

      const result= await chatSession.sendMessage(FinalAIPrompt);
      setAiOutput(result.response.text());
      await SaveInDb(JSON.stringify(FormData),selectedTemplate?.slug,result.response.text());
      setLoading(false);
      
      setUpdateCreditUsage(Date.now())
    }

    const SaveInDb=async(formData:any,slug:any,aiResp:string)=>{
      // @ts-ignore
      const result=await db.insert(AIOutput).values({
        formData:formData,
        templateSlug:slug,
        aiResponse:aiResp,
        createdBy:user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format('DD/MM/yyyy'),
      })
    }

  return (
    <div className='bg-slate-100 min-h-screen max-h-full p-5'>
    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5'>
        {/* FormSection */}
        <FormSection selectedTemplate={selectedTemplate}
        userFormInput={(v:any)=>GenerateAIContent(v)} loading={loading}/>

        {/* OutputSection  */}
        <div className='col-span-2'>
        <OutputSection aiOutput={aiOutput}/>
        </div>
    </div>
    </div>
  )
}

export default CreateNewContent