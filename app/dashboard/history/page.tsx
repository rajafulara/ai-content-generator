"use client"
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { TEMPLATE } from "../_components/TemplateListSection";
import Templates from "@/app/(data)/Templates";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export interface HISTORY {
  id: number;
  formData: string; 
  aiResponse: string | null;
  templateSlug: string;
  createdBy: string;
  createdAt: string | null;
}


const History = () => {

  const [history, setHistory] = useState<HISTORY[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser(); 


  const fetchHistory = async () => {
    try {
      setLoading(true);

      if (user) {
        const userEmail = user.primaryEmailAddress?.emailAddress;

        const data:HISTORY[] = await db
          .select()
          .from(AIOutput)
          .where(eq(AIOutput.createdBy, userEmail!))
          .orderBy(AIOutput.createdAt);

        setHistory(data);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [user]);

const GetTemplateName=(slug:string)=>{
  const template:TEMPLATE|any=Templates?.find((item)=>item.slug==slug)
  return template
}

  return (
    <div className='m-5 p-5 border rounded-lg bg-white'>
      <h2 className="font-bold text-3xl">History</h2>
      <p className="text-gray-500">Search Your Previously generated AI Content</p>
      <div className="grid gap-10 grid-cols-7 font-bold bg-secondary mt-5 py-3 px-3">
        <h2 className="col-span-2">Template</h2>
        <h2 className="col-span-2">AI Response</h2>
        <h2>Date</h2>
        <h2>Words</h2>
        <h2 className="ml-3">Copy</h2>
      </div>
      {history.map((item:HISTORY,index:number)=>(
        <div key={index}>
          <div className="grid gap-10 grid-cols-7 my-5 py-3 px-3">
            <h2 className="col-span-2 flex gap-2 items-center">
              <Image src={GetTemplateName(item.templateSlug)?.icon} alt="icon" width={25} height={25}/>
              {GetTemplateName(item.templateSlug)?.name}
            </h2>
            <h2 className="col-span-2 line-clamp-3">{item?.aiResponse}</h2>
            <h2>{item.createdAt}</h2>
            <h2>{item?.aiResponse?.length}</h2>
            <h2>
              <Button variant='ghost' className="text-primary"
              onClick={() => navigator.clipboard.writeText(item.aiResponse||'')}
              >Copy</Button>
            </h2>
          </div>
          <hr/>
        </div>
      ))}
      
    </div>
  );
};

export default History;