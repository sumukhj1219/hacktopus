"use client"
import IdeaGenerator from '@/components/ideaComponents/generate'
import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

const IdeaPage = () => {
    //  const {user} = useUser()
    //  if(!user) return redirect("/")
    return (
        <div className=""> {/* Added centering classes */}
            {/* <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-3xl md:text-5xl font-bold text-center font-orbitron text-orange-600">
                    Idea Generator
                </h1>
            <p className="text-center mt-2 text-gray-600 dark:text-gray-300 max-w-lg">
                Transform your hackathon concept into brilliant, innovative ideas with AI assistance
            </p>
            </div> */}
            <IdeaGenerator />
        </div>
    )
}

export default IdeaPage