'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Calendar, Ticket, User, Plus, Lightbulb } from 'lucide-react'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import Profile from '../userComponents/profile'

export default function Navbar() {
  const path = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
        ${isScrolled ? 'bg-opacity-80 backdrop-blur-md' : 'bg-transparent'}`}
      style={{
        background: isScrolled 
          ? 'rgba(23, 23, 23, 0.6)' // Blur effect when scrolling
          : 'transparent' // Fully transparent at top
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between py-2 px-4">
        
        <div className="flex items-center gap-6">
          {[
            { path: '/events', text: 'Events', icon: <Ticket className="h-5 w-5" /> },
            { path: '/idea', text: 'New Idea', icon: <Lightbulb className="h-5 w-5" /> },
            { path: '/hackathons', text: 'Discover', icon: <Search className="h-5 w-5" /> },
          ].map((link) => (
            <Link 
              key={link.path} 
              href={link.path} 
              className={`flex items-center gap-1 px-2 py-1 rounded-md transition duration-300 ${
                path === link.path ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.icon} {link.text}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">22:17 GMT+5:30</span>
          <Link href="/create">
            <Button variant={'default'} className='text-secondary' >
              <Plus className="h-4 w-4" /> Create Event
            </Button>
          </Link>
          <Profile />
        </div>

      </div>
    </header>
  )
}
