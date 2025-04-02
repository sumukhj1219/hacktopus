"use client"
import IdeaGenerator from '@/components/ideaComponents/generate'
import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import { WavyBackground } from '@/components/ui/wavy-background'
import { Sparkles } from '@/components/ui/sparkles'

const IdeaPage = () => {
  //   const {user} = useUser()
  //   if(!user) return redirect("/")
  return (
    <div className="min-h-screen">
      <WavyBackground className="h-48 mb-8">
        <div className="flex flex-col items-center justify-center h-full">
          <Sparkles>
            <h1 className="text-3xl md:text-5xl font-bold text-center font-orbitron text-orange-600">
              Idea Generator
            </h1>
          </Sparkles>
          <p className="text-center mt-2 text-gray-600 dark:text-gray-300 max-w-lg">
            Transform your hackathon concept into brilliant, innovative ideas with AI assistance
          </p>
        </div>
      </WavyBackground>
      <IdeaGenerator />
    </div>
  )
}

export default IdeaPage