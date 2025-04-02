import { Orbitron, Poppins } from 'next/font/google';
import React from 'react'

const poppins = Poppins({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "700"], 
  display: "swap",
});

interface IdeaLayoutProps{
    children : React.ReactNode
}

const IdeaLayout = ({children}:IdeaLayoutProps) => {
  return (
    <div className={`font-obitron ${poppins.variable}`}>
        {children}
    </div>
  )
}

export default IdeaLayout